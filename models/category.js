import { model, Schema } from "mongoose";

let categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        color: {
            type: String,
        },
        icon: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Category = model("Category", categorySchema);
