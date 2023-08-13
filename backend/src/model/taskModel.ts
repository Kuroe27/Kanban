import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Status",
    },
    taskName: {
      type: String,
      required: [true, "Input required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
