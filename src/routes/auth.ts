import { Router } from "express";
import {
  signup,
  login,
  logout,
  refreshToken,
} from "../controller/auth-controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refreshToken", refreshToken);
router.post("/logout", logout);

export default router;
