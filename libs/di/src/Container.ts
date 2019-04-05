import {DiToken} from './Token'

export interface IContainer {

	get<A>(
		callback: (
			objA: A
		) => void,
		tokenA: DiToken<A>
	): void

	get<A, B>(
		callback: (
			objA: A,
			objB: B
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>
	): void

	get<A, B, C>(
		callback: (
			objA: A,
			objB: B,
			objC: C
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>
	): void

	get<A, B, C, D>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>
	): void

	get<A, B, C, D, E>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>
	): void

	get<A, B, C, D, E, F>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>
	): void

	get<A, B, C, D, E, F, G>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>
	): void

	get<A, B, C, D, E, F, G, H>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>
	): void

	get<A, B, C, D, E, F, G, H, I>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>
	): void

	get<A, B, C, D, E, F, G, H, I, J>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>
	): void

	get<A, B, C, D, E, F, G, H, I, J, K>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>
	): void

	get<A, B, C, D, E, F, G, H, I, J, K, L>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K,
			objL: L
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>
	): void

	get<A, B, C, D, E, F, G, H, I, J, K, L, M>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K,
			objL: L,
			objM: M
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>
	): void

	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K,
			objL: L,
			objM: M,
			objN: N
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>,
		tokenN: DiToken<N>
	): void

	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K,
			objL: L,
			objM: M,
			objN: N,
			objO: O
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>,
		tokenN: DiToken<N>,
		tokenO: DiToken<O>
	): void

	get(
		callback: (...objects: any[]) => void,
		...tokens: DiToken<any>[]
	): void

	getP<A>(
		tokenA: DiToken<A>
	): Promise<[A]>

	getP<A, B>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>
	): Promise<[A, B]>

	getP<A, B, C>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>
	): Promise<[A, B, C]>

	getP<A, B, C, D>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>
	): Promise<[A, B, C, D]>

	getP<A, B, C, D, E>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>
	): Promise<[A, B, C, D, E]>

	getP<A, B, C, D, E, F>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>
	): Promise<[A, B, C, D, E, F]>

	getP<A, B, C, D, E, F, G>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>
	): Promise<[A, B, C, D, E, F, G]>

	getP<A, B, C, D, E, F, G, H>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>
	): Promise<[A, B, C, D, E, F, G, H]>

	getP<A, B, C, D, E, F, G, H, I>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>
	): Promise<[A, B, C, D, E, F, G, H, I]>

	getP<A, B, C, D, E, F, G, H, I, J>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>
	): Promise<[A, B, C, D, E, F, G, H, I, J]>

	getP<A, B, C, D, E, F, G, H, I, J, K>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K]>

	getP<A, B, C, D, E, F, G, H, I, J, K, L>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>

	getP<A, B, C, D, E, F, G, H, I, J, K, L, M>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>

	getP<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>,
		tokenN: DiToken<N>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>

	getP<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>,
		tokenN: DiToken<N>,
		tokenO: DiToken<O>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>

	getP(
		...tokens: DiToken<any>[]
	): Promise<any[]>

	set<I>(
		token: DiToken<I>,
		clazz: new() => I
	): void

}

export class Container
	implements IContainer {

	objects: any[]  = []
	classes: any[]  = []
	numPendingInits = 0

	get<A>(
		callback: (
			objA: A
		) => void,
		tokenA: DiToken<A>
	): void
	get<A, B>(
		callback: (
			objA: A,
			objB: B
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>
	): void
	get<A, B, C>(
		callback: (
			objA: A,
			objB: B,
			objC: C
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>
	): void
	get<A, B, C, D>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>
	): void
	get<A, B, C, D, E>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>
	): void
	get<A, B, C, D, E, F>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>
	): void
	get<A, B, C, D, E, F, G>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>
	): void
	get<A, B, C, D, E, F, G, H>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>
	): void
	get<A, B, C, D, E, F, G, H, I>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>
	): void
	get<A, B, C, D, E, F, G, H, I, J>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>
	): void
	get<A, B, C, D, E, F, G, H, I, J, K>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>
	): void
	get<A, B, C, D, E, F, G, H, I, J, K, L>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K,
			objL: L
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>
	): void
	get<A, B, C, D, E, F, G, H, I, J, K, L, M>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K,
			objL: L,
			objM: M
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>
	): void
	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K,
			objL: L,
			objM: M,
			objN: N
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>,
		tokenN: DiToken<N>
	): void
	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
		callback: (
			objA: A,
			objB: B,
			objC: C,
			objD: D,
			objE: E,
			objF: F,
			objG: G,
			objH: H,
			objI: I,
			objJ: J,
			objK: K,
			objL: L,
			objM: M,
			objN: N,
			objO: O
		) => void,
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>,
		tokenN: DiToken<N>,
		tokenO: DiToken<O>
	): void
	get(
		callback: (...objects: any[]) => void,
		...tokens: DiToken<any>[]
	): void {
		this.doGet(
			tokens,
			false,
			callback,
			() => {
			}
		)
	}


	getP<A>(
		tokenA: DiToken<A>
	): Promise<[A]>
	getP<A, B>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>
	): Promise<[A, B]>
	getP<A, B, C>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>
	): Promise<[A, B, C]>
	getP<A, B, C, D>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>
	): Promise<[A, B, C, D]>
	getP<A, B, C, D, E>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>
	): Promise<[A, B, C, D, E]>
	getP<A, B, C, D, E, F>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>
	): Promise<[A, B, C, D, E, F]>
	getP<A, B, C, D, E, F, G>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>
	): Promise<[A, B, C, D, E, F, G]>
	getP<A, B, C, D, E, F, G, H>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>
	): Promise<[A, B, C, D, E, F, G, H]>
	getP<A, B, C, D, E, F, G, H, I>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>
	): Promise<[A, B, C, D, E, F, G, H, I]>
	getP<A, B, C, D, E, F, G, H, I, J>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>
	): Promise<[A, B, C, D, E, F, G, H, I, J]>
	getP<A, B, C, D, E, F, G, H, I, J, K>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K]>
	getP<A, B, C, D, E, F, G, H, I, J, K, L>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>
	getP<A, B, C, D, E, F, G, H, I, J, K, L, M>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>
	getP<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>,
		tokenN: DiToken<N>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>
	getP<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>,
		tokenI: DiToken<I>,
		tokenJ: DiToken<J>,
		tokenK: DiToken<K>,
		tokenL: DiToken<L>,
		tokenM: DiToken<M>,
		tokenN: DiToken<N>,
		tokenO: DiToken<O>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>
	getP(
		...tokens: DiToken<any>[]
	): Promise<any[]> {
		return new Promise((
			resolve,
			reject
		) => {
			this.doGet(
				tokens,
				true,
				resolve,
				reject
			)
		})
	}

	set<I>(
		token: DiToken<I>,
		clazz: new() => I
	): void {
		this.classes[token as any] = clazz
	}

	private doGet(
		tokens: DiToken<any>[],
		returnArray: boolean,
		successCallback,
		errorCallback,
	): void {

		if (tokens.every(
			token => {
				const clazz = this.classes[token as any]
				return clazz && (!clazz.diSet || clazz.diSet())
			}
		)) {
			this.getSync(tokens, returnArray, successCallback, errorCallback)
		} else {
			setTimeout(() => {
				this.getSync(tokens, returnArray, successCallback, errorCallback)
			})
		}

	}

	private getSync(
		tokens: DiToken<any>[],
		returnArray: boolean,
		successCallback,
		errorCallback,
	) {
		let firstErrorClass
		let firstDiNotSetClass
		const objects = tokens.map(
			token => {
				if (firstErrorClass || firstDiNotSetClass) {
					return
				}
				let object = this.objects[token as any]
				if (!object) {
					const clazz = this.classes[token as any]
					if (!clazz) {
						firstErrorClass = clazz
						return
					}
					if (clazz.diSet && !clazz.diSet()) {
						firstDiNotSetClass = clazz
						return
					}
					object                     = new clazz()
					this.objects[token as any] = object
				}

				return object
			})
		if (firstErrorClass) {
			console.log('Dependency Injection could not find class: '
				+ firstErrorClass.name)
			errorCallback(firstErrorClass)
		} else if (firstDiNotSetClass) {
			console.log('Dependency Injection is not ready for class: '
				+ firstDiNotSetClass.name + '. Delaying injection by 100ms')
			setTimeout(() => {
				this.getSync(
					tokens,
					returnArray,
					successCallback,
					errorCallback,
				)
			}, 100)
		} else {
			returnArray ?
				successCallback(objects)
				:
				successCallback(...objects)
		}
	}

}

export const DI: IContainer = new Container()
