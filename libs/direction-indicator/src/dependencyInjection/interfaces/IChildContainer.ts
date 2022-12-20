import { IInjectionContext } from "../../Context"
import { IApplicationDescriptor, IDependencyInjectionToken } from "./Token"
import { IContainer } from "./IContainer"

export interface IChildContainer
    extends IContainer {

    context: IInjectionContext
    objectMap: Map<string, any>

    manualInject<T>(
        object: T,
        propertyName: string,
        application: IApplicationDescriptor,
        apiObject: any
    ): void

    get<A>(
        tokenA: IDependencyInjectionToken<A> | { new(): A }
    ): Promise<A>

    get<A, B>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B }
    ): Promise<[A, B]>

    get<A, B, C>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C }
    ): Promise<[A, B, C]>

    get<A, B, C, D>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D }
    ): Promise<[A, B, C, D]>

    get<A, B, C, D, E>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E }
    ): Promise<[A, B, C, D, E]>

    get<A, B, C, D, E, F>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F }
    ): Promise<[A, B, C, D, E, F]>

    get<A, B, C, D, E, F, G>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G }
    ): Promise<[A, B, C, D, E, F, G]>

    get<A, B, C, D, E, F, G, H>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H }
    ): Promise<[A, B, C, D, E, F, G, H]>

    get<A, B, C, D, E, F, G, H, I>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I }
    ): Promise<[A, B, C, D, E, F, G, H, I]>

    get<A, B, C, D, E, F, G, H, I, J>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J }
    ): Promise<[A, B, C, D, E, F, G, H, I, J]>

    get<A, B, C, D, E, F, G, H, I, J, K>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K }
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K]>

    get<A, B, C, D, E, F, G, H, I, J, K, L>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K },
        tokenL: IDependencyInjectionToken<L> | { new(): L }
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>

    get<A, B, C, D, E, F, G, H, I, J, K, L, M>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K },
        tokenL: IDependencyInjectionToken<L> | { new(): L },
        tokenM: IDependencyInjectionToken<M> | { new(): M }
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>

    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K },
        tokenL: IDependencyInjectionToken<L> | { new(): L },
        tokenM: IDependencyInjectionToken<M> | { new(): M },
        tokenN: IDependencyInjectionToken<N> | { new(): N }
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>

    get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K },
        tokenL: IDependencyInjectionToken<L> | { new(): L },
        tokenM: IDependencyInjectionToken<M> | { new(): M },
        tokenN: IDependencyInjectionToken<N> | { new(): N },
        tokenO: IDependencyInjectionToken<O> | { new(): O }
    ): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>

    get(
        ...tokens: Array<IDependencyInjectionToken<any>>
    ): Promise<any[]>

    eventuallyGet<A>(
        token: IDependencyInjectionToken<A> | { new(): A }
    ): Promise<A>

    eventuallyGet(
        ...tokens: Array<IDependencyInjectionToken<any>>
    ): Promise<any[]>

    getSync<A>(
        tokenA: IDependencyInjectionToken<A> | { new(): A }
    ): A

    getSync<A, B>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B }
    ): [A, B]

    getSync<A, B, C>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C }
    ): [A, B, C]

    getSync<A, B, C, D>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D }
    ): [A, B, C, D]

    getSync<A, B, C, D, E>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E }
    ): [A, B, C, D, E]

    getSync<A, B, C, D, E, F>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F }
    ): [A, B, C, D, E, F]

    getSync<A, B, C, D, E, F, G>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G }
    ): [A, B, C, D, E, F, G]

    getSync<A, B, C, D, E, F, G, H>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H }
    ): [A, B, C, D, E, F, G, H]

    getSync<A, B, C, D, E, F, G, H, I>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I }
    ): [A, B, C, D, E, F, G, H, I]

    getSync<A, B, C, D, E, F, G, H, I, J>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J }
    ): [A, B, C, D, E, F, G, H, I, J]

    getSync<A, B, C, D, E, F, G, H, I, J, K>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K }
    ): [A, B, C, D, E, F, G, H, I, J, K]

    getSync<A, B, C, D, E, F, G, H, I, J, K, L>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K },
        tokenL: IDependencyInjectionToken<L> | { new(): L }
    ): [A, B, C, D, E, F, G, H, I, J, K, L]

    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K },
        tokenL: IDependencyInjectionToken<L> | { new(): L },
        tokenM: IDependencyInjectionToken<M> | { new(): M }
    ): [A, B, C, D, E, F, G, H, I, J, K, L, M]

    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K },
        tokenL: IDependencyInjectionToken<L> | { new(): L },
        tokenM: IDependencyInjectionToken<M> | { new(): M },
        tokenN: IDependencyInjectionToken<N> | { new(): N }
    ): [A, B, C, D, E, F, G, H, I, J, K, L, M, N]

    getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
        tokenA: IDependencyInjectionToken<A> | { new(): A },
        tokenB: IDependencyInjectionToken<B> | { new(): B },
        tokenC: IDependencyInjectionToken<C> | { new(): C },
        tokenD: IDependencyInjectionToken<D> | { new(): D },
        tokenE: IDependencyInjectionToken<E> | { new(): E },
        tokenF: IDependencyInjectionToken<F> | { new(): F },
        tokenG: IDependencyInjectionToken<G> | { new(): G },
        tokenH: IDependencyInjectionToken<H> | { new(): H },
        tokenI: IDependencyInjectionToken<I> | { new(): I },
        tokenJ: IDependencyInjectionToken<J> | { new(): J },
        tokenK: IDependencyInjectionToken<K> | { new(): K },
        tokenL: IDependencyInjectionToken<L> | { new(): L },
        tokenM: IDependencyInjectionToken<M> | { new(): M },
        tokenN: IDependencyInjectionToken<N> | { new(): N },
        tokenO: IDependencyInjectionToken<O> | { new(): O }
    ): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]

    getSync(
        ...tokens: Array<IDependencyInjectionToken<any>>
    ): any

    getByNames(
        domainName: string,
        applicationName: string,
        tokenName: string
    ): Promise<any>

}