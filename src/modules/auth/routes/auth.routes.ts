import { Router } from "express";
import type { AuthController } from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../../../shared/middlewares/auth.middleware.js";
import { validate } from "../../../shared/middlewares/validate.middleware.js";
import { loginRequestSchema } from "../dtos/login-request.dto.js";
import { registerRequestSchema } from "../dtos/register-request.dto.js";

export const createAuthRoutes = (
    controller: AuthController,
    authMiddleware: AuthMiddleware
): Router => {
    const router = Router();

    router.post(
        "/login",
        validate(loginRequestSchema),
        controller.login,
    );

    router.post(
        "/register",
        validate(registerRequestSchema),
        controller.register,
    );

    // router.get(
    //     "/me",
    //     authMiddleware.handle,
    //     controller.me,
    // );

    return router;
}