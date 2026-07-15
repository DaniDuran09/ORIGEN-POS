import express from "express";
import { authRoutes } from "./modules/auth/auth.module.js";
import { env } from "./config/env.js";
import { errorHandler } from "./shared/errors/error-handler.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use(errorHandler);

export default app;



app.listen(env.PORT, () => {
    console.log('Server running on port ', env.PORT)
})