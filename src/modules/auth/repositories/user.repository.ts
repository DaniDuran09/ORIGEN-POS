import type { User } from "../../../../generated/prisma/client.js";
import type { RegisterRequestDto } from "../dtos/register-request.dto.js";

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>

    create(
        dto: RegisterRequestDto,
        passwordHash: string,
    ): Promise<User>;
}