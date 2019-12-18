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
       attributes: ["id", "title", "author", "pages", "language"]
    });
    res.status(200).json({
        description: "All Books",
        book: books
    })
})

exports.getBookById = asyncMiddleware(async (req, res) => {
    const book = await Book.findOne({
        attributes: ["id", "title", "author", "pages", "language"],
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({
        description: "Book By ID",
        book: book
    })
})

exports.deleteBook = asyncMiddleware(async (req, res) => {
    const book = await Book.destroy({
        where: {
            id: req.params.id
        }
    });

    res.status(200).json({
        message: "Book has been deleted",
        book: book
    })
})