import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IUser } from "./user.interface";
import UserModel from "./user.model";

const createUser = async (user: IUser): Promise<IUser | null> => {
  const createdUser = await UserModel.create(user);
  if (!createUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Field to create user!");
  }
  return createdUser;
};
const login = async (
  email: string,
  password: string
): Promise<IUser | null> => {
  const user = await UserModel.findOne({ email: email }).select(
    "role name email password image"
  );
  if (!user) {
    return null;
  }

  return user;
};
const getAllUsers = async (): Promise<IUser[]> => {
  return UserModel.find();
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await UserModel.findOne({ _id: id });
  return result;
};

const updateUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const find_id = await UserModel.findOne({ _id: id });
  if (!find_id) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const result = await UserModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

export const UserService = {
  createUser,
  login,
  getAllUsers,
  getSingleUser,
  updateUser,
};
