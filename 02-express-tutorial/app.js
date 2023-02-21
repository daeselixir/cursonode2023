const express = require("express");
let { people } = require("./data");
const app = express();

//static assets
app.use(express.static("./methods-public"));
//parse form
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  // console.log(req);
  // console.log(req.body);
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: "please provide name" });
  }
  res.status(201).json({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: "please provide name" });
  }

  res.status(201).json({ success: true, data: [...people, name] });
});

app.post("/login", (req, res) => {
  //console.log(req.body);
  const { name } = req.body;
  if (!name) {
    return res.status(200).send(`Welcome ${name}`);
  }
  res.status(401).send("please provide a name");
});

app.get("*", (req, res) => {
  res.status(404).send("Page not found 😐");
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res
      .status(404)
      .json({ success: false, msg: `no person with ${id}` });
  }
});

app.listen(4000, () => {
  console.log("Server on listening on port 4000");
});
