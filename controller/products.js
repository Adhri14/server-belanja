import { Products } from "../models/products.js";
import { Category } from "../models/category.js";

export const getAllProduct = async (req, res) => {
    try {
        let filter = {};
        if (req.query.categories) {
            filter = { category: req.query.categories.split(",") };
        }
        const products = await Products.find(filter).populate("category");

        if (!products) {
            return res.status(404).json({
                message: "Tidak dapat menemukan data products!",
                status: 404,
                data: [],
            });
        }

        res.status(200).json({
            message: "Berhasil get data product!",
            status: 200,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            message: error || "Terjadi kesalahan pada server!",
            status: 500,
            data: [],
        });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Products.findById({ _id: id }).populate(
            "category"
        );

        if (!products) {
            return res.status(404).json({
                message: "Tidak dapat menemukan data product!",
                status: 404,
                data: null,
            });
        }

        res.status(200).json({
            message: "Berhasil get data product!",
            status: 200,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            message: error || "Terjadi kesalahan pada server!",
            status: 500,
            data: null,
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
        } = req.body;

        const product = await Products({
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
        });

        const categoryId = await Category.findById({ _id: category });

        if (!categoryId)
            return res.status(422).json({
                message: "Kategori tidak ditemukan!",
                status: 422,
            });

        if (!product)
            return res.status(404).json({
                message: "Tidak dapat menambahkan produk!",
                status: 404,
            });

        await product.save();

        res.status(201).json({
            message: "Berhasil menambahkan produk!",
            status: 201,
        });
    } catch (error) {
        res.status(500).json({
            message: error || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const products = await Products.findByIdAndRemove({ _id: id });

        if (!products) {
            return res.status(404).json({
                message: "Tidak dapat menemukan data product!",
                status: 404,
            });
        }

        res.status(200).json({
            message: "Berhasil menghapus data product!",
            status: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: error || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured,
        } = req.body;

        const product = await Products.findOneAndUpdate(
            { _id: id },
            {
                name,
                description,
                richDescription,
                image,
                images,
                brand,
                price,
                category,
                countInStock,
                rating,
                numReviews,
                isFeatured,
            },
            { new: true }
        );

        const categoryId = await Category.findById({ _id: category });

        if (!categoryId)
            return res.status(422).json({
                message: "Kategori tidak ditemukan!",
                status: 422,
            });

        if (!product)
            return res.status(404).json({
                message: "Product tidak ditemukan!",
                status: 404,
            });

        res.status(200).json({
            message: "Berhasil mengubah produk!",
            status: 200,
        });
    } catch (error) {
        res.status(500).json({
            message: error || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};
