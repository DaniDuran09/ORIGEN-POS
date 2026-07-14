import type { HashAdapter } from "../../interfaces/hash.adapter.js";
import bcrypt from 'bcrypt';

export class BcryptAdapter implements HashAdapter {

    constructor(private readonly saltRounds: number) { }

    async hash(value: string): Promise<string> {
        return bcrypt.hash(value, this.saltRounds)
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return bcrypt.compare(value, hash);
    }

}