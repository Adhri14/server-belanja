import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import "dotenv/config";
import mongoose from "mongoose";
import productRouter from "./routes/products.js";
import cors from "cors";
import categoryRouter from "./routes/category.js";
import userRouter from "./routes/users.js";
import orderRouter from "./routes/order.js";
import registerAuthRouter from "./routes/registerAuth.js";
import { authJwt } from "./helper/jwt.js";

const app = express();
const api = process.env.API_VERSION;

// midleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());
app.options("*", cors());
app.use(authJwt());

app.use(`/${api}/product`, productRouter);
app.use(`/${api}/category`, categoryRouter);
app.use(`/${api}/auth`, userRouter);
app.use(`/${api}/order`, orderRouter);
app.use(`/${api}/registerAuth`, registerAuthRouter);

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.DATABASE_URL_DEV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database is ready...");
    })
    .catch((err) => {
        console.log("Database error : " + err);
    });

app.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({
            message: "Unauthorized in this route",
            status: 401,
        });
    } else {
        next(err);
    }
});

app.listen(3000, () => {
    console.log("Server is running now : http://localhost:3000");
});

// var server = app.listen(process.env.PORT || 3000, function () {
//     var port = server.address().port;
//     console.log("Server is running in port " + port);
// });

export default app;
