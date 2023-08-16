"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const statusController_1 = require("../controllers/statusController");
const statusRouter = express_1.default.Router();
statusRouter.route("/").post(authMiddleware_1.default, statusController_1.createStatus).get(authMiddleware_1.default, statusController_1.getStatus);
statusRouter
    .route("/:id")
    .get(authMiddleware_1.default, statusController_1.getSpecificStatus)
    .delete(authMiddleware_1.default, statusController_1.deleteStatus)
    .put(authMiddleware_1.default, statusController_1.updateStatus);
exports.default = statusRouter;
//# sourceMappingURL=statusRouter.js.map