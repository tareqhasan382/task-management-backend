import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
const router = express.Router();

// router.get('/:id', UserController.getSingleUser),
router.get("/users", UserController.getAllUser),
  router.post(
    "/user-login",
    validateRequest(UserValidation.logInUserZodSchema),
    UserController.logInUser
  ),
  //   router.patch('/:id', UserController.updateUser),
  router.post(
    "/create-user",
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
  );
export const UserRoute = router;
