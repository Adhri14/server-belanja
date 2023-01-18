import { Users } from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const SECRET = process.env.SECRET;

export const signUpUser = async (req, res) => {
    const { name, email, password, phone, isAdmin } = req.body;
    try {
        const user = await Users({
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            phone,
            isAdmin: isAdmin || false,
        });

        await user.save();

        res.status(201).json({ message: "Registrasi berhasil!", status: 201 });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};

export const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
            res.status(422).json({
                message: "User tidak ditemukan!",
                status: 422,
            });
        } else {
            const checkPassword = bcrypt.compareSync(password, user.password);
            if (!checkPassword) {
                return res.status(422).json({
                    message: "Password anda salah!",
                    status: 422,
                });
            }
            const token = jwt.sign(
                { userId: user._id, isAdmin: user.isAdmin },
                SECRET
            );
            res.status(200).json({
                message: "Anda berhasil login!",
                status: 200,
                token,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};
