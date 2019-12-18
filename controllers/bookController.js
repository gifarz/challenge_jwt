const db = require("../config/db.js");
// const User = db.user;
const Order = db.order;
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

exports.books = asyncMiddleware(async (req, res) => {
  const book = await Book.findAll({
    attributes: ["title", "author"],
    include: [
      {
        model: Order,
        attributes: ["id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "All Book",
    book: book
  });
});

exports.bookContent = asyncMiddleware(async (req, res) => {
  const book = await Book.findOne({
    where: { id: req.userId },
    attributes: ["name", "author"],
    include: [
      {
        model: Order,
        attributes: ["id"],
        through: {
          attributes: ["userId", "bookId"]
        }
      }
    ]
  });
  res.status(200).json({
    description: "User Content Page",
    book: book
  });
});

// exports.userContent = asyncMiddleware(async (req, res) => {
//   const user = await User.findOne({
//     where: { id: req.userId },
//     attributes: ["name", "user_id"],
//     include: [
//       {
//         model: Role,
//         attributes: ["id", "name"],
//         through: {
//           attributes: ["userId", "roleId"]
//         }
//       }
//     ]
//   });
//   res.status(200).json({
//     description: "User Content Page",
//     user: user
//   });
// });

// exports.adminBoard = asyncMiddleware(async (req, res) => {
//   const user = await User.findOne({
//     where: { id: req.userId },
//     attributes: ["name", "user_id"],
//     include: [
//       {
//         model: Role,
//         attributes: ["id", "name"],
//         through: {
//           attributes: ["userId", "roleId"]
//         }
//       }
//     ]
//   });
//   res.status(200).json({
//     description: "Admin Board",
//     user: user
//   });
// });

// exports.managementBoard = asyncMiddleware(async (req, res) => {
//   const user = await User.findOne({
//     where: { id: req.userId },
//     attributes: ["name", "user_id"],
//     include: [
//       {
//         model: Role,
//         attributes: ["id", "name"],
//         through: {
//           attributes: ["userId", "roleId"]
//         }
//       }
//     ]
//   });
//   res.status(200).json({
//     description: "Management Board",
//     user: user
//   });
// });