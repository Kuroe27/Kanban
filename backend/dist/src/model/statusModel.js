"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const statusSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    statusName: {
        type: String,
        required: [true, "input required"],
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Status", statusSchema);
//# sourceMappingURL=statusModel.js.map