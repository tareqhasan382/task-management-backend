import { Schema, model } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import config from "../../../config";
import bcrypt from "bcrypt";
const userSchema = new Schema<IUser>(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    address: { type: String, required: true },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
    phone: { type: Number },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
  next();
});
const UserModel = model<IUser, IUserModel>("User", userSchema);

export default UserModel;
