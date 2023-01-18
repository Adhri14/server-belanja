import { model, Schema } from "mongoose";

let usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    street: {
        type: String,
        default: "",
    },
    houseNumber: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    zipCode: {
        type: String,
        default: "",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

usersSchema.path("email").validate(
    async function (value) {
        try {
            const count = await this.model("User").countDocuments({
                email: value,
            });
            return !count;
        } catch (error) {
            throw error;
        }
    },
    (attr) => `${attr.value} sudah terdaftar!`
);

export const Users = model("User", usersSchema);
