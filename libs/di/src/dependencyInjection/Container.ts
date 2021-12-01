import {
	Context,
	ContextType,
	IInjectionContext
} from '../Context';
import { IDiToken } from './Token';
import { AUTOPILOT_API_LOADER } from '../tokens';
import { SYSTEM, system } from './System';
import { lib } from './Library';

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

	getByApplicationSignatureAndName(
		systemName: string,
		librarySignature: string,
		tokenName: string
	): Promise<any>

}

export interface IContainer {
	set<I>(
		token: IDiToken<I>,
		clazz: new () => I
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

const classMap: Map<string, any> = new Map();
let numPendingInits = 0;
const objectMap: Map<string, any> = new Map();

export class Container
	implements IContainer {

	set<I>(
		token: IDiToken<I>,
		clazz: new () => I
	): void {
		classMap.set(token.name, clazz)
		objectMap.set(token.name, null)
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
		super();
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
		} = this.doGetCore(tokens);

		if (firstMissingClassToken || firstDiNotSetClass) {
			setTimeout(() => {
				this.doEventuallyGet(
					tokens,
					successCallback,
					errorCallback,
				);
			}, 100);
		} else {
			if (objects.length > 1) {
				successCallback(objects);
			} else {
				successCallback(objects[0]);
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
		} = this.doGetCore(tokens);

		if (firstDiNotSetClass) {
			console.log(`Dependency Injection is not ready for token ${firstMissingClassToken.getPath()}
			, class: ${firstDiNotSetClass.name}. Delaying injection by 100ms`);
			setTimeout(() => {
				this.doGet(
					tokens,
					successCallback,
					errorCallback,
				);
			}, 100);
			return
		} else if (objects.filter(object => object && !object.__initialized__).length) {
			const notInitializedObjectIndexes = objects.map((
				object,
				index
			) => object.__initialized__ ? -1 : index)
				.filter(index => index !== -1);
			const objectPaths = [];
			for (const index of notInitializedObjectIndexes) {
				objectPaths.push(tokens[index].getPath());
			}
			console.log(`Dependency Injection is not ready for tokens:
				 ${objectPaths.join('\n')}
			, these classes are not yet initialized, delaying injection by 100ms`);
			setTimeout(() => {
				this.doGet(
					tokens,
					successCallback,
					errorCallback,
				);
			}, 100);
			return
		}
		if (firstMissingClassToken) {
			const message = 'Dependency Injection could not find class for token: '
				+ firstMissingClassToken.getPath();
			console.log(message);
			errorCallback(message);
		} else {
			if (objects.length > 1) {
				successCallback(objects);
			} else {
				successCallback(objects[0]);
			}
		}
	}

	private doGetCore(
		tokens: Array<IDiToken<any>>
	): {
		firstDiNotSetClass;
		firstMissingClassToken: IDiToken<any>;
		objects;
	} {
		let firstMissingClassToken;
		let firstDiNotSetClass;
		const objects = tokens.map(
			token => {
				if (firstMissingClassToken || firstDiNotSetClass) {
					return;
				}
				let object = objectMap.get(token.name)
				if (!object) {
					if (!this.context.inAIRportApp && token.library.autopilot) {
						object = this.getSync(AUTOPILOT_API_LOADER)
							.loadApiAutopilot(token.library.signature, token.name);
					} else {
						const clazz = classMap.get(token.name);
						if (!clazz) {
							firstMissingClassToken = token;
							return;
						}
						if (clazz.diSet && !clazz.diSet()) {
							firstMissingClassToken = token;
							firstDiNotSetClass = clazz;
							return;
						}
						object = new clazz();
					}
					object.__container__ = this
					objectMap.set(token.name, object)

					if (!token.library.autopilot && object.init) {
						const result = object.init()
						if (result instanceof Promise) {
							result.then(_ => {
								object.__initialized__ = true;
								console.log(`${token.getPath()} initialized.`);
							});
						} else {
							object.__initialized__ = true;
							console.log(`${token.getPath()} initialized.`);
						}
					} else {
						object.__initialized__ = true;
					}
				}
				return object;
			});

		return {
			firstDiNotSetClass,
			firstMissingClassToken,
			objects
		};
	}

	async getByApplicationSignatureAndName(
		systemName: string,
		librarySignature: string,
		tokenName: string
	): Promise<any> {
		const library = system(systemName).getLibBySignature(librarySignature)
		if (!library) {
			throw new Error(`Could not find library with signature:
			${librarySignature}
			in system: '${systemName}'`)
		}
		const token = library.tokenMap.get(tokenName)

		if (!token) {
			throw new Error(`Could not find token: ${tokenName}
in library:
			${library.name}
with signature:
			${librarySignature}
of system:
			${SYSTEM.name}`)
		}
		return await this.get(token)
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
			);
		});
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
			);
		});
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
		} = this.doGetCore(tokens);

		if (firstMissingClassToken) {
			throw new Error('Dependency Injection could not find class for token: '
				+ firstMissingClassToken);
		} else if (firstDiNotSetClass) {
			throw new Error('Dependency Injection is not ready for class: '
				+ firstDiNotSetClass.name);
		}

		if (objects.length > 1) {
			return objects;
		} else {
			return objects[0];
		}
	}

}

export class RootContainer
	extends Container
	implements IRootContainer {

	childContainers: Set<IContainer> = new Set<IContainer>();
	uiContainerMap: Map<string, Set<IContainer>> = new Map<string, Set<IContainer>>();
	dbContainer: IChildContainer

	db(): IChildContainer {
		if (!this.dbContainer) {
			this.dbContainer = new ChildContainer(new Context(null, ContextType.DB));
		}

		return this.dbContainer;
	}

	remove(
		container: IChildContainer
	): void {
		this.childContainers.delete(container);

		if (container.context.name) {
			this.uiContainerMap.get(container.context.name)
				.delete(container);
		}
	}

	ui(
		componentName: string
	): IChildContainer {
		const context = new Context(componentName, ContextType.UI);

		const container = this.addContainer(context);

		let matchingUiContainerSet = this.uiContainerMap.get(componentName);

		if (!matchingUiContainerSet) {
			matchingUiContainerSet = new Set<IContainer>();
			this.uiContainerMap.set(componentName, matchingUiContainerSet);
		}

		matchingUiContainerSet.add(container);

		return container;
	}

	private addContainer(
		context: IInjectionContext
	): IChildContainer {
		const childContainer = new ChildContainer(context);

		this.childContainers.add(childContainer);

		return childContainer;
	}

}

export class InversionOfControl {

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
	async get(
		...tokens: Array<IDiToken<any>>
	): Promise<any[]> {
		return await DI.db().get(...tokens);
	}

	eventuallyGet<A>(
		token: IDiToken<A>
	): Promise<A>
	async eventuallyGet(
		...tokens: Array<IDiToken<any>>
	): Promise<any[]> {
		return await DI.db().eventuallyGet(...tokens);
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
		return DI.db().getSync(...tokens);
	}

}

export const DI: IRootContainer = new RootContainer();

if (typeof window !== 'undefined') {
	(window as any).DI = DI;
	(window as any).lib = lib;
	(window as any).system = system
}

export const IOC: InversionOfControl = new InversionOfControl();
