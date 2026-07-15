import { Router } from "express";
import type { AuthController } from "../controllers/auth.controller.js";
import { AuthMiddleware } from "../../../shared/middlewares/auth.middleware.js";

export const createAuthRoutes = (
    controller: AuthController,
    authMiddleware: AuthMiddleware
): Router => {
    const router = Router();

    router.post('/login', controller.login.bind(controller));

    router.get(
        "/me",
        authMiddleware.handle.bind(authMiddleware),
        (_req, res) => {
            res.json({ ok: true });
        }
    )

    return router;
}