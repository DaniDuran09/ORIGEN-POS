import jwt from 'jsonwebtoken';
import type { StringValue } from 'ms';
import type { TokenAdapter } from '../../interfaces/token.adapter.js';

export class JwtAdapter implements TokenAdapter {
    constructor(private readonly secret: string) { }

    async sign(payload: object, expiresIn: StringValue | number,): Promise<string> {
        return jwt.sign(payload, this.secret, {
            expiresIn,
        });
    }

    async verify<T>(token: string): Promise<T> {
        return jwt.verify(token, this.secret) as T;
    }
}