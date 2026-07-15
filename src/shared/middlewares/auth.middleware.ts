import type { NextFunction, Request, Response } from "express";
import type { TokenAdapter } from "../security/interfaces/token.adapter.js";
import { UnauthorizedError } from "../errors/http-errors.js";



export class AuthMiddleware {
    constructor(
        private readonly tokenAdapter: TokenAdapter,
    ) { }

    async handle(
        req: Request,
        _res: Response,
        next: NextFunction,
    ): Promise<void> {
        const authorization = req.headers.authorization;

        if (!authorization) {
            throw new UnauthorizedError("Missing authorization header");
        }

        const [type, token] = authorization.split(" ");

        if (type !== "Bearer" || !token) {
            throw new UnauthorizedError("Invalid authorization header");
        }

        await this.tokenAdapter.verify(token);

        next();

    }
}