const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
async function register(req, res) {
    try {
        const {
            full_name,
            email,
            password,
            phone,
            role
        } = req.body;

        if (!full_name || !email || !password || !phone || !role) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
            });
        }

        userModel.findUserByEmail(email, async (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (results.length > 0) {
                return res.status(400).json({
                    message: "Email already exists."
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = {
                full_name,
                email,
                password: hashedPassword,
                phone,
                role
            };

        
            userModel.createUser(user, (err) => {

                if (err) {
                    return res.status(500).json({
                        message: err.message
                    });
                }

                res.status(201).json({
                    message: "User registered successfully."
                });

            });

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

async function login(req, res) {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required."
            });
        }

        userModel.findUserByEmail(email, async (err, results) => {

            if (err) {
                return res.status(500).json({
                    message: err.message
                });
            }

            if (results.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            const user = results[0];

        
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid email or password."
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h"
                }
            );

            res.status(200).json({
                message: "Login successful.",
                token,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role
                }
            });

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
}

module.exports = {
    register,
    login
};