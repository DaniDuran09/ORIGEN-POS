import type { Request, Response } from "express";
import type { LoginUseCase } from "../use-cases/login.use-case.js";
import type { LoginRequestDto } from "../dtos/login-request.dto.js";
import type { RegisterUseCase } from "../use-cases/register.use-case.js";
import type { RegisterRequestDto } from "../dtos/register-request.dto.js";


export class AuthController {

    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase,
    ) { }

    login = async (req: Request, res: Response): Promise<void> => {

        const dto = req.body as LoginRequestDto;

        const result = await this.loginUseCase.execute(dto)

        res.status(200).json(result);
    }

    register = async (req: Request, res: Response): Promise<void> => {
        const dto = req.body as RegisterRequestDto;

        const result = await this.registerUseCase.execute(dto);

        res.status(201).json(result);
    }

}