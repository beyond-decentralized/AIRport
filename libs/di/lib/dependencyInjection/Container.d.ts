import { IInjectionContext } from '../Context';
import { IDiToken } from './Token';
export interface IChildContainer extends IContainer {
    context: IInjectionContext;
    get<A>(tokenA: IDiToken<A>): Promise<A>;
    get<A, B>(tokenA: IDiToken<A>, tokenB: IDiToken<B>): Promise<[A, B]>;
    get<A, B, C>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>): Promise<[A, B, C]>;
    get<A, B, C, D>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>): Promise<[A, B, C, D]>;
    get<A, B, C, D, E>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>): Promise<[A, B, C, D, E]>;
    get<A, B, C, D, E, F>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>): Promise<[A, B, C, D, E, F]>;
    get<A, B, C, D, E, F, G>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>): Promise<[A, B, C, D, E, F, G]>;
    get<A, B, C, D, E, F, G, H>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>): Promise<[A, B, C, D, E, F, G, H]>;
    get<A, B, C, D, E, F, G, H, I>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>): Promise<[A, B, C, D, E, F, G, H, I]>;
    get<A, B, C, D, E, F, G, H, I, J>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>): Promise<[A, B, C, D, E, F, G, H, I, J]>;
    get<A, B, C, D, E, F, G, H, I, J, K>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>): Promise<[A, B, C, D, E, F, G, H, I, J, K]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>, tokenO: IDiToken<O>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>;
    get(...tokens: Array<IDiToken<any>>): Promise<any[]>;
    eventuallyGet<A>(token: IDiToken<A>): Promise<A>;
    eventuallyGet(...tokens: Array<IDiToken<any>>): Promise<any[]>;
    getSync<A>(tokenA: IDiToken<A>): A;
    getSync<A, B>(tokenA: IDiToken<A>, tokenB: IDiToken<B>): [A, B];
    getSync<A, B, C>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>): [A, B, C];
    getSync<A, B, C, D>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>): [A, B, C, D];
    getSync<A, B, C, D, E>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>): [A, B, C, D, E];
    getSync<A, B, C, D, E, F>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>): [A, B, C, D, E, F];
    getSync<A, B, C, D, E, F, G>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>): [A, B, C, D, E, F, G];
    getSync<A, B, C, D, E, F, G, H>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>): [A, B, C, D, E, F, G, H];
    getSync<A, B, C, D, E, F, G, H, I>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>): [A, B, C, D, E, F, G, H, I];
    getSync<A, B, C, D, E, F, G, H, I, J>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>): [A, B, C, D, E, F, G, H, I, J];
    getSync<A, B, C, D, E, F, G, H, I, J, K>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>): [A, B, C, D, E, F, G, H, I, J, K];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>): [A, B, C, D, E, F, G, H, I, J, K, L];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>): [A, B, C, D, E, F, G, H, I, J, K, L, M];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>, tokenO: IDiToken<O>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O];
    getSync(...tokens: Array<IDiToken<any>>): any;
    getBySchemaSignatureAndName(librarySignature: string, tokenName: string): Promise<any>;
}
export interface IContainer {
    set<I>(token: IDiToken<I>, clazz: new () => I): void;
}
export interface IRootContainer extends IContainer {
    db(): IChildContainer;
    ui(componentName: string): IChildContainer;
    remove(container: IChildContainer): void;
}
export declare class Container implements IContainer {
    set<I>(token: IDiToken<I>, clazz: new () => I): void;
}
export declare class ChildContainer extends Container implements IChildContainer {
    context: IInjectionContext;
    constructor(context: IInjectionContext);
    private doEventuallyGet;
    private doGet;
    private doGetCore;
    getBySchemaSignatureAndName(librarySignature: string, tokenName: string): Promise<any>;
    get<A>(tokenA: IDiToken<A>): Promise<A>;
    get<A, B>(tokenA: IDiToken<A>, tokenB: IDiToken<B>): Promise<[A, B]>;
    get<A, B, C>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>): Promise<[A, B, C]>;
    get<A, B, C, D>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>): Promise<[A, B, C, D]>;
    get<A, B, C, D, E>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>): Promise<[A, B, C, D, E]>;
    get<A, B, C, D, E, F>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>): Promise<[A, B, C, D, E, F]>;
    get<A, B, C, D, E, F, G>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>): Promise<[A, B, C, D, E, F, G]>;
    get<A, B, C, D, E, F, G, H>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>): Promise<[A, B, C, D, E, F, G, H]>;
    get<A, B, C, D, E, F, G, H, I>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>): Promise<[A, B, C, D, E, F, G, H, I]>;
    get<A, B, C, D, E, F, G, H, I, J>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>): Promise<[A, B, C, D, E, F, G, H, I, J]>;
    get<A, B, C, D, E, F, G, H, I, J, K>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>): Promise<[A, B, C, D, E, F, G, H, I, J, K]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>, tokenO: IDiToken<O>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>;
    eventuallyGet<A>(token: IDiToken<A>): Promise<A>;
    getSync<A>(tokenA: IDiToken<A>): A;
    getSync<A, B>(tokenA: IDiToken<A>, tokenB: IDiToken<B>): [A, B];
    getSync<A, B, C>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>): [A, B, C];
    getSync<A, B, C, D>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>): [A, B, C, D];
    getSync<A, B, C, D, E>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>): [A, B, C, D, E];
    getSync<A, B, C, D, E, F>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>): [A, B, C, D, E, F];
    getSync<A, B, C, D, E, F, G>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>): [A, B, C, D, E, F, G];
    getSync<A, B, C, D, E, F, G, H>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>): [A, B, C, D, E, F, G, H];
    getSync<A, B, C, D, E, F, G, H, I>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>): [A, B, C, D, E, F, G, H, I];
    getSync<A, B, C, D, E, F, G, H, I, J>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>): [A, B, C, D, E, F, G, H, I, J];
    getSync<A, B, C, D, E, F, G, H, I, J, K>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>): [A, B, C, D, E, F, G, H, I, J, K];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>): [A, B, C, D, E, F, G, H, I, J, K, L];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>): [A, B, C, D, E, F, G, H, I, J, K, L, M];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>, tokenO: IDiToken<O>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O];
}
export declare class RootContainer extends Container implements IRootContainer {
    childContainers: Set<IContainer>;
    uiContainerMap: Map<string, Set<IContainer>>;
    dbContainer: IChildContainer;
    db(): IChildContainer;
    remove(container: IChildContainer): void;
    ui(componentName: string): IChildContainer;
    private addContainer;
}
export declare class InversionOfControl {
    get<A>(tokenA: IDiToken<A>): Promise<A>;
    get<A, B>(tokenA: IDiToken<A>, tokenB: IDiToken<B>): Promise<[A, B]>;
    get<A, B, C>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>): Promise<[A, B, C]>;
    get<A, B, C, D>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>): Promise<[A, B, C, D]>;
    get<A, B, C, D, E>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>): Promise<[A, B, C, D, E]>;
    get<A, B, C, D, E, F>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>): Promise<[A, B, C, D, E, F]>;
    get<A, B, C, D, E, F, G>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>): Promise<[A, B, C, D, E, F, G]>;
    get<A, B, C, D, E, F, G, H>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>): Promise<[A, B, C, D, E, F, G, H]>;
    get<A, B, C, D, E, F, G, H, I>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>): Promise<[A, B, C, D, E, F, G, H, I]>;
    get<A, B, C, D, E, F, G, H, I, J>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>): Promise<[A, B, C, D, E, F, G, H, I, J]>;
    get<A, B, C, D, E, F, G, H, I, J, K>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>): Promise<[A, B, C, D, E, F, G, H, I, J, K]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>;
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>, tokenO: IDiToken<O>): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>;
    eventuallyGet<A>(token: IDiToken<A>): Promise<A>;
    getSync<A>(tokenA: IDiToken<A>): A;
    getSync<A, B>(tokenA: IDiToken<A>, tokenB: IDiToken<B>): [A, B];
    getSync<A, B, C>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>): [A, B, C];
    getSync<A, B, C, D>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>): [A, B, C, D];
    getSync<A, B, C, D, E>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>): [A, B, C, D, E];
    getSync<A, B, C, D, E, F>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>): [A, B, C, D, E, F];
    getSync<A, B, C, D, E, F, G>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>): [A, B, C, D, E, F, G];
    getSync<A, B, C, D, E, F, G, H>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>): [A, B, C, D, E, F, G, H];
    getSync<A, B, C, D, E, F, G, H, I>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>): [A, B, C, D, E, F, G, H, I];
    getSync<A, B, C, D, E, F, G, H, I, J>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>): [A, B, C, D, E, F, G, H, I, J];
    getSync<A, B, C, D, E, F, G, H, I, J, K>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>): [A, B, C, D, E, F, G, H, I, J, K];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>): [A, B, C, D, E, F, G, H, I, J, K, L];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>): [A, B, C, D, E, F, G, H, I, J, K, L, M];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N];
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(tokenA: IDiToken<A>, tokenB: IDiToken<B>, tokenC: IDiToken<C>, tokenD: IDiToken<D>, tokenE: IDiToken<E>, tokenF: IDiToken<F>, tokenG: IDiToken<G>, tokenH: IDiToken<H>, tokenI: IDiToken<I>, tokenJ: IDiToken<J>, tokenK: IDiToken<K>, tokenL: IDiToken<L>, tokenM: IDiToken<M>, tokenN: IDiToken<N>, tokenO: IDiToken<O>): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O];
}
export declare const DI: IRootContainer;
export declare const IOC: InversionOfControl;
//# sourceMappingURL=Container.d.ts.map