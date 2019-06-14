import {DiToken} from './Token'

export interface IContainer {

	get<A>(
		tokenA: DiToken<A>
	): Promise<A>

	get<A, B>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>
	): Promise<[A, B]>

	get<A, B, C>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>
	): Promise<[A, B, C]>

	get<A, B, C, D>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>
	): Promise<[A, B, C, D]>

	get<A, B, C, D, E>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>
	): Promise<[A, B, C, D, E]>

	get<A, B, C, D, E, F>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>
	): Promise<[A, B, C, D, E, F]>

	get<A, B, C, D, E, F, G>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>
	): Promise<[A, B, C, D, E, F, G]>

	get<A, B, C, D, E, F, G, H>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>
	): Promise<[A, B, C, D, E, F, G, H]>

	get<A, B, C, D, E, F, G, H, I>(
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

	get<A, B, C, D, E, F, G, H, I, J>(
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

	get<A, B, C, D, E, F, G, H, I, J, K>(
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

	get<A, B, C, D, E, F, G, H, I, J, K, L>(
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

	get<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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

	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
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

	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
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

	get(
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
		tokenA: DiToken<A>
	): Promise<A>
	get<A, B>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>
	): Promise<[A, B]>
	get<A, B, C>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>
	): Promise<[A, B, C]>
	get<A, B, C, D>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>
	): Promise<[A, B, C, D]>
	get<A, B, C, D, E>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>
	): Promise<[A, B, C, D, E]>
	get<A, B, C, D, E, F>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>
	): Promise<[A, B, C, D, E, F]>
	get<A, B, C, D, E, F, G>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>
	): Promise<[A, B, C, D, E, F, G]>
	get<A, B, C, D, E, F, G, H>(
		tokenA: DiToken<A>,
		tokenB: DiToken<B>,
		tokenC: DiToken<C>,
		tokenD: DiToken<D>,
		tokenE: DiToken<E>,
		tokenF: DiToken<F>,
		tokenG: DiToken<G>,
		tokenH: DiToken<H>
	): Promise<[A, B, C, D, E, F, G, H]>
	get<A, B, C, D, E, F, G, H, I>(
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
	get<A, B, C, D, E, F, G, H, I, J>(
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
	get<A, B, C, D, E, F, G, H, I, J, K>(
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
	get<A, B, C, D, E, F, G, H, I, J, K, L>(
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
	get<A, B, C, D, E, F, G, H, I, J, K, L, M>(
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
	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N>(
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
	get<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O>(
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
	get(
		...tokens: DiToken<any>[]
	): Promise<any[]> {
		return new Promise((
			resolve,
			reject
		) => {
			this.getSync(
				tokens,
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
		this.objects[token as any] = null
	}

	private getSync(
		tokens: DiToken<any>[],
		successCallback,
		errorCallback,
	) {
		let firstMissingClassToken
		let firstDiNotSetClass
		const objects = tokens.map(
			token => {
				if (firstMissingClassToken || firstDiNotSetClass) {
					return
				}
				let object = this.objects[token as any]
				if (!object) {
					const clazz = this.classes[token as any]
					if (!clazz) {
						firstMissingClassToken = token
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
		if (firstMissingClassToken) {
			const message = 'Dependency Injection could not find class for token: '
				+ firstMissingClassToken
			console.log(message)
			errorCallback(message)
		} else if (firstDiNotSetClass) {
			// console.log('Dependency Injection is not ready for class: '
			// 	+ firstDiNotSetClass.name + '. Delaying injection by 100ms')
			setTimeout(() => {
				this.getSync(
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

}

export const DI: IContainer = new Container()
