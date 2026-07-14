import type { StringValue } from 'ms';

export interface TokenAdapter {
    sign(
        payload: object,
        expiresIn: StringValue | number,
    ): Promise<string>;

    verify<T>(token: string): Promise<T>;
}
