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
    get<A, B, C, D, E, F>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>): void;
    get<A, B, C, D, E, F, G>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>): void;
    get<A, B, C, D, E, F, G, H>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G, objH: H) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>): void;
    get<A, B, C, D, E, F, G, H, I>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G, objH: H, objI: I) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>): void;
    get<A, B, C, D, E, F, G, H, I, J>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G, objH: H, objI: I, objJ: J) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>): void;
    get<A, B, C, D, E, F, G, H, I, J, K>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G, objH: H, objI: I, objJ: J, objK: K) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>): void;
    get<A, B, C, D, E, F, G, H, I, J, K, L>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G, objH: H, objI: I, objJ: J, objK: K, objL: L) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>): void;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G, objH: H, objI: I, objJ: J, objK: K, objL: L, objM: M) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>): void;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G, objH: H, objI: I, objJ: J, objK: K, objL: L, objM: M, objN: N) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>): void;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(callback: (objA: A, objB: B, objC: C, objD: D, objE: E, objF: F, objG: G, objH: H, objI: I, objJ: J, objK: K, objL: L, objM: M, objN: N, objO: O) => void, tokenA: DiToken<A>, tokenB: DiToken<B>, tokenC: DiToken<C>, tokenD: DiToken<D>, tokenE: DiToken<E>, tokenF: DiToken<F>, tokenG: DiToken<G>, tokenH: DiToken<H>, tokenI: DiToken<I>, tokenJ: DiToken<J>, tokenK: DiToken<K>, tokenL: DiToken<L>, tokenM: DiToken<M>, tokenN: DiToken<N>, tokenO: DiToken<O>): void;
    onInit(callback: () => void): void;
    set<I>(token: DiToken<I>, clazz: new () => I): void;
}
export declare const DI: Container;
