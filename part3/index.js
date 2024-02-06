const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('dist'))
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      JSON.stringify(req.body),
    ].join(" ");
  })
);
const persons = [
  {
    id: 1,
    name: "Arto Hellas",
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

app.get("/api/persons", (request, response) => {
  response.json(persons);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.send(person);
  } else {
    res.status(404).send({ error: "unknown id" });
  }
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info of ${persons.length} people
        <br/>
        <p>${date}<p/>
        `
  );
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  const personExists = phonebook.some((person) => person.name === body.name);

  if (personExists) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const id = Math.floor(Math.random() * 1000000);
  const person = {
    name: body.name,
    number: body.number,
    id: id,
  };
  persons = persons.concat(person);
  res.json(person);
});
app.listen(3001, () =>
  console.log(`Server running on http://localhost:${3001}`)
);
