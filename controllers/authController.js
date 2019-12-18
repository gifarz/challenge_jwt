const db = require("../config/db.js");
const config = require("../config/config.js");
const User = db.user;
const Role = db.role;
// const Book = db.book;
const asyncMiddleware = require("express-async-handler");

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = asyncMiddleware(async (req, res) => {
  // Save User to Database
  console.log("Processing func -> SignUp");

  const user = await User.create({
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  const roles = await Role.findAll({
    where: {
      name: {
        [Op.or]: req.body.roles
      }
    }
  });

  await user.setRoles(roles);
//   await user.setBook(book);

  res.status(201).send({
    status: "User registered successfully!"
  });
});

exports.signin = asyncMiddleware(async (req, res) => {
  console.log("Sign-In");

  const user = await User.findOne({
    where: {
      name: req.body.name
    }
  });

  if (!user) {
    return res.status(404).send({
      auth: false,
      accessToken: null,
      reason: "User Not Found!"
    });
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      auth: false,
      accessToken: null,
      reason: "Invalid Password!"
    });
  }

  const token = jwt.sign({ id: user.id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });

  res.status(200).send({
    auth: true,
    type: "Bearer",
    accessToken: token
  });
})

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
    })

    await user.setBook(books);
});

exports.order = asyncMiddleware(async (req,res) => {
    console.log("Order Book")

    const book = await Book.findOne({
        where: {
            title: req.body.title
        }
    })

    // await book.setUser(users);

    if(!book) {
        return res.status(404).send({
            status: "Book not Found!"
        })
    } else {
        return res.status(200).send({
            status: "Order Book Berhasil!"
        })
    }

})
