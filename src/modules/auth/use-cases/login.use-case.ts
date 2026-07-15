import type { HashAdapter } from "../../../shared/security/interfaces/hash.adapter.js";
import type { TokenAdapter } from "../../../shared/security/interfaces/token.adapter.js";
import type { LoginRequestDto } from "../dtos/login-request.dto.js";
import type { UserRepository } from "../repositories/user.repository.js";

export class LoginUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashAdapter: HashAdapter,
        private readonly tokenAdapter: TokenAdapter
    ) { }

    async execute(dto: LoginRequestDto) {
        const user = await this.userRepository.findByEmail(dto.email);

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const isValidPassword = await this.hashAdapter.compare(
            dto.password,
            user.passwordHash
        )

        if (!isValidPassword) {
            throw new Error("Invalid credentials");
        }

        const accessToken = await this.tokenAdapter.sign({
            sub: user.id,
            email: user.email,
        });

        return {
            accessToken,
        };
    }

}