import BasicAuth from "../models/basicAuth.js";
import bcrypt from 'bcryptjs';

export const registerAuth = async (req, res) => {
    try {
        const { username, password } = req.body;

        const auth = await BasicAuth({
            username,
            password: bcrypt.hashSync(password, 10),
        });

        await auth.save();

         res.status(201).json({ message: "Registrasi Basic auth berhasil!", status: 201 });

    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
}