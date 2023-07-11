const mongoose = require('mongoose');

const password = process.env.PASSWORD;
const username = process.env.USERNAME;
const link = process.env.LINK;
const uri = `mongodb+srv://${username}:${password}${link}`;

async function connectToDatabase() {
    // connects to the database
    mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
        console.log("New connection to database made!");
    });
}

exports.connect = async function() {
    await connectToDatabase();
}