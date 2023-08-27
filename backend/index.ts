import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import path from "path";
import connectDB from "./src/config/db";
import errorHandler from "./src/middlewares/errorMiddleware";
import statusRouter from "./src/routes/statusRouter";
import TaskRouter from "./src/routes/taskRouter";
import userRouter from "./src/routes/userRouter";
config();
connectDB();

const port = process.env.PORT;
const app = express();
app.set("trust proxy", 1);
const _dirname = __dirname;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://kanbanflow-nine.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRouter);
app.use("/api/status", statusRouter);
app.use("/api/task", TaskRouter);

app.use(express.static(path.join(_dirname, "src/routes")));
app.listen(port, () => {
  console.log(`${port}`);
});

// error Handling
app.use(errorHandler);

export default app;
