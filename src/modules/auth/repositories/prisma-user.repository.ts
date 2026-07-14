import type { PrismaClient, User } from "../../../../generated/prisma/client.js";
import type { UserRepository } from "./user.repository.js";


export class PrismaUserRepository implements UserRepository {

    constructor(private readonly prisma: PrismaClient) { }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        })
    }

}