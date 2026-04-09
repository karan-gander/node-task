import { Router } from "express";
import { userRegister } from "../controllers/user/userRegister.controller.js";
import { userLogin } from "../controllers/user/userLogin.js";
import { logout } from "../controllers/user/userLogout.js";
import { getCurruntUser } from "../controllers/user/curruntUser.js";
import { verifyJWT } from "../middleware/auth.js";
import {
  createTask,
  deleteMultipleTasks,
  deleteTask,
  getAllTask,
  getTasksByCategory,
  updateTask,
} from "../controllers/user/taskControl.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);

//  auth routres

router
  .route("/tasks")
  .post(verifyJWT, createTask)
  .get(verifyJWT, getAllTask)
  .patch(verifyJWT, updateTask)
  .delete(verifyJWT, deleteTask);

router.route("/logout").post(logout);
router.route("/currunt-user").post(verifyJWT, getCurruntUser);

router.route("/delete-many").post(verifyJWT, deleteMultipleTasks);



router.route("/fillter").post(verifyJWT,getTasksByCategory)
// router.route("/user-details").patch(getCurruntUser);

//  notes and old papers routes
//  jwt add karana hai after testig in both routes

export default router;
