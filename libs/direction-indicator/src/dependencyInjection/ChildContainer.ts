import { addClasses } from "../classes";
import { IInjectionContext } from "../Context";
import { Container } from "./Container";
import { InjectionApplication } from "./InjectionApplication";
import { domain } from "./InjectionDomain";
import { IChildContainer } from "./interfaces/IChildContainer";
import { IRootContainer } from "./interfaces/IRootContainer";
import { IApplicationDescriptor, IDependencyInjectionToken, IFullDITokenDescriptor } from "./interfaces/Token";
import { DependencyInjectionToken } from "./Token";

export class ChildContainer
    extends Container
    implements IChildContainer {
    // TODO: implement continuous upgrading
    // classes: any[]  = []
    // numPendingInits = 0
    // theObjects: any[]  = []

    objectMap: Map<string, any> = new Map()

    constructor(
        public rootContainer: IRootContainer,
        public context: IInjectionContext
    ) {
        super();
    }

    private doEventuallyGet(
        tokens: Array<IDependencyInjectionToken<any> | { new(): any }>,
        successCallback,
        errorCallback,
    ) {
        const normalizedTokens = this.normalizeTokens(tokens)
        let {
            firstDiNotSetClass,
            firstMissingClassToken,
            objects
        } = this.doGetCore(normalizedTokens);

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
        tokens: Array<IDependencyInjectionToken<any> | { new(): any }>,
        successCallback,
        errorCallback,
    ) {
        const normalizedTokens = this.normalizeTokens(tokens)
        const {
            firstDiNotSetClass,
            firstMissingClassToken,
            objects
        } = this.doGetCore(normalizedTokens);

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
                const tokenPath = DependencyInjectionToken.getPath(normalizedTokens[index])
                objectPaths.push(tokenPath);
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

    private normalizeTokens(
        tokens: Array<IDependencyInjectionToken<any> | IFullDITokenDescriptor | { new(): any }>
    ): Array<IDependencyInjectionToken<any> | IFullDITokenDescriptor> {
        const normalizedTokens = []
        for (let token of tokens) {
            if (token.constructor) {
                token = {
                    application: (token as IFullDITokenDescriptor).application,
                    descriptor: {
                        class: token,
                        interface: token.constructor.name,
                        token: InjectionApplication.getTokenName(token.constructor.name)
                    }
                } as IFullDITokenDescriptor
            }
            normalizedTokens.push(token)
        }

        return normalizedTokens
    }

    private doGetCore(
        tokens: Array<IDependencyInjectionToken<any> | IFullDITokenDescriptor>
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
                if (token.constructor) {
                    token = {
                        application: (token as IFullDITokenDescriptor).application,
                        descriptor: {
                            interface: token.constructor.name
                        }
                    } as IFullDITokenDescriptor
                }
                let object = this.objectMap.get((token as IFullDITokenDescriptor).descriptor.token)
                if (!object) {
                    if (!this.rootContainer.isFramework) {
                        throw new Error(`Autopilot objects properties should not be injected - they are proxied.`)
                    } else {
                        if (!(token instanceof DependencyInjectionToken)) {
                            throw new Error(`Non-API token lookups must be done
                            with an instance of a DependencyInjectionToken.`)
                        }
                        // NOTE: object pooling is not supported, see RootContainer for why
                        // const rootObjectPool = this.rootContainer.objectPoolMap.get(token.descriptor.token);
                        // if (rootObjectPool && rootObjectPool.length) {
                        //     object = rootObjectPool.pop()
                        // } else {
                        const aClass = token.descriptor.class
                        if (!aClass) {
                            firstMissingClassToken = token;
                            return;
                        }
                        if (aClass.diSet && !aClass.diSet()) {
                            firstMissingClassToken = token;
                            firstDiNotSetClass = aClass;
                            return;
                        }
                        object = new aClass();
                        this.setDependencyGetters(object, token)
                        // }
                    }
                    object.__container__ = this
                    this.objectMap.set(token.descriptor.token, object)

                    if (object.init) {
                        const result = object.init()
                        if (result instanceof Promise) {
                            result.then(_ => {
                                object.__initialized__ = true;
                                console.log(`${(token as IDependencyInjectionToken<any>).getPath()} initialized.`);
                            });
                        } else {
                            object.__initialized__ = true;
                            console.log(`${(token as IDependencyInjectionToken<any>).getPath()} initialized.`);
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

    manualInject<T>(
        object: T,
        propertyName: string,
        application: IApplicationDescriptor,
        apiObject: any
    ): void {
        const descriptor = InjectionApplication.getTokenDescriptor(apiObject);

        (object as any).__container__ = this
        this.setDependencyGetter(object, propertyName, {
            application,
            descriptor
        })
    }

    setDependencyGetters(
        object,
        token: IDependencyInjectionToken<any>
    ) {
        if (!token.dependencyConfiguration) {
            return
        }

        const dependencyConfiguration = token.dependencyConfiguration
        for (let propertyName in dependencyConfiguration) {
            const dependencyToken = dependencyConfiguration[propertyName]
            this.setDependencyGetter(object, propertyName, dependencyToken)
        }

    }

    private setDependencyGetter(
        object: any,
        propertyName: string,
        dependencyToken: IDependencyInjectionToken<any> | IFullDITokenDescriptor
    ) {
        delete object[propertyName]
        Object.defineProperty(object, propertyName, {
            get() {
                return this.__container__.getSync(dependencyToken)
            }
        });

        object['get' + propertyName + 'Async'] = async function () {
            return await this.__container__.get(dependencyToken)
        }
    }

    async getByNames(
        domainName: string,
        applicationName: string,
        tokenInterface: string
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
        const token = application.tokenMap.get(tokenInterface)

        if (!token) {
            throw new Error(`Could not find token: ${tokenInterface}
	in Domain:
		${domainName}
 	Application:
			${applicationName}
		`)
        }
        return await this.get(token)
    }

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
        token: IDependencyInjectionToken<A> | { new(): A }
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
        tokenA: IDependencyInjectionToken<A | IFullDITokenDescriptor>
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
        ...tokens: Array<IDependencyInjectionToken<any> | IFullDITokenDescriptor | { new(): any }>
    ): any {
        const normalizedTokens = this.normalizeTokens(tokens)
        const {
            firstDiNotSetClass,
            firstMissingClassToken,
            objects
        } = this.doGetCore(normalizedTokens);

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
addClasses([ChildContainer])
