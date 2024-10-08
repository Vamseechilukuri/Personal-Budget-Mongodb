const express = require("express");
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require("mongoose");

const budgetSchema = require("./Schema_model/budget_schema");
let url = 'mongodb://127.0.0.1:27017/budget';

app.use('/', express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Establishing a MongoDB connection
const connectToDB = () => {
    return mongoose.connect(url);
};

app.get("/budget", (req, res) => {
    connectToDB()
        .then(() => {
            console.log("Connected to the database");
            budgetSchema.find({})
                .then((data) => {
                    console.log(data);
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                });
        })
        .catch((connectionError) => {
            console.log(connectionError);
        });
});

app.post("/addNewBudget", (req, res) => {
    connectToDB()
        .then(() => {
            // Insert
            console.log("Connected to the database for inserting the new data");
            console.log(req.body);
            let newData = new budgetSchema(req.body);
            console.log(newData);
            budgetSchema.insertMany(newData)
                .then((data) => {
                    res.send("New data is inserted into the database Successfully");
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log("1", connectionError);
                    res.send(connectionError.message);
                });
        })
        .catch((connectionError) => {
            console.log("2", connectionError);
            res.send(connectionError);
        });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
