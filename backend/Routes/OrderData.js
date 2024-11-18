const express = require("express");
const router = express.Router();
const Order = require("../models/Orders")


router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;

    if (!req.body.email) {
        return res.status(400).send("email is required");
    }

    await data.splice(0, 0, { Order_date: req.body.order_date });
    console.log("Order email:", req.body.email);

    let eId = await Order.findOne({ 'email': req.body.email });
    console.log("Existing Order ID:", eId);

    if (eId === null) {

        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.error("Error saving new order:", error.message);
            res.status(400).send("Server Error: " + error.message);
        }
    } else {
        try {
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            ).then(() => {
                res.json({ success: true });
            });
        } catch (error) {
            console.error("Error updating order:", error.message);
            res.status(500).send("Server Error: " + error.message);
        }
    }
});


router.post('/myOrderData', async (req, res) => {
    try {
        console.log("User email for fetching orders:", req.body.email);
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log("Retrieved Order Data:", eId);
        res.json({ orderData: eId });
    } catch (error) {
        console.error("Error retrieving order data:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;