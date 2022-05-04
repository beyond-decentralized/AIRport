import { DEPENDENCY_INJECTION } from "./Container";
import { IDependencyInjectionToken } from "./Token";

export class InversionOfControl {

    get<A>(
        tokenA: IDependencyInjectionToken<A>
    ): Promise<A>

    get<A, B>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>
    ): Promise<[A, B]>

    get<A, B, C>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>
    ): Promise<[A, B, C]>
    get<A, B, C, D>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>
    ): Promise<[A, B, C, D]>
    get<A, B, C, D, E>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>
    ): Promise<[A, B, C, D, E]>
    get<A, B, C, D, E, F>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>
    ): Promise<[A, B, C, D, E, F]>
    get<A, B, C, D, E, F, G>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>
    ): Promise<[A, B, C, D, E, F, G]>
    get<A, B, C, D, E, F, G, H>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>
    ): Promise<[A, B, C, D, E, F, G, H]>
    get<A, B, C, D, E, F, G, H, I>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>
    ): Promise<[A, B, C, D, E, F, G, H, I]>
    get<A, B, C, D, E, F, G, H, I, J>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>
    ): Promise<[A, B, C, D, E, F, G, H, I, J]>
    get<A, B, C, D, E, F, G, H, I, J, K>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K]>
    get<A, B, C, D, E, F, G, H, I, J, K, L>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>,
        tokenL: IDependencyInjectionToken<L>
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>
    get<A, B, C, D, E, F, G, H, I, J, K, L, M>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>,
        tokenL: IDependencyInjectionToken<L>,
        tokenM: IDependencyInjectionToken<M>
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>,
        tokenL: IDependencyInjectionToken<L>,
        tokenM: IDependencyInjectionToken<M>,
        tokenN: IDependencyInjectionToken<N>
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>
    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>,
        tokenL: IDependencyInjectionToken<L>,
        tokenM: IDependencyInjectionToken<M>,
        tokenN: IDependencyInjectionToken<N>,
        tokenO: IDependencyInjectionToken<O>
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>
    async get(
        ...tokens: Array<IDependencyInjectionToken<any>>
    ): Promise<any[]> {
        return await DEPENDENCY_INJECTION.db().get(...tokens);
    }

    eventuallyGet<A>(
        token: IDependencyInjectionToken<A>
    ): Promise<A>
    async eventuallyGet(
        ...tokens: Array<IDependencyInjectionToken<any>>
    ): Promise<any[]> {
        return await DEPENDENCY_INJECTION.db().eventuallyGet(...tokens);
    }

    getSync<A>(
        tokenA: IDependencyInjectionToken<A>
    ): A
    getSync<A, B>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>
    ): [A, B]
    getSync<A, B, C>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>
    ): [A, B, C]
    getSync<A, B, C, D>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>
    ): [A, B, C, D]
    getSync<A, B, C, D, E>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>
    ): [A, B, C, D, E]
    getSync<A, B, C, D, E, F>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>
    ): [A, B, C, D, E, F]
    getSync<A, B, C, D, E, F, G>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>
    ): [A, B, C, D, E, F, G]
    getSync<A, B, C, D, E, F, G, H>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>
    ): [A, B, C, D, E, F, G, H]
    getSync<A, B, C, D, E, F, G, H, I>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>
    ): [A, B, C, D, E, F, G, H, I]
    getSync<A, B, C, D, E, F, G, H, I, J>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>
    ): [A, B, C, D, E, F, G, H, I, J]
    getSync<A, B, C, D, E, F, G, H, I, J, K>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>
    ): [A, B, C, D, E, F, G, H, I, J, K]
    getSync<A, B, C, D, E, F, G, H, I, J, K, L>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>,
        tokenL: IDependencyInjectionToken<L>
    ): [A, B, C, D, E, F, G, H, I, J, K, L]
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>,
        tokenL: IDependencyInjectionToken<L>,
        tokenM: IDependencyInjectionToken<M>
    ): [A, B, C, D, E, F, G, H, I, J, K, L, M]
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>,
        tokenL: IDependencyInjectionToken<L>,
        tokenM: IDependencyInjectionToken<M>,
        tokenN: IDependencyInjectionToken<N>
    ): [A, B, C, D, E, F, G, H, I, J, K, L, M, N]
    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
        tokenA: IDependencyInjectionToken<A>,
        tokenB: IDependencyInjectionToken<B>,
        tokenC: IDependencyInjectionToken<C>,
        tokenD: IDependencyInjectionToken<D>,
        tokenE: IDependencyInjectionToken<E>,
        tokenF: IDependencyInjectionToken<F>,
        tokenG: IDependencyInjectionToken<G>,
        tokenH: IDependencyInjectionToken<H>,
        tokenI: IDependencyInjectionToken<I>,
        tokenJ: IDependencyInjectionToken<J>,
        tokenK: IDependencyInjectionToken<K>,
        tokenL: IDependencyInjectionToken<L>,
        tokenM: IDependencyInjectionToken<M>,
        tokenN: IDependencyInjectionToken<N>,
        tokenO: IDependencyInjectionToken<O>
    ): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]
    getSync(
        ...tokens: Array<IDependencyInjectionToken<any>>
    ): any {
        return DEPENDENCY_INJECTION.db().getSync(...tokens);
    }

}