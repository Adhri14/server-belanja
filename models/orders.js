import { Schema, model } from "mongoose";

let orderSchema = new Schema(
    {
        orderItems: [
            {
                type: Schema.Types.ObjectId,
                ref: "OrderItem",
                required: true,
            },
        ],
        shippingAddress1: {
            type: String,
            required: true,
        },
        shippingAddress2: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            default: "Pending",
        },
        totalPrice: {
            type: Number,
            default: 0,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export const Order = model("Order", orderSchema);
