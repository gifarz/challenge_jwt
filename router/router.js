const verifySignUp = require("../middlewares/verifySignUp");
const authJwt = require("../middlewares/verifyJwtToken");
const authController = require("../controllers/authController.js");
const userController = require("../controllers/userController.js");;
const orderController = require ("../controllers/orderController.js");
const bookController = require("../controllers/bookController.js");

module.exports = function(app) {
  // USER
  app.post("/api/auth/signup",[
    verifySignUp.checkDuplicateName,
    verifySignUp.checkRolesExisted
  ],
    authController.signup
  );
  app.post("/api/auth/signin", authController.signin);

  app.get("/api/users", [authJwt.verifyToken, authJwt.isAdmin], userController.users);
  app.get("/api/test/user", [authJwt.verifyToken], userController.userContent);
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.adminBoard
  );

  // BOOK
  app.get("/api/books", [authJwt.verifyToken], bookController.getBooks);
  app.get("/api/books/:id",[authJwt.verifyToken], bookController.getBookById);
  app.delete("/api/books/:id",[authJwt.verifyToken], bookController.deleteBook);

  // ORDER
  app.post("/api/auth/signin/order", [authJwt.verifyToken], bookController.book);
  app.post("/api/auth/signin/order/add", [authJwt.verifyToken], orderController.addOrder);
  app.get("/api/orders", [authJwt.verifyToken], orderController.getOrders);
  app.get("/api/orders/:id", [authJwt.verifyToken], orderController.orderId);

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
