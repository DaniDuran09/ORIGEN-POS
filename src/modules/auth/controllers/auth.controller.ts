import type { Request, Response } from "express";
import type { LoginUseCase } from "../use-cases/login.use-case.js";
import { loginRequestSchema } from "../dtos/login-request.dto.js";
import type { RegisterUseCase } from "../use-cases/register.use-case.js";
import { registerRequestSchema } from "../dtos/register-request.dto.js";


export class AuthController {

    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase,
    ) { }

    async login(req: Request, res: Response): Promise<void> {

        const dto = loginRequestSchema.parse(req.body)

        const result = await this.loginUseCase.execute(dto)

        res.status(200).json(result);
    }

    async register(req: Request, res: Response): Promise<void> {
        const dto = registerRequestSchema.parse(req.body);

        const result = await this.registerUseCase.execute(dto);

        res.status(201).json(result);
    }

}