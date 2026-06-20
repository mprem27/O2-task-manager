import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    action: {
      type: String,
      enum: ["CREATED", "UPDATED", "COMPLETED", "DELETED", "RESTORED"],
      required: true
    },
    titleSnapshot: {
      type: String,
      required: true
    },
    statusSnapshot: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const History = mongoose.model("History", historySchema);

export default History;
