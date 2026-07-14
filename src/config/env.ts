import 'dotenv/config';

const getEnv = (key: string): string => {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Environment variable "${key}" is not defined.`);
    }

    return value;
};

export const env = {
    PORT: Number(process.env.PORT ?? 3000),

    DATABASE_URL: getEnv('DATABASE_URL'),

    JWT_SECRET: getEnv('JWT_SECRET'),
    JWT_ACCESS_EXPIRES_IN: getEnv('JWT_ACCESS_EXPIRES_IN'),
    JWT_REFRESH_EXPIRES_IN: getEnv('JWT_REFRESH_EXPIRES_IN'),

    BCRYPT_SALT_ROUNDS: Number(getEnv('BCRYPT_SALT_ROUNDS')),
} as const;