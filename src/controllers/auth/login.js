"use strict";
const {validateUser, generateToken} = require('./helper');

const logIn = async (req, res) => {
    const { username, password} = req.body;
    if (!username || !password){
        return res.status(400).send({
            success: false,
            message: 'Please fill in required space.'
        })
    }
    try {
        const { status, user } = await validateUser(username, password);
        if (status) {
            const token = generateToken(user);
            return res.status(200).send({
                success: true,
                message: 'Authentication successful!',
                token: token,
                username: user.username
            });
        }
    } catch (error) {
        // console.log(error);
    }
    return res.status(400).send({
        success: false,
        message: "Invalid username or password"
    });
}
module.exports = logIn;