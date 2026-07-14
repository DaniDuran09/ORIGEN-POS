import { Router } from "express";
import type { AuthController } from "../controllers/auth.controller.js";

export const createAuthRoutes = (
    controller: AuthController,
): Router => {
    const router = Router();

    router.post('/login', controller.login.bind(controller));

    return router;
}