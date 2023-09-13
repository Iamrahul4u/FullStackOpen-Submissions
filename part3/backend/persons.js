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
  const info = `<p>Person has info for ${Person.length} people</p>
    <p>${currentTime.toString()}</p>
  `;
  response.send(info);
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
  // if (!person) {
  //   return response.status(404).end();
  // } else response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
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
    id: generateRandom(), //generate a random id
  });
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response) => {
  const body = request.body;
  const person = new Person({
    id: request.params.id,
    name: body.name,
    number: body.number,
  });
  person.update.then({ id: request.params.id }, person, (err, person) => {
    if (err) {
      res.json({
        person: person,
        success: false,
        msg: "Failed to update board",
      });
    } else {
      res.json({ person: person, success: true, msg: "Board added" });
    }
  });
});
const PORT = process.env.VITE_PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
