const mongoose = require('mongoose');

const password = process.env.PASSWORD;
const username = process.env.USERNAME;
const link = process.env.LINK;
const uri = `mongodb+srv://${username}:${password}${link}`;

let cached = global.mongoose;

async function connectToDatabase() {
    if (cached && cached.conn && cached.conn.readyState === 1) {
        return cached.conn
    }
    // Close the existing connection if it exist but is stale.
    if (cached && cached.conn) {
        await cached.conn.close()
    }
    
    cached = await mongoose.createConnection(uri, { useNewUrlParser: true });

    console.log("New connection to database made!");

    return cached;
}

exports.connect = async function() {
    await connectToDatabase();
}