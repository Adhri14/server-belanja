import "dotenv/config";
import { expressjwt } from "express-jwt";

export const authJwt = () => {
    const secret = process.env.SECRET;
    const api = process.env.API_VERSION;
    return expressjwt({
        secret,
        algorithms: ["HS256"],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/api\/v1\/product(.*)/, methods: ["GET", "OPTIONS"] },
            { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
            `/${api}/auth/signInUser`,
            `/${api}/auth/signUpUser`,
        ],
    });
};

const isRevoked = (req, token) => {
    if (!token.payload.isAdmin) {
        return true;
    }
    return false;
};
