const express = require("express");
const app = express();

const people = require("./routes/people");
const auth = require("./routes/auth");

//static assets
app.use(express.static("./methods-public"));
//parse form
app.use(express.urlencoded({ extended: false }));
//parse json
app.use(express.json());

app.use("/api/people", people);
app.use("/login", auth);

app.get("*", (req, res) => {
  res.status(404).send("Page not found 😐");
});

app.listen(4000, () => {
  console.log("Server on listening on port 4000");
});
