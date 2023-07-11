import { model, Schema } from "mongoose";

const basicAuthSchema = new Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
    },
});

const BasicAuth = model('BasicAuth', basicAuthSchema);
export default BasicAuth;