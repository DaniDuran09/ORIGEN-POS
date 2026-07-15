import type { StringValue } from 'ms';

export interface TokenAdapter {

    sign(payload: object): Promise<string>;

    verify<T>(token: string): Promise<T>;

}
