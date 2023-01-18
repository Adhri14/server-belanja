import { Category } from "../models/category.js";

export const getCategory = async (req, res) => {
    try {
        const category = await Category.find();

        res.status(200).json({
            message: "Berhasil mengambil data kategori!",
            status: 200,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
            data: [],
        });
    }
};

export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params?.id });
        if (!category)
            return res.status(404).json({
                message: "Kategori tidak ditemukan!",
                status: 404,
                data: null,
            });

        res.status(200).json({
            message: "Berhasil mengambil data kategori!",
            status: 200,
            data: category,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
            data: null,
        });
    }
};

export const addCategory = async (req, res) => {
    try {
        const { name, color, icon } = req.body;

        const category = await Category({ name, color, icon });

        if (!category)
            return res.status(404).json({
                message: "Tidak dapat menambahkan kategori!",
                status: 404,
            });

        await category.save();

        res.status(201).json({
            message: "Berhasil menambahkan kategori!",
            status: 201,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, color, icon } = req.body;

        const category = await Category.findOneAndUpdate(
            { _id: id },
            { name, color, icon }
        );

        if (!category)
            return res.status(404).json({
                message: "Kategori tidak ditemukan!",
                status: 404,
            });

        res.status(200).json({
            message: "Berhasil mengubah kategori!",
            status: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findOneAndRemove({ _id: id });

        if (!category)
            return res.status(404).json({
                message: "Tidak dapat menghapus kategori!",
                status: 404,
            });

        res.status(200).json({
            message: "Berhasil menghapus category!",
            status: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};
