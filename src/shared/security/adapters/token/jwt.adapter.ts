import jwt, { type Secret } from "jsonwebtoken";
import type { TokenAdapter } from "../../interfaces/token.adapter.js";
import type { StringValue } from "ms";

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
        return jwt.verify(token, this.secret) as T;
    }

}