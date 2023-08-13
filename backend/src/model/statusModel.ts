import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    statusName: {
      type: String,
      required: [true, "input required"],
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Status", statusSchema);
