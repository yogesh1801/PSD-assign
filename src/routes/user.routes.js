import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { login , logout } from "../controllers/auth.controller.js";
import { createNote } from "../controllers/notes.controller.js";
const router = Router()

router.route("/register").post(registerUser);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/createnote").post(createNote);
export default router;