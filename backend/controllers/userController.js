const mongoose = require("mongoose");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const crypto = require("crypto");
const mailer = require("../modules/mailer");

// Gerador de token 
generateToken = (params = {}) => {
    return jwt.sign(params, process.env.SECRET, {
        expiresIn: 86400,
    })
}

const userController = {
    register: async (req, res) => {
        const { email } = req.body;
        try {
            if (await User.findOne({ email })) {
                return res.status(400).json({ errors: ["User already exists"] })
            }

            const user = await User.create(req.body);
            user.password = undefined;
            return res.json({ user, token: generateToken({ id: user.id }) });
        } catch (error) {
            return res.status(400).json({ errors: ["Registation failed"] });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ errors: ["User not found"] });
        }
        if (!await bcryptjs.compare(password, user.password)) {
            return res.status(400).json({ errors: ["Invalid password"] });
        }
        user.password = undefined;

        res.json({ user, token: generateToken({ id: user.id }) });
    },
    forgot_password: async (req, res) => {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ errors: ["User not found"] });
            }

            // gera um novo token aleatório de 20 caracteres em string hexadecimal 
            const token = crypto.randomBytes(20).toString("hex");

            const now = new Date();
            // pega o horario no instante que rodar e adiciona mais uma hora
            now.setHours(now.getHours() + 1);

            // $set são os campos que vou setar
            await User.findByIdAndUpdate(user.id, {
                "$set": {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });
            // sendMail() envia o email para o destinatario
            mailer.jsonMail(
                {
                    to: email,
                    from: "luisgustavo.201333@gmail.com",
                    template: "auth/forgot_password",
                    context: { token },
                }, (err) => {
                    if (err) {
                        return res.status(400).json({ err, error: ["Cannot send forgot password email"] })
                    }
                    return res.json();
                }
            );

        } catch (error) {
            return res.status(400).json({ errors: ["Error on forgot password, try again"] });
        }
    },
    reset_password: async (req, res) => {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email }).select("+passwordResetToken passwordResetExpires");

            if (!user) {
                return res.status(400).json({ errors: ["User not found"] });
            }

            if (token !== user.passwordResetToken) {
                return res.status(400).json({ errors: ["Token invalid"] });
            }

            const now = new Date();

            if (now > user.passwordResetExpires) {
                return res.status(400).json({ errors: ["Token expired, generate a new one"] });
            }
            user.password = password;
            await user.save();
            res.json();

        } catch (error) {
            return res.status(400).json({ errors: ["Cannot reset password, try again"] });
        }
    },
    update: async (req, res) => {
        const { name, password, bio } = req.body;

        let profileImage = null;

        if (req.file) {
            profileImage = req.file.filename;
        }

        const reqUser = req.user;

        const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
            "-password"
        );

        if (name) {
            user.name = name;
        }

        if (password) {
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            user.password = passwordHash;
        }

        if (profileImage) {
            user.profileImage = profileImage;
        }

        if (bio) {
            user.bio = bio;
        }

        await user.save();

        res.status(200).json(user);
    }
}

module.exports = userController;