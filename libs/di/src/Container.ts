import {
	Context,
	ContextType,
	IInjectionContext
}                 from './Context'
import {IDiToken} from './Token'

export interface IChildContainer
	extends IContainer {

	context: IInjectionContext

	get<A>(
		tokenA: IDiToken<A>
	): Promise<A>

	get<A, B>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>
	): Promise<[A, B]>

	get<A, B, C>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>
	): Promise<[A, B, C]>

	get<A, B, C, D>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>
	): Promise<[A, B, C, D]>

	get<A, B, C, D, E>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>
	): Promise<[A, B, C, D, E]>

	get<A, B, C, D, E, F>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>
	): Promise<[A, B, C, D, E, F]>

	get<A, B, C, D, E, F, G>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>
	): Promise<[A, B, C, D, E, F, G]>

	get<A, B, C, D, E, F, G, H>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>
	): Promise<[A, B, C, D, E, F, G, H]>

	get<A, B, C, D, E, F, G, H, I>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>
	): Promise<[A, B, C, D, E, F, G, H, I]>

	get<A, B, C, D, E, F, G, H, I, J>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>
	): Promise<[A, B, C, D, E, F, G, H, I, J]>

	get<A, B, C, D, E, F, G, H, I, J, K>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K]>

	get<A, B, C, D, E, F, G, H, I, J, K, L>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>

	get<A, B, C, D, E, F, G, H, I, J, K, L, M>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>

	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>,
		tokenN: IDiToken<N>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>

	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>,
		tokenN: IDiToken<N>,
		tokenO: IDiToken<O>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>

	get(
		...tokens: Array<IDiToken<any>>
	): Promise<any[]>

	eventuallyGet<A>(
		token: IDiToken<A>
	): Promise<A>
	eventuallyGet(
		...tokens: Array<IDiToken<any>>
	): Promise<any[]>

	getSync<A>(
		tokenA: IDiToken<A>
	): A

	getSync<A, B>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>
	): [A, B]

	getSync<A, B, C>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>
	): [A, B, C]

	getSync<A, B, C, D>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>
	): [A, B, C, D]

	getSync<A, B, C, D, E>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>
	): [A, B, C, D, E]

	getSync<A, B, C, D, E, F>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>
	): [A, B, C, D, E, F]

	getSync<A, B, C, D, E, F, G>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>
	): [A, B, C, D, E, F, G]

	getSync<A, B, C, D, E, F, G, H>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>
	): [A, B, C, D, E, F, G, H]

	getSync<A, B, C, D, E, F, G, H, I>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>
	): [A, B, C, D, E, F, G, H, I]

	getSync<A, B, C, D, E, F, G, H, I, J>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>
	): [A, B, C, D, E, F, G, H, I, J]

	getSync<A, B, C, D, E, F, G, H, I, J, K>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>
	): [A, B, C, D, E, F, G, H, I, J, K]

	getSync<A, B, C, D, E, F, G, H, I, J, K, L>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>
	): [A, B, C, D, E, F, G, H, I, J, K, L]

	getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>
	): [A, B, C, D, E, F, G, H, I, J, K, L, M]

	getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>,
		tokenN: IDiToken<N>
	): [A, B, C, D, E, F, G, H, I, J, K, L, M, N]

	getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>,
		tokenN: IDiToken<N>,
		tokenO: IDiToken<O>
	): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]

	getSync(
		...tokens: Array<IDiToken<any>>
	): any

}

export interface IContainer {

	set<I>(
		token: IDiToken<I>,
		clazz: new() => I
	): void

}

export interface IRootContainer
	extends IContainer {

	db(): IChildContainer

	ui(
		componentName: string
	): IChildContainer

	remove(
		container: IChildContainer
	): void

}

const classes: any[]    = []
let numPendingInits     = 0
const theObjects: any[] = []

export class Container
	implements IContainer {

	set<I>(
		token: IDiToken<I>,
		clazz: new() => I
	): void {
		classes[token.sequence]    = clazz
		theObjects[token.sequence] = null
	}

}

export class ChildContainer
	extends Container
	implements IChildContainer {
	// TODO: implement continuous upgrading
	// classes: any[]  = []
	// numPendingInits = 0
	// theObjects: any[]  = []

	constructor(
		public context: IInjectionContext
	) {
		super()
	}

	get<A>(
		tokenA: IDiToken<A>
	): Promise<A>
	get<A, B>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>
	): Promise<[A, B]>
	get<A, B, C>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>
	): Promise<[A, B, C]>
	get<A, B, C, D>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>
	): Promise<[A, B, C, D]>
	get<A, B, C, D, E>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>
	): Promise<[A, B, C, D, E]>
	get<A, B, C, D, E, F>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>
	): Promise<[A, B, C, D, E, F]>
	get<A, B, C, D, E, F, G>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>
	): Promise<[A, B, C, D, E, F, G]>
	get<A, B, C, D, E, F, G, H>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>
	): Promise<[A, B, C, D, E, F, G, H]>
	get<A, B, C, D, E, F, G, H, I>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>
	): Promise<[A, B, C, D, E, F, G, H, I]>
	get<A, B, C, D, E, F, G, H, I, J>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>
	): Promise<[A, B, C, D, E, F, G, H, I, J]>
	get<A, B, C, D, E, F, G, H, I, J, K>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K]>
	get<A, B, C, D, E, F, G, H, I, J, K, L>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L]>
	get<A, B, C, D, E, F, G, H, I, J, K, L, M>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M]>
	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>,
		tokenN: IDiToken<N>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N]>
	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>,
		tokenN: IDiToken<N>,
		tokenO: IDiToken<O>
	): Promise<[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]>
	get(
		...tokens: Array<IDiToken<any>>
	): Promise<any[]> {
		return new Promise((
			resolve,
			reject
		) => {
			this.doGet(
				tokens,
				resolve,
				reject
			)
		})
	}

	eventuallyGet<A>(
		token: IDiToken<A>
	): Promise<A>
	eventuallyGet(
		...tokens: Array<IDiToken<any>>
	): Promise<any[]> {
		return new Promise((
			resolve,
			reject
		) => {
			this.doEventuallyGet(
				tokens,
				resolve,
				reject
			)
		})
	}

	getSync<A>(
		tokenA: IDiToken<A>
	): A
	getSync<A, B>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>
	): [A, B]
	getSync<A, B, C>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>
	): [A, B, C]
	getSync<A, B, C, D>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>
	): [A, B, C, D]
	getSync<A, B, C, D, E>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>
	): [A, B, C, D, E]
	getSync<A, B, C, D, E, F>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>
	): [A, B, C, D, E, F]
	getSync<A, B, C, D, E, F, G>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>
	): [A, B, C, D, E, F, G]
	getSync<A, B, C, D, E, F, G, H>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>
	): [A, B, C, D, E, F, G, H]
	getSync<A, B, C, D, E, F, G, H, I>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>
	): [A, B, C, D, E, F, G, H, I]
	getSync<A, B, C, D, E, F, G, H, I, J>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>
	): [A, B, C, D, E, F, G, H, I, J]
	getSync<A, B, C, D, E, F, G, H, I, J, K>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>
	): [A, B, C, D, E, F, G, H, I, J, K]
	getSync<A, B, C, D, E, F, G, H, I, J, K, L>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>
	): [A, B, C, D, E, F, G, H, I, J, K, L]
	getSync<A, B, C, D, E, F, G, H, I, J, K, L, M>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>
	): [A, B, C, D, E, F, G, H, I, J, K, L, M]
	getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>,
		tokenN: IDiToken<N>
	): [A, B, C, D, E, F, G, H, I, J, K, L, M, N]
	getSync<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
		tokenA: IDiToken<A>,
		tokenB: IDiToken<B>,
		tokenC: IDiToken<C>,
		tokenD: IDiToken<D>,
		tokenE: IDiToken<E>,
		tokenF: IDiToken<F>,
		tokenG: IDiToken<G>,
		tokenH: IDiToken<H>,
		tokenI: IDiToken<I>,
		tokenJ: IDiToken<J>,
		tokenK: IDiToken<K>,
		tokenL: IDiToken<L>,
		tokenM: IDiToken<M>,
		tokenN: IDiToken<N>,
		tokenO: IDiToken<O>
	): [A, B, C, D, E, F, G, H, I, J, K, L, M, N, O]
	getSync(
		...tokens: Array<IDiToken<any>>
	): any {
		const {
			      firstDiNotSetClass,
			      firstMissingClassToken,
			      objects
		      } = this.doGetCore(tokens)

		if (firstMissingClassToken) {
			throw new Error('Dependency Injection could not find class for token: '
				+ firstMissingClassToken)
		} else if (firstDiNotSetClass) {
			throw new Error('Dependency Injection is not ready for class: '
				+ firstDiNotSetClass.name)
		}

		if (objects.length > 1) {
			return objects
		} else {
			return objects[0]
		}
	}

	private doEventuallyGet(
		tokens: Array<IDiToken<any>>,
		successCallback,
		errorCallback,
	) {
		let {
			      firstDiNotSetClass,
			      firstMissingClassToken,
			      objects
		      } = this.doGetCore(tokens)

		if (firstMissingClassToken || firstDiNotSetClass) {
			setTimeout(() => {
				this.doEventuallyGet(
					tokens,
					successCallback,
					errorCallback,
				)
			}, 100)
		} else {
			if (objects.length > 1) {
				successCallback(objects)
			} else {
				successCallback(objects[0])
			}
		}
	}

	private doGet(
		tokens: Array<IDiToken<any>>,
		successCallback,
		errorCallback,
	) {
		const {
			      firstDiNotSetClass,
			      firstMissingClassToken,
			      objects
		      } = this.doGetCore(tokens)

		if (firstMissingClassToken) {
			const message = 'Dependency Injection could not find class for token: '
				+ firstMissingClassToken
			console.log(message)
			errorCallback(message)
		} else if (firstDiNotSetClass) {
			// console.log('Dependency Injection is not ready for class: '
			// 	+ firstDiNotSetClass.name + '. Delaying injection by 100ms')
			setTimeout(() => {
				this.doGet(
					tokens,
					successCallback,
					errorCallback,
				)
			}, 100)
		} else {
			if (objects.length > 1) {
				successCallback(objects)
			} else {
				successCallback(objects[0])
			}
		}
	}

	private doGetCore(
		tokens: Array<IDiToken<any>>
	): {
		firstDiNotSetClass;
		firstMissingClassToken;
		objects;
	} {
		let firstMissingClassToken
		let firstDiNotSetClass
		const objects = tokens.map(
			token => {
				if (firstMissingClassToken || firstDiNotSetClass) {
					return
				}
				let object = theObjects[token.sequence]
				if (!object) {
					const clazz = classes[token.sequence]
					if (!clazz) {
						firstMissingClassToken = token
						return
					}
					if (clazz.diSet && !clazz.diSet()) {
						firstDiNotSetClass = clazz
						return
					}
					object                     = new clazz()
					object.__container__           = this
					theObjects[token.sequence] = object
				}

				return object
			})

		return {
			firstDiNotSetClass,
			firstMissingClassToken,
			objects
		}
	}

}

export class RootContainer
	extends Container
	implements IRootContainer {

	childContainers: Set<IContainer>             = new Set<IContainer>()
	uiContainerMap: Map<string, Set<IContainer>> = new Map<string, Set<IContainer>>()

	db(): IChildContainer {
		const context = new Context(null, ContextType.DB)

		return this.addContainer(context)
	}

	ui(
		componentName: string
	): IChildContainer {
		const context = new Context(componentName, ContextType.UI)

		const container = this.addContainer(context)

		let matchingUiContainerSet = this.uiContainerMap.get(componentName)

		if (!matchingUiContainerSet) {
			matchingUiContainerSet = new Set<IContainer>()
			this.uiContainerMap.set(componentName, matchingUiContainerSet)
		}

		matchingUiContainerSet.add(container)

		return container
	}

	remove(
		container: IChildContainer
	): void {
		this.childContainers.delete(container)

		if (container.context.name) {
			this.uiContainerMap.get(container.context.name)
				.delete(container)
		}
	}

	private addContainer(
		context: IInjectionContext
	): IChildContainer {
		const childContainer = new ChildContainer(context)

		this.childContainers.add(childContainer)

		return childContainer
	}

}

export const DI: IRootContainer = new RootContainer()
