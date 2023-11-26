const bcrypt = require('bcrypt')
const User = require('../models/user')
const axios = require("axios")
const jwt = require('jsonwebtoken')



const JWT_SECRET = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"


exports.signup = async (req, res) => {

    if (req.body.googleAccessToken) {

        const data = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${req.body.googleAccessToken}`,
            },
        });

        if (data) {

            const userName = data.data.name;
            const emailId = data.data.email;


            const userExists = await User.findOne({ emailId });


            if (userExists) {
                res.status(400).json({ msg: "User already exist" });
            }
            const hashPassword = await bcrypt.hash("password", 10);
            const user = await User.create({
                userName,
                emailId,
                hashPassword
            });

            const token = jwt.sign({
                email: user.emailId,
                id: user._id
            }, JWT_SECRET, { expiresIn: "4h" })

            res.status(201).json({
                msg: "User Created Successfully",
                User: {
                    _id: user._id,
                    username: user.userName,
                    emailId: user.emailId,
                },
                Token: { token }
            });
        } else {
            return res.status(400).json({ msg: "Unable to create account" });
        }


    } else {

        const { userName, emailId, password, googleAccessToken } = req.body;

        if (!userName || !emailId || !password) {
            return res.status(400).json({ msg: "Please Enter all the Fields" });
        }

        const userExists = await User.findOne({ emailId });

        if (userExists) {
            return res.status(400).json({ msg: "User already exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName,
            emailId,
            hashPassword,
        });

        const token = jwt.sign({
            email: user.emailId,
            id: user._id
        }, JWT_SECRET, { expiresIn: "4h" })

        if (user) {
            return res.status(201).json({
                msg: "User Created Successfully",
                User: {
                    _id: user._id,
                    username: user.userName,
                    emailId: user.emailId,
                },
                Token: token
            });
        } else {
            return res.status(400).json({ msg: "Unable to create user account" });
        }
    }

};


exports.login = async (req, res) => {

    if (req.body.googleAccessToken) {
        const data = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${req.body.googleAccessToken}`,
            },
        });

        if (data) {
            const emailId = data.data.email;

            const user = await User.findOne({ emailId });

            if (!user) {
                return res.status(400).json({ msg: "User does not exist" });
            }

            const token = jwt.sign({
                email: user.emailId,
                id: user._id
            }, JWT_SECRET, { expiresIn: "4h" })


            return res.status(201).json({
                msg: "User loggedIn Successfully",
                User: {
                    _id: user._id,
                    username: user.userName,
                    emailId: user.emailId,
                },
                Token: { token }
            });

        } else {
            return res.status(400).json({ msg: "User does not exist" });
        }


    } else {
        const { emailId, password, googleAccessToken } = req.body;
        if (!emailId || !password) {
            return res.status(400).json({ msg: "Please Enter all the Fields" });
        }

        const user = await User.findOne({ emailId });

        if (user) {
            const isValid = await bcrypt.compare(password, user.hashPassword)


            if (!isValid) {
                return res.status(400).json({ msg: "Invalid info!" });
            }
            else {

                const token = jwt.sign({
                    email: user.emailId,
                    id: user._id
                }, JWT_SECRET, { expiresIn: "4h" })

                return res.status(201).json({
                    msg: "You Loggedin Successfully",
                    User: {
                        _id: user._id,
                        userName: user.userName,
                        emailId: user.emailId,
                    },
                    Token: { token }
                });
            }

        }
        else {
            return res.status(400).json({ msg: "User Not Found" });
        }
    }

};


