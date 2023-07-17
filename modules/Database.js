const mongoose = require('mongoose');

const uri = process.env.DATABASE_URI;

async function connectToDatabase() {
    // connects to the database
    mongoose.connect(uri, { useNewUrlParser: true }).then(() => {
        console.log("New connection to database made!");
    });
}

exports.connect = async function() {
    await connectToDatabase();
};