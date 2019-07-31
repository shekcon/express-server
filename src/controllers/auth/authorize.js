'use strict';
const { validateToken } = require('./helper');


const messages = {
    400: {
        success: false,
        message: 'The token you provided is invalid'
    },
    401: {
        success: false,
        message: 'Token is not provided'
    },
    403: {
        success: false,
        message: 'Permission denied'
    },
    200: {
        success: true,
        message: "Authenticate successfully!"
    }
}


const authorize = async (req, res, next) => {
    const token = req.headers['Authorization'];
    if (!token && !token.startswith("Bearer ")) {
        return res.status(401).send(messages[401]);
    }
    try {
        const { status, user } = await validateToken(token.split("Bearer ")[1]);
        if (!status) {
            return res.status(400).send(messages[400]);
        }
        req.user = user;
    } catch (error) {
        return res.status(400).send(messages[400]);
    }
    next();
};

const user = async (req, res) => {
    const user = req.user;
    return res.status(200).send({
        success: true,
        message: 'Authentication successful!',
        username: user.username
    })
}

const admin = async (req, res) => {
    const user = req.user;
    if (user.role != "admin") {
        res.status(403).send(messages[403])
    }
    return res.status(200).send({
        success: true,
        message: 'Authentication successful!',
        username: user.username
    })
}

module.exports = {
    authorize,
    user,
    admin
};