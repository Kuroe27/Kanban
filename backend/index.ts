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
// Enable CORS middleware
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://kanbanflow-nine.vercel.app",
];

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", allowedOrigins);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  next();
});
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    exposedHeaders: ["set-cookie"],
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
