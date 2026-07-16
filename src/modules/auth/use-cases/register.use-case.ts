import { email } from "zod";
import { AuthErrors } from "../../../shared/errors/auth.errors.js";
import { ConflictError } from "../../../shared/errors/http-errors.js";
import type { HashAdapter } from "../../../shared/security/interfaces/hash.adapter.js";
import type { TokenAdapter } from "../../../shared/security/interfaces/token.adapter.js";
import type { RegisterRequestDto } from "../dtos/register-request.dto.js";
import type { UserRepository } from "../repositories/user.repository.js";


export class RegisterUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashAdapter: HashAdapter,
        private readonly tokenAdapter: TokenAdapter,
    ) { }

    async execute(dto: RegisterRequestDto) {
        const existsUser = await this.userRepository.findByEmail(dto.email);

        if (existsUser) {
            throw new ConflictError(AuthErrors.EMAIL_ALREADY_EXISTS);
        }

        const passwordHash = await this.hashAdapter.hash(dto.password);

        const user = await this.userRepository.create(
            dto,
            passwordHash
        );

        const accessToken = await this.tokenAdapter.sign({
            sub: user.id,
            email: user.email,
        });

        return {
            accessToken,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        }

    }

}