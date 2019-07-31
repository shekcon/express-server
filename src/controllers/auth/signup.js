"use strict";
const {createUser} = require('./helper');

const signUp = async (req, res) => {
    const {username, password, location} = req.body;

    if (!username|| !password || !location) {
        return res.status(400).send({
            success: false,
            message: 'Please fill in required space.'
        })
    }

    if (password.length < 8 || !/\S+/.test(password)) {
        return res.status(400).send({
            success: false,
            message: 'Password is too short or password contain white space.'
        })
    }
    
    try {
        await createUser(username, password, location);
        return res.status(201).send({
            success: true,
            message: "Create a new user successfully"
        });
    } catch (error) {
        if (error.routine === '_bt_check_unique') {
            return res.status(409).send({
                success: false,
                message: "Username already be used."
            });
        }
        console.log(error);
    }
    return res.status(400).send({
        success: false,
        message: "Processing error"
    });
}

module.exports = signUp;