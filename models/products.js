import { model, Schema } from "mongoose";

let productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        richDescription: {
            type: String,
            default: "",
        },
        image: {
            type: String,
            default: "",
        },
        images: [
            {
                type: String,
            },
        ],
        brand: {
            type: String,
            default: "",
        },
        price: {
            type: Number,
            default: 0,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        countInStock: {
            type: Number,
            required: true,
            min: 0,
            max: 255,
        },
        rating: {
            type: Number,
            required: true,
        },
        numReviews: {
            type: Number,
            default: 0,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Products = model("Product", productSchema);
