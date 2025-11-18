import express from 'express';
const router = express.Router();

import { signup, login } from "../controllers/userAuthController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validateMiddleware.js";  
import { signupSchema, loginSchema } from "../validations/validations.js"; 

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

export default router;
