const express = require("express");
const morgan = require('morgan')
// const path = require("path");
const app = express();
const { products } = require("./data");
const logger = require("./logger");
const authorize = require("./authorize");

// req => middleware => res
// app.use([logger, authorize]);
// app.use('/api',logger);

//setup static and middleware
// app.use(express.static("./public"));

app.use(morgan('tiny'))
app.use(express.static('./public'))

app.get("/", (req, res) => {
  res.send('<h1>Home page</h1><a href="/api/products">products</a>');
});

app.get("/about", (req, res) => {
  res.send('<h1>About page</h1><a href="/api/products">products</a>');
});

app.get("/api/product", [logger, authorize], (req, res) => {
  res.send('<h1>Product page</h1><a href="/api/products">products</a>');
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.json(newProducts);
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});

app.get(`/api/products/:productID`, (req, res) => {
  console.log(req.params.productID);
  const singleProduct = products.find(
    (product) => product.id === Number(req.params.productID)
  );
  if (!singleProduct) {
    return res.status(404).send("Product does not existe");
  }
  res.json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProduct = [...products];

  if (search) {
    sortedProduct = sortedProduct.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProduct = sortedProduct.slice(0, Number(limit));
  }

  if (sortedProduct.length < 1) {
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json(sortedProduct);
  // res.send('hello')
});

app.get("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(4000, () => {
  console.log("server is listening on port 4000");
});
