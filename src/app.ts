import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import httpStatus from "http-status";
import { UserRoute } from "./app/modules/users/user.route";
import { TaskRoute } from "./app/modules/tasks/task.route";
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Applications route
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/task", TaskRoute);
//Testing Route
app.get("/", async (res: Response) => {
  return res
    .status(httpStatus.OK)
    .json({ success: true, message: "SERVER RUN SUCCESSFULLY !" });
});
//  global error handling || next => Error 4 parameter ||
app.use(globalErrorHandler);

// route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.BAD_REQUEST).json({
    success: false,
    messase: "Not Found",
    errorMessage: [
      {
        path: req.originalUrl,
        message: "API NOT FOUND!",
      },
    ],
  });
  next();
});

export default app;
