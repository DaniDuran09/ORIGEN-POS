import { env } from "../../config/env.js";
import { prisma } from "../../database/prisma.js";
import { AuthMiddleware } from "../../shared/middlewares/auth.middleware.js";

import { BcryptAdapter } from "../../shared/security/adapters/hash/bcrypt.adapter.js";
import { JwtAdapter } from "../../shared/security/adapters/token/jwt.adapter.js";

import { AuthController } from "./controllers/auth.controller.js";
import { PrismaUserRepository } from "./repositories/prisma-user.repository.js";
import { createAuthRoutes } from "./routes/auth.routes.js";
import { LoginUseCase } from "./use-cases/login.use-case.js";

const userRepository = new PrismaUserRepository(prisma);

const hashAdapter = new BcryptAdapter(env.BCRYPT_SALT_ROUNDS);

const tokenAdapter = new JwtAdapter(
    env.JWT_SECRET,
    env.JWT_ACCESS_EXPIRES_IN,
);

const authMiddleware = new AuthMiddleware(tokenAdapter);

const loginUseCase = new LoginUseCase(
    userRepository,
    hashAdapter,
    tokenAdapter,
);

const authController = new AuthController(loginUseCase);

export const authRoutes = createAuthRoutes(authController, authMiddleware);