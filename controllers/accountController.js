const isProduction = process.env.NODE_ENV === 'production';
const Account = require('../models/Account');

// Cookies
const { v4: uuidv4 } = require('uuid');
let activeCookies = {};

/*
    Hashing & Password Encryption
*/
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(psw) {
    const hash = await bcrypt.hash(psw, saltRounds);
    return hash;
}

async function comparePasswords(psw, hash) {
    const match = await bcrypt.compare(psw, hash);
    return match;
}

async function checkAccount(req) {
    const docs = await Account.find({username: req.body.username}).select('_id username password').exec();
    const accounts = docs.map(doc => {
        return {
            username: doc.username,
            password: doc.password
        };
    });

    for (let i = 0; i < accounts.length; i++) {
        const match = await comparePasswords(req.body.password, accounts[i].password);
        if (match) {
            return true;
        }
    }

    return false;
}

// Create Account Controller
exports.create_account = async (req, res, next) => {
    const psw = await hashPassword(req.body.password);

    const account = new Account({
        username: req.body.username,
        password: psw
    });

    await account.save().then((result) => {
        console.log("Account Created: "+result.username);
        res.status(201).json({
            message: "Created account",
            account: {
                username: result.username,
            }
        });
    }).catch((err) => {
        console.error(err);
    });
};

// Login Controller
exports.login = async (req, res, next) => {
    const match = await checkAccount(req);

    if (match) {
        const expirationTime = Date.now() + 15776640000;
        const cookieValue = uuidv4();
        activeCookies[cookieValue] = expirationTime;

        console.log("New login from "+req.socket.remoteAddress);

        res.cookie('authentication', cookieValue, { 
            maxAge: 15776640000,
            httpOnly: true, 
            secure: isProduction
        });

        res.redirect(req.body.original);
    } else {
        res.sendStatus(401);
    }
};

// Middleware Account Checker
exports.check_cookie = async (req, res, next) => {
    const cookieValue = req.cookies.authentication;

    if (cookieValue && activeCookies[cookieValue] > Date.now()) {
        next();
    } else {
        res.sendStatus(401);
    }
};

