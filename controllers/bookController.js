const db = require("../config/db.js");
// const config = require("../config/config.js");
const Book = db.book;
const asyncMiddleware = require("express-async-handler");

exports.book = asyncMiddleware(async (req, res) => {
    console.log("Book")

    const book = await Book.create({
        id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        language: req.body.language
    })

    res.status(200).send({
        status: "Buku baru telah disimpan!",
        book: book
    })
});

exports.getBooks = asyncMiddleware(async (req, res) => {
    const books = await Book.findAll({
       attributes: ["id", "title", "author", "pages", "language"],
    });
    res.status(200).json({
        description: "All Books",
        book: books
    })
});

// const db = require("../config/db.js");
// // const User = db.user;
// const Order = db.order;
// const Book = db.book;
// const asyncMiddleware = require("express-async-handler");

// exports.books = asyncMiddleware(async (req, res) => {
//   const book = await Book.findAll({
//     attributes: ["title", "author"],
//     include: [
//       {
//         model: Order,
//         attributes: ["id"],
//         through: {
//           attributes: ["userId", "bookId"]
//         }
//       }
//     ]
//   });
//   res.status(200).json({
//     description: "All Book",
//     book: book
//   });
// });

// exports.bookContent = asyncMiddleware(async (req, res) => {
//   const book = await Book.findOne({
//     where: { id: req.userId },
//     attributes: ["name", "author"],
//     include: [
//       {
//         model: Order,
//         attributes: ["id"],
//         through: {
//           attributes: ["userId", "bookId"]
//         }
//       }
//     ]
//   });
//   res.status(200).json({
//     description: "User Content Page",
//     book: book
//   });
// });
