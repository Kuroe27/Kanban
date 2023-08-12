import express from "express";
import { config } from "dotenv";
import path from "path";
import color from "colors";
import connectDB from "./src/config/db";
import errorHandler from "./src/middlewares/errorMiddleware";
import userRouter from "./src/routes/userRouter";
import cookieParser from "cookie-parser";
import statusRouter from "./src/routes/statusRouter";
config();
connectDB();

const port = process.env.PORT;
const app = express();
const _dirname = __dirname;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/api/users", userRouter);
app.use("/api/status", statusRouter);

app.use(express.static(path.join(_dirname, "src/routes")));
app.listen(port, () => {
  console.log(`${port}`);
});

// error Handling
app.use(errorHandler);
