import type { NextFunction, Request, Response } from "express";
import type { TokenAdapter } from "../security/interfaces/token.adapter.js";
import { UnauthorizedError } from "../errors/http-errors.js";
import type { JwtPayload } from "jsonwebtoken";



export class AuthMiddleware {
    constructor(
        private readonly tokenAdapter: TokenAdapter,
    ) { }

    handle = async (
        req: Request,
        _res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const authorization = req.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedError("Missing authorization header");
        }

        const [type, token] = authorization.split(" ");

        if (type !== "Bearer" || !token) {
            throw new UnauthorizedError("Invalid authorization header");
        }

        const payload = await this.tokenAdapter.verify<JwtPayload>(token);

        req.user = payload;
        next();

    }
}