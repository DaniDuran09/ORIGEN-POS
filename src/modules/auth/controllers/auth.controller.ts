import type { Request, Response } from "express";
import type { LoginUseCase } from "../use-cases/login.use-case.js";
import { loginRequestSchema } from "../dtos/login-request.dto.js";


export class AuthController {

    constructor(
        private readonly loginUseCase: LoginUseCase,
    ) { }

    async login(req: Request, res: Response): Promise<void> {

        const dto = loginRequestSchema.parse(req.body)

        const result = await this.loginUseCase.execute(dto)

        res.status(200).json(result);
    }

}