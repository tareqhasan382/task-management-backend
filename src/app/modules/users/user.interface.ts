import { Model } from "mongoose";

export type IUser = {
  _id?: string;
  role: "user" | "admin";
  name: string;
  email: string;
  password: string;
  address: string;
  gender: "Male" | "Female" | "Others";
  image?: string;
  phone?: number;
};

export type IUserModel = Model<IUser, Record<string, unknown>>;
