import { Schema, model } from "mongoose";
import { ITask, ITaskModel } from "./task.interface";
const taskSchema = new Schema<ITask>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    todo: { type: String, required: true },
    des: { type: String, required: true },
    status: {
      type: String,
      enum: ["Pending", "InProgress", "Completed", "Done"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const TaskModel = model<ITask, ITaskModel>("Task", taskSchema);
export default TaskModel;
