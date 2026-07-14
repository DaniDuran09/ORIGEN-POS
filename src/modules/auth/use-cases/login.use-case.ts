import type { TokenAdapter } from "../../../shared/security/adapters/token/token.adapter.js";
import type { HashAdapter } from "../../../shared/security/interfaces/hash.adapter.js";
import type { UserRepository } from "../repositories/user.repository.js";

export class LoginUseCase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly hashAdapter: HashAdapter,
        private readonly tokenAdapter: TokenAdapter
    ) { }

    async execute(email: string, password: string) {

    }

}