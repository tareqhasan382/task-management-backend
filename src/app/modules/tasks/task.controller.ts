import httpStatus from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { TaskService } from "./task.service";
import sendResponse from "../../../shared/sendResponse";
import { ITask } from "./task.interface";

const createTask = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await TaskService.createTask(data);

  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task created successfully!",
    data: result,
  });
});
const getAllTask = async (req: Request, res: Response) => {
  const result = await TaskService.getAllTasks(req.query);

  res.send({ meta: result.meta, data: result.data });
};

const updateTask = async (req: Request, res: Response) => {
  const id = req.params;
  const payload = req.body;

  const result = await TaskService.updateTask(id, payload);
  sendResponse<ITask>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task updated successfully!",
    data: result,
  });
};
const AllTask = async (req: Request, res: Response) => {
  const result = await TaskService.AllTasks(req.query);

  res.send({ meta: result.meta, data: result.data });
};
export const TaskController = {
  createTask,
  getAllTask,
  updateTask,
  AllTask,
};
