import {
	Context,
	ContextType,
	IInjectionContext
} from '../Context';
import { IDependencyInjectionToken } from './Token';
import { AUTOPILOT_API_LOADER } from '../tokens';
import { domain } from './InjectionDomain';
import { lib } from './InjectionApplication';

export interface IChildContainer
	extends IContainer {

	context: IInjectionContext

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

	get(
		...tokens: Array<IDependencyInjectionToken<any>>
	): Promise<any[]>

	eventuallyGet<A>(
		token: IDependencyInjectionToken<A>
	): Promise<A>

	eventuallyGet(
		...tokens: Array<IDependencyInjectionToken<any>>
	): Promise<any[]>

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
	): any

	getByNames(
		domainName: string,
		applicationName: string,
		tokenName: string
	): Promise<any>

}

export interface IContainer {
	set<I>(
		token: IDependencyInjectionToken<I>,
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
		token: IDependencyInjectionToken<I>,
		clazz: new () => I
	): void {
		classMap.set(token.descriptor.token, clazz)
		objectMap.set(token.descriptor.token, null)
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
		tokens: Array<IDependencyInjectionToken<any>>,
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
		tokens: Array<IDependencyInjectionToken<any>>,
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
		tokens: Array<IDependencyInjectionToken<any>>
	): {
		firstDiNotSetClass;
		firstMissingClassToken: IDependencyInjectionToken<any>;
		objects;
	} {
		let firstMissingClassToken;
		let firstDiNotSetClass;
		const objects = tokens.map(
			token => {
				if (firstMissingClassToken || firstDiNotSetClass) {
					return;
				}
				let object = objectMap.get(token.descriptor.token)
				if (!object) {
					if (!this.context.inAIRportApp && token.application.autopilot) {
						object = this.getSync(AUTOPILOT_API_LOADER)
							.loadApiAutopilot(token);
					} else {
						const clazz = classMap.get(token.descriptor.token);
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
						this.setDependencyGetters(object, token)
					}
					object.__container__ = this
					objectMap.set(token.descriptor.token, object)

					if (!token.application.autopilot && object.init) {
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

	setDependencyGetters(
		object,
		token: IDependencyInjectionToken<any>
	) {
		if (!token.dependencyConfiguration) {
			return
		}

		let thisContainer = this
		for (let propertyName in token.dependencyConfiguration) {
			delete object[propertyName]
			
			let dependencyToken = token
				.dependencyConfiguration[propertyName]

			Object.defineProperty(object, propertyName, {
				get() {
					return thisContainer.getSync(dependencyToken)
				}
			});

			object['get' + propertyName + 'Async'] = async function() {
				await this.get(dependencyToken)
			}
		}

	}

	async getByNames(
		domainName: string,
		applicationName: string,
		tokenName: string
	): Promise<any> {
		const injectionDomain = domain(domainName)
		if (!injectionDomain) {
			throw new Error(`Could nof find
	Domain:
		${domainName}
		`)
		}
		const application = domain(domainName).getApp(applicationName)
		if (!application) {
			throw new Error(`Could not find
	Domain:
		${domainName}
	Application:
		${applicationName}
		`)
		}
		const token = application.tokenMap.get(tokenName)

		if (!token) {
			throw new Error(`Could not find token: ${tokenName}
	in Domain:
		${domainName}
 	Application:
			${applicationName}
		`)
		}
		return await this.get(token)
	}

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
	get(
		...tokens: Array<IDependencyInjectionToken<any>>
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
		token: IDependencyInjectionToken<A>
	): Promise<A>
	eventuallyGet(
		...tokens: Array<IDependencyInjectionToken<any>>
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
		const {
			firstDiNotSetClass,
			firstMissingClassToken,
			objects
		} = this.doGetCore(tokens);

		if (firstMissingClassToken) {
			throw new Error('Dependency Injection could not find class for token: '
				+ firstMissingClassToken.getPath());
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
		if (!container) {
			return
		}

		this.childContainers.delete(container);

		if (container.context && container.context.name) {
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
		return await DI.db().get(...tokens);
	}

	eventuallyGet<A>(
		token: IDependencyInjectionToken<A>
	): Promise<A>
	async eventuallyGet(
		...tokens: Array<IDependencyInjectionToken<any>>
	): Promise<any[]> {
		return await DI.db().eventuallyGet(...tokens);
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
		return DI.db().getSync(...tokens);
	}

}

export const DI: IRootContainer = new RootContainer();

if (typeof window !== 'undefined') {
	(window as any).DI = DI;
	(window as any).lib = lib;
	(window as any).domain = domain
}

export const IOC: InversionOfControl = new InversionOfControl();
