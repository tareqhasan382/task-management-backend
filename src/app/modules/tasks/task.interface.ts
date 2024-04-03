import { Model, Types } from "mongoose";

export type ITask = {
  _id?: string;
  userId: Types.ObjectId;
  todo: string;
  des: string;
  status: "Pending" | "InProgress" | "Completed" | "Done";
};

export type ITaskModel = Model<ITask, Record<string, unknown>>;
