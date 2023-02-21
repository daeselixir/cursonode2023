const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "jhon") {
    req.user = { name: "john", id: 3 };
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
  // console.log("authorization");
};

module.exports = authorize;
