import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { ITask } from "./task.interface";
import TaskModel from "./task.model";
import { IGenericResponse } from "../../../interface/common";

const createTask = async (user: ITask): Promise<ITask | null> => {
  const createdTask = await TaskModel.create(user);
  if (!createTask) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Field to create user!");
  }
  return createdTask;
};
const getAllTasks = async (
  payload: any
): Promise<IGenericResponse<ITask[]>> => {
  const page = parseInt(payload?.page) || 1;
  const limit = parseInt(payload?.limit) || 5;
  const count = await TaskModel.countDocuments();
  const result = await TaskModel.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return {
    meta: {
      total: count,
      page: page,
      limit: limit,
    },
    data: result,
  };
};

const updateTask = async (
  id: any,
  payload: Partial<ITask>
): Promise<ITask | null> => {
  const result = await TaskModel.findOneAndUpdate({ _id: id.id }, payload, {
    new: true,
  });

  return result;
};
const AllTasks = async (payload: any): Promise<IGenericResponse<ITask[]>> => {
  const page = parseInt(payload?.page) || 1;
  const limit = parseInt(payload?.limit) || 5;
  const status = payload.status;
  const query: any = {};
  if (status) {
    query.status = status;
  }
  const count = await TaskModel.countDocuments(status);
  const result = await TaskModel.find(query)
    .skip((page - 1) * limit)
    .limit(limit);
  return {
    meta: {
      total: count,
      page: page,
      limit: limit,
    },
    data: result,
  };
};
export const TaskService = {
  createTask,
  getAllTasks,
  updateTask,
  AllTasks,
};
