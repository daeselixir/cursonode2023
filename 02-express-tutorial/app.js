const express = require("express");
// const path = require("path");
const app = express();
const { products } = require("./data");

//setup static and middleware
// app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.send('<h1>Home page</h1><a href="/api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get(`/api/products/:productID`, (req, res) => {
  console.log(req.params.productID);
  const singleProduct = products.find(
    (product) => product.id === Number(req.params.productID)
  );
  if (!singleProduct) {
  return res.status(404).send('Product does not existe')
  }
  res.json(singleProduct);
});

app.get("*", (req, res) => {
  res.status(404).send("resoruce not found");
});

app.listen(4000, () => {
  console.log("server is listening on port 4000");
});
