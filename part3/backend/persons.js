const express = require("express");
const app = express();
const Person = require("./models/mongo");
var morgan = require("morgan");
const cors = require("cors");

app.use(express.static("dist"));
app.use(cors());
app.use(morgan("tiny"));
app.get("/api/persons", (request, response) => {
  Person.find({}).then((person) => {
    response.json(person);
  });
});

app.get("/info", (request, response) => {
  const currentTime = new Date();
  const personlength = Person.find({}).then((person) => {
    const info = `<p>Person has info for ${person.length} people</p>
    <p>${currentTime.toString()}</p>
    `;
    response.send(info);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((person) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const generateRandom = () => {
  const id = Math.floor(Math.random() * 10000000000000000000000);
  return id;
};
app.use(express.json());

app.post("/api/persons", (request, response) => {
  const body = request.body;
  // const isExist = persons.some(
  //   (person) => person.name.toLowerCase() === body.name.toLowerCase()
  // );
  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: "Content is Missing" });
  // } else if (isExist) {
  //   return response.status(400).json({ error: "Name already exists" });
  // }
  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateRandom(), //generate a random id
  });
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = new Person({
    id: request.params.id,
    name: body.name,
    number: body.number,
  });
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);
const PORT = process.env.VITE_PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
