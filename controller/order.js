import { OrderItem } from "../models/orderItem.js";
import { Order } from "../models/orders.js";
import { Users } from "../models/users.js";

export const checkout = async (req, res) => {
    try {
        const {
            orderItemIds,
            shippingAddress1,
            shippingAddress2,
            city,
            zipCode,
            phone,
            status,
            totalPrice,
            user,
            isCheckoutNow,
        } = req.body;
        const userLogin = await Users.findById({ _id: user });
        const orderItem = await OrderItem.find({ user });

        if (!isCheckoutNow && !orderItem.length)
            return res
                .status(400)
                .json({ message: "Order item tidak ditemukan!" });

        if (!userLogin)
            return res.status(400).json({ message: "User tidak ditemukan!" });

        const order = await Order({
            orderItems: orderItemIds,
            shippingAddress1,
            shippingAddress2,
            city,
            zipCode,
            phone,
            status,
            totalPrice,
            user,
            isCheckoutNow: isCheckoutNow || false,
        });

        await order.save();

        res.status(201).json({
            message: "Berhasil melakukan order!",
            status: 201,
        });
    } catch (error) {
        res.status(500).json({
            message: error || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};

export const cart = async (req, res) => {
    try {
        const { productId, quantity, userId } = req.body;
        const cart = await OrderItem({
            product: productId,
            quantity: quantity,
            user: userId,
        });

        await cart.save();

        res.status(201).json({
            message: "Berhasil menambahkan item dikeranjang!",
            status: 201,
        });
    } catch (error) {
        res.status(500).json({
            message: error || "Terjadi kesalahan pada server!",
            status: 500,
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.query;
        const cart = await OrderItem.find({ user: userId })
            .populate("product")
            .select("product quantity createdAt updatedAt");

        res.status(200).json({
            message: "Berhasil mengambil data keranjang anda!",
            status: 200,
            data: cart,
        });
    } catch (error) {
        res.status(500).json({
            message: error || "Terjadi kesalahan pada server!",
            status: 500,
            data: null,
        });
    }
};

export const getOrder = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            res.status(400).json({
                message: "User Id tidak ditemukan!",
                status: 400,
                data: null,
            });
        }

        const order = await Order.find({ user: userId })
            .populate("user", "name email phone")
            .populate("orderItems")
            .select(
                "shippingAddress1 shippingAddress2 city zipCode phone status totalPrice createdAt updatedAt orderItems"
            );
        const orderItem = await OrderItem.find({ user: userId });

        console.log(orderItem);

        res.status(200).json({
            message: "Berhasil mengambil data order anda!",
            status: 200,
            data: order,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Terjadi kesalahan pada server!",
            status: 500,
            data: null,
        });
    }
};
