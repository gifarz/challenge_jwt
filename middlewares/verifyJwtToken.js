const db = require("../config/db.js");
const config = require("../config/config.js");
const jwt = require("jsonwebtoken");
const User = db.user;
const Book = db.book;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token !=null && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      auth: false,
      message: "No token provided."
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Fail to Authentication. Error -> " + err
      });
    }
    req.userId = decoded.id;
    // req.bookId = decoded.id;
    next();
  });
};

isAdmin1 = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        console.log(roles[i].name);
        if (roles[i].name.toUpperCase() === "ADMIN") {
          next();
          return;
        }
      }

      res.status(403).send("Require Admin Role!");
      return;
    });
  });
};

isAdmin2 = (req, res, next) => {
  Book.findByPk(req.bookId).then(book => {
    book.getUsers().then(users => {
      for (let i = 0; i < roles.length; i++) {
        console.log(roles[i].name);
        if (roles[i].name.toUpperCase() === "ADMIN") {
          next();
          return;
        }
      }

      res.status(403).send("Require Admin Role!");
      return;
    });
  });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin1 = isAdmin1;
authJwt.isAdmin2 = isAdmin2;

module.exports = authJwt;