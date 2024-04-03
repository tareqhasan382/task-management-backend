import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./user.interface";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";
const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await UserService.createUser(data);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully!",
    data: result,
  });
});
const logInUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (email && password) {
      const user = await UserService.login(email, password);
      if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: "User Not Found !!",
        });
      }
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return res.status(httpStatus.BAD_REQUEST).json({
          statusCode: httpStatus.NOT_FOUND,
          success: false,
          message: "Invalid password !!",
        });
      }
      // create jwt token
      const accessToken = jwt.sign(
        {
          userId: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
          image: user?.image,
        },
        config.jwt.secret as Secret,
        { expiresIn: config.jwt.expires_in }
      );
      return res.status(200).json({
        status: true,
        message: "user logged in successfully",
        token: accessToken,
      });
    }
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      status: false,
      message: "Something went to wrong!",
    });
  }
};
// get all user
const getAllUser = async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  res.send(users);
};
// get single user
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully !",
    data: result,
  });
});
// update user
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully !",
    data: result,
  });
});

export const UserController = {
  createUser,
  logInUser,
  getAllUser,
  getSingleUser,
  updateUser,
};
