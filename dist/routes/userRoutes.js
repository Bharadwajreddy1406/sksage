import { Router } from "express";
import { loginUser, signUpUser } from "../controllers/userControllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validator.js";
const userRouter = Router();
userRouter.post("/signup", validate(signupValidator), signUpUser);
userRouter.post("/login", validate(loginValidator), loginUser);
export default userRouter;
//# sourceMappingURL=userRoutes.js.map