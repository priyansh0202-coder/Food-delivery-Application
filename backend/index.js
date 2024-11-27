const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const mongoDB = require("./db");
const cors = require("cors")
const bodyParser = require('body-parser')


mongoDB();

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept"
//     )
//     next()
// })

app.use(bodyParser.json());
const allowedOrigins = [
    "http://localhost:3000", 
    "https://food-delivery-application-frontend-ten.vercel.app"
];
app.use(cors({
             origin: allowedOrigins,
             methods: ["GET", "POST", "PUT", "DELETE],
             credentials: true
             }))
app.get("/", (req, res) => {
    res.send("hello world");
});

const userRoute = require("./Routes/CreateUser")
app.use("/api", userRoute)
const foodRoute = require("./Routes/DisplayData")
app.use("/api", foodRoute)
const orderRoute = require("./Routes/OrderData")
app.use("/api", orderRoute)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
