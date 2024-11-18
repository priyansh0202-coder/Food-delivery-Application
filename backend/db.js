const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/ZwigatoFood";

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");

        const fetched_data = mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();

        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");
        const foodCategoryData = await foodCategoryCollection.find({}).toArray();
        console.log("Data from food items")
        global.food_items = data;
        global.foodCategory = foodCategoryData;
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

module.exports = mongoDB;

