import express from "express";
import { authRoutes } from "./modules/auth/auth.module.js";
import { env } from "./config/env.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

export default app;



app.listen(env.PORT, () => {
    console.log('Server running on port ', env.PORT)
})