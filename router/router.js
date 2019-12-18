const verifySignUp = require("../middlewares/verifySignUp");
const authJwt = require("../middlewares/verifyJwtToken");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");
// const bookController = require("../controllers/bookController.js");
const orderController = require ("../controllers/orderController.js");
// const orderVerify = require("../middlewares/verifyOrder");

module.exports = function(app) {
  // Auth
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateName,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
  );
  app.post("/api/auth/signin", authController.signin);
  app.post("/api/auth/signin/book", [authJwt.verifyToken], authController.book);
  app.post("/api/auth/signin/book/order", [authJwt.verifyToken], authController.order);
  app.post("/api/auth/signin/book/add", [authJwt.verifyToken], orderController.addOrder);

  // get all user
  app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin1], userController.users);
  app.get("/api/books", [authJwt.verifyToken], orderController.getOrders);
  app.get("/api/books/:id", [authJwt.verifyToken], orderController.orderId);

  // get 1 user according to roles
  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin1],
    userController.adminBoard
  );

  // error handler 404
  app.use(function(req, res, next) {
    return res.status(404).send({
      status: 404,
      message: "Not Found"
    });
  });

  // error handler 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({
      error: err
    });
  });
};
