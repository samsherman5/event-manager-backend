const isProduction = process.env.NODE_ENV === 'production'; // determines whether the server is being run in development or production
const Account = require('../models/Account');

// Cookies
const { v4: uuidv4 } = require('uuid'); // generates uuid for cookies
let activeCookies = {}; // array of active cookies

/*
    Password Encryption
*/

const bcrypt = require('bcrypt'); // package for hashing
const saltRounds = 10;

// Hashes passwords
async function hashPassword(psw) {
    const hash = await bcrypt.hash(psw, saltRounds); // runs a hash
    return hash; // returns hash
}

// Compares a hash (from database) and password (from request)
async function comparePasswords(psw, hash) {
    const match = await bcrypt.compare(psw, hash); // checks if they match
    return match; // returns a boolean true/false
}

async function checkAccount(req) {
    const docs = await Account.find({username: req.body.username}).select('_id username password').exec(); // gets all accounts with the same username
    const accounts = docs.map(doc => {
        return {
            username: doc.username,
            password: doc.password
        };
    });

    // iterates through accounts (with username in request), and checks if the password matches any of them 
    for (let i = 0; i < accounts.length; i++) {
        const match = await comparePasswords(req.body.password, accounts[i].password);
        if (match) {
            return true;
        }
    }

    return false; // if the above for loop didn't find any matches, returns false
}

// Create Account Controller
exports.create_account = async (req, res, next) => {
    const psw = await hashPassword(req.body.password); // hashes the password inputted

    // creates new account with model
    const account = new Account({
        username: req.body.username,
        password: psw
    });

    // saves the account to the database
    await account.save().then((result) => {
        console.log("Account Created: "+result.username);
        res.status(201).json({
            message: "Created account",
            account: {
                username: result.username,
            }
        });
    }).catch((err) => {
        res.sendStatus(500);
        console.error(err);
    });
};

// Login Controller
exports.login = async (req, res, next) => {
    const match = await checkAccount(req); // checks if the request body inputted password/username are correct

    if (match) {
        const expirationTime = Date.now() + 604800000; // creates a time of expiration for the cookie, 6 months from current time
        const cookieValue = uuidv4(); // creates a new auth cookie using uuid package
        activeCookies[cookieValue] = expirationTime; // adds the new cookie to the list

        console.log("New login from "+req.body.username);
        
        res.header('Access-Control-Allow-Origin', isProduction ? "https://st-events.vercel.app" : "http://localhost:3000");
        res.header('Access-Control-Allow-Credentials', true);

        // sends cookie to the user
        res.cookie('authentication', cookieValue, { 
            maxAge: 604800000,
            httpOnly: true, 
            secure: isProduction,
            domain: process.env.BACKEND_DOMAIN,
            // domain: isProduction ? 'event-manager-backend-d7uu.onrender.com' : 'localhost',
            path: '/',
            sameSite: isProduction ? 'none' : 'lax'
        }).send();
    } else {
        res.sendStatus(401); // sends status 401: unauthorized
    }
};

// Middleware Account Checker
exports.check_cookie = async (req, res, next) => {
    const cookieValue = req.cookies.authentication; // inputted cookie value

    // checks if the cookie is valid
    if (cookieValue && activeCookies[cookieValue] > Date.now()) {
        next(); // request keeps going
    } else {
        res.sendStatus(401); // sends status 401: unauthorized
    }
};

