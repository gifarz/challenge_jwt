const db = require("../config/db.js");
const Order = db.order;
const asyncMiddleware = require("express-async-handler");

exports.addOrder = asyncMiddleware(async (req, res) => {
    const userId = req.body.userId;
 
    if(userId){
        await Order.create({
            userId: req.body.userId,
            bookId: req.body.bookId
        });
        res.status(201).send({
            status: "Order Succesfully"
        });
    } else {
        res.status(404).send({
            status: "userId not found"
        })
    }
 
});

exports.getOrders = asyncMiddleware(async (req, res) => {
    const orders = await Order.findAll({
       attributes: ["id", "userId", "bookId"],
    });
    res.status(200).json({
        description: "All Orders",
        order: orders
    })
});

exports.orderId = asyncMiddleware(async (req, res) => {
    const user_id = req.params.id;

    const order = await Order.findAll({
        where: {
            userId: user_id
        }
    })

    if(!order){
        res.status(500).send({
            message: "Id not found",
            order: order
        })
    } else {
        res.status(200).send({
            message: "Id Found!",
            order: order
        })
    }
})

