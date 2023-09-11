const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

let persons = [
  {
    id: 1,
    name: "Rahul Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
app.use(express.static("dist"));
app.use(cors());
app.use(morgan("tiny"));
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  const currentTime = new Date();
  const info = `<p>Phone has info for ${persons.length} people</p>
    <p>${currentTime.toString()}</p>
  `;
  response.send(info);
});

app.get("/api/persons/:id", (request, response) => {
  const person = persons.find(
    (person) => person.id === Number(request.params.id)
  );
  if (!person) {
    return response.status(404).end();
  } else response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  persons = persons.filter((person) => person.id !== Number(request.params.id));
  response.status(204).end();
});

const generateRandom = () => {
  const id = Math.floor(Math.random() * 10000000000000000000000);
  return id;
};
app.use(express.json());

app.post("/api/persons", (request, response) => {
  const body = request.body;
  console.log(body);
  const isExist = persons.some(
    (person) => person.name.toLowerCase() === body.name.toLowerCase()
  );
  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Content is Missing" });
  } else if (isExist) {
    return response.status(400).json({ error: "Name already exists" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateRandom(), //generate a random id
  };
  persons = persons.concat(person);
  response.json(person);
});
const PORT = process.env.VITE_PORT || 3001;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
