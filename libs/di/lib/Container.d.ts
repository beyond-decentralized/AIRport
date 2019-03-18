import { DiToken, Token } from './Token';
export interface IContainer {
    get<A>(callback: (objA: A) => void, tokenA: DiToken<A>): void;
    get<A, B>(callback: (objA: A, objB: B) => void, tokenA: DiToken<A>, tokenB: DiToken<B>): void;
    get<A, B, C>(callback: (objA: A, objB: B, objC: C) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>): void;
    get<A, B, C, D>(callback: (objA: A, objB: B, objC: C, objD: D) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>): void;
    get<A, B, C, D, E>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>): void;
    get(callback: (...objects: any[]) => void, ...tokens: Token[]): void;
    onInit(callback: () => void): void;
    set(token: Token, clazz: any): void;
}
export declare class Container {
    objects: any[];
    classes: any[];
    onInitCallback: () => void;
    numPendingInits: number;
    get<A>(callback: (objA: A) => void, tokenA: DiToken<A>): void;
    get<A, B>(callback: (objA: A, objB: B) => void, tokenA: DiToken<A>, tokenB: DiToken<B>): void;
    get<A, B, C>(callback: (objA: A, objB: B, objC: C) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>): void;
    get<A, B, C, D>(callback: (objA: A, objB: B, objC: C, objD: D) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>): void;
    get<A, B, C, D, E>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>): void;
    onInit(callback: () => void): void;
    set<I>(token: DiToken<I>, clazz: new () => I): void;
}
export declare const DI: Container;
