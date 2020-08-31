const express = require("express");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  //   console.log(req);
  res.status(200).json({ hello: "HI" });
});

const users = [
  {
    id: 1,
    name: "Sam",
    bio: "It's meeee",
  },
];
let nextId = 2;

server.get("/api/users", (req, res) => {
  if (!users) {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  } else {
    res.status(200).json({ data: users });
  }
});

server.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id - 1);
  if (users[id]) {
    res.status(200).json({ data: users[id] });
  } else if (!users[id]) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

server.post("/api/users", (req, res) => {
  const newUser = { id: nextId++, name: req.body.name, bio: req.body.bio };
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ message: "Please provide a name and bio for the user" });
  } else if (req.body.name && req.body.bio) {
    users.push(newUser);
    res.status(201).json({ data: users });
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (users[id]) {
    res.status(200).json(newUsers);
  } else if (!users[id]) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res.status(500).json({ errorMessage: "The user could not be removed" });
  }

  const newUsers = users.filter((user) => user.id !== id);
});
server.put("/api/users/:id", (req, res) => {
  const changes = req.body;
  const id = Number(req.params.id);

  let found = users.find((user) => user.id === id);
  //   Object.assign(found, changes);

  if (!found) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else if (found) {
    Object.assign(found, changes);

    res.status(200).json(found);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be modified." });
  }

  //   res.status(200).json(found);
});

const port = 7000;

server.listen(port, () => {
  console.log("Server up...");
});
