import jwt, { type Secret } from "jsonwebtoken";
import type { StringValue } from "ms";

import { UnauthorizedError } from "../../../errors/http-errors.js";
import type { TokenAdapter } from "../../interfaces/token.adapter.js";

export class JwtAdapter implements TokenAdapter {

    constructor(
        private readonly secret: Secret,
        private readonly expiresIn: StringValue | number,
    ) { }

    async sign(payload: object): Promise<string> {
        return jwt.sign(payload, this.secret, {
            expiresIn: this.expiresIn,
        });
    }

    async verify<T>(token: string): Promise<T> {
        try {
            return jwt.verify(token, this.secret) as T;
        } catch (error) {
            if (error instanceof jwt.TokenExpiredError) {
                throw new UnauthorizedError("Token expired");
            }

            if (error instanceof jwt.JsonWebTokenError) {
                throw new UnauthorizedError("Invalid token");
            }

            throw error;
        }
    }

}