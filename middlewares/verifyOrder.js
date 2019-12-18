const db = require('../config/db.js');
const bookController = require('../controllers/bookController');
// const config = require('../config/config.js');
// const ROLEs = config.ROLEs;
// const User = db.user;
const Book = db.book;

checkDuplicateBookId = (req, res, next) => {
    let order = req.body.title

    if (!order){
        return res.status(403).send({
            message: "No order provided "
        })
    } else {
        [bookController.books]
    }
    req.bookId = decoded.id;

    next();
 };


const orderVerify = {};
orderVerify.checkDuplicateBookId = checkDuplicateBookId;

module.exports = orderVerify;