import express from "express";
import { TaskController } from "./task.controller";
const router = express.Router();

router.get("/tasks", TaskController.getAllTask),
  router.get("/status-task", TaskController.AllTask),
  router.patch("/update/:id", TaskController.updateTask);
router.post("/create-task", TaskController.createTask);
export const TaskRoute = router;
