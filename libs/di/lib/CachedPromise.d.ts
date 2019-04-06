import { DiToken } from './Token';
export interface ICachedPromise<A> {
    get(): Promise<A>;
}
export declare class CachedPromise<A> implements ICachedPromise<A> {
    private token;
    private injectable;
    constructor(token: DiToken<A>);
    get(): Promise<A>;
}
