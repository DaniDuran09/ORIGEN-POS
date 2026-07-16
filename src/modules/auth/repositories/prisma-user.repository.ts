import type { PrismaClient, User } from "../../../../generated/prisma/client.js";
import type { RegisterRequestDto } from "../dtos/register-request.dto.js";
import type { UserRepository } from "./user.repository.js";


export class PrismaUserRepository implements UserRepository {

    constructor(private readonly prisma: PrismaClient) { }

    findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    create(dto: RegisterRequestDto, passwordHash: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                passwordHash,
            },
        });
    }

}