import type { User } from "../../../../generated/prisma/client.js";

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>
}