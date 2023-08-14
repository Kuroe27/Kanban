"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./src/config/db"));
const errorMiddleware_1 = __importDefault(require("./src/middlewares/errorMiddleware"));
const userRouter_1 = __importDefault(require("./src/routes/userRouter"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const statusRouter_1 = __importDefault(require("./src/routes/statusRouter"));
const taskRouter_1 = __importDefault(require("./src/routes/taskRouter"));
(0, dotenv_1.config)();
(0, db_1.default)();
const port = process.env.PORT;
const app = (0, express_1.default)();
const _dirname = __dirname;
// middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use("/api/users", userRouter_1.default);
app.use("/api/status", statusRouter_1.default);
app.use("/api/task", taskRouter_1.default);
app.use(express_1.default.static(path_1.default.join(_dirname, "src/routes")));
app.listen(port, () => {
    console.log(`${port}`);
});
// error Handling
app.use(errorMiddleware_1.default);
//# sourceMappingURL=index.js.map