import type { NextFunction, Request, Response } from "express";
import { AppError } from "./app.error.js";
import { ZodError } from "zod";



export function errorHandler(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            message: error.message,
        });

        return;
    }

    if (error instanceof ZodError) {
        res.status(400).json({
            message: "Validation failed",
            errors: error.issues,
        });

        return;
    }

    console.error(error);

    res.status(500).json({
        message: "Internal server error",
    });
}