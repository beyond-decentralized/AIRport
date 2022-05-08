import { AUTOPILOT_API_LOADER } from "../tokens";
import { Container } from "./Container";
import { domain } from "./InjectionDomain";
export class ChildContainer extends Container {
    constructor(rootContainer, context) {
        super();
        this.rootContainer = rootContainer;
        this.context = context;
        // TODO: implement continuous upgrading
        // classes: any[]  = []
        // numPendingInits = 0
        // theObjects: any[]  = []
        this.objectMap = new Map();
    }
    doEventuallyGet(tokens, successCallback, errorCallback) {
        let { firstDiNotSetClass, firstMissingClassToken, objects } = this.doGetCore(tokens);
        if (firstMissingClassToken || firstDiNotSetClass) {
            setTimeout(() => {
                this.doEventuallyGet(tokens, successCallback, errorCallback);
            }, 100);
        }
        else {
            if (objects.length > 1) {
                successCallback(objects);
            }
            else {
                successCallback(objects[0]);
            }
        }
    }
    doGet(tokens, successCallback, errorCallback) {
        const { firstDiNotSetClass, firstMissingClassToken, objects } = this.doGetCore(tokens);
        if (firstDiNotSetClass) {
            console.log(`Dependency Injection is not ready for token ${firstMissingClassToken.getPath()}
			, class: ${firstDiNotSetClass.name}. Delaying injection by 100ms`);
            setTimeout(() => {
                this.doGet(tokens, successCallback, errorCallback);
            }, 100);
            return;
        }
        else if (objects.filter(object => object && !object.__initialized__).length) {
            const notInitializedObjectIndexes = objects.map((object, index) => object.__initialized__ ? -1 : index)
                .filter(index => index !== -1);
            const objectPaths = [];
            for (const index of notInitializedObjectIndexes) {
                objectPaths.push(tokens[index].getPath());
            }
            console.log(`Dependency Injection is not ready for tokens:
				 ${objectPaths.join('\n')}
			, these classes are not yet initialized, delaying injection by 100ms`);
            setTimeout(() => {
                this.doGet(tokens, successCallback, errorCallback);
            }, 100);
            return;
        }
        if (firstMissingClassToken) {
            const message = 'Dependency Injection could not find class for token: '
                + firstMissingClassToken.getPath();
            console.log(message);
            errorCallback(message);
        }
        else {
            if (objects.length > 1) {
                successCallback(objects);
            }
            else {
                successCallback(objects[0]);
            }
        }
    }
    doGetCore(tokens) {
        let firstMissingClassToken;
        let firstDiNotSetClass;
        const objects = tokens.map(token => {
            if (firstMissingClassToken || firstDiNotSetClass) {
                return;
            }
            let object = this.objectMap.get(token.descriptor.token);
            if (!object) {
                if (!this.rootContainer.isFramework && token.application.autopilot) {
                    object = this.getSync(AUTOPILOT_API_LOADER)
                        .loadApiAutopilot(token);
                }
                else {
                    // NOTE: object pooling is not supported, see RootContainer for why
                    // const rootObjectPool = this.rootContainer.objectPoolMap.get(token.descriptor.token);
                    // if (rootObjectPool && rootObjectPool.length) {
                    //     object = rootObjectPool.pop()
                    // } else {
                    const aClass = token.descriptor.class;
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
                    this.setDependencyGetters(object, token);
                    // }
                }
                object.__container__ = this;
                this.objectMap.set(token.descriptor.token, object);
                if (!token.application.autopilot && object.init) {
                    const result = object.init();
                    if (result instanceof Promise) {
                        result.then(_ => {
                            object.__initialized__ = true;
                            console.log(`${token.getPath()} initialized.`);
                        });
                    }
                    else {
                        object.__initialized__ = true;
                        console.log(`${token.getPath()} initialized.`);
                    }
                }
                else {
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
    setDependencyGetters(object, token) {
        if (!token.dependencyConfiguration) {
            return;
        }
        const dependencyConfiguration = token.dependencyConfiguration;
        for (let propertyName in dependencyConfiguration) {
            delete object[propertyName];
            const dependencyToken = dependencyConfiguration[propertyName];
            Object.defineProperty(object, propertyName, {
                get() {
                    return this.__container__.getSync(dependencyToken);
                }
            });
            object['get' + propertyName + 'Async'] = async function () {
                return await this.__container__.get(dependencyToken);
            };
        }
    }
    async getByNames(domainName, applicationName, tokenName) {
        const injectionDomain = domain(domainName);
        if (!injectionDomain) {
            throw new Error(`Could nof find
	Domain:
		${domainName}
		`);
        }
        const application = domain(domainName).getApp(applicationName);
        if (!application) {
            throw new Error(`Could not find
	Domain:
		${domainName}
	Application:
		${applicationName}
		`);
        }
        const token = application.tokenMap.get(tokenName);
        if (!token) {
            throw new Error(`Could not find token: ${tokenName}
	in Domain:
		${domainName}
 	Application:
			${applicationName}
		`);
        }
        return await this.get(token);
    }
    get(...tokens) {
        return new Promise((resolve, reject) => {
            this.doGet(tokens, resolve, reject);
        });
    }
    eventuallyGet(...tokens) {
        return new Promise((resolve, reject) => {
            this.doEventuallyGet(tokens, resolve, reject);
        });
    }
    getSync(...tokens) {
        const { firstDiNotSetClass, firstMissingClassToken, objects } = this.doGetCore(tokens);
        if (firstMissingClassToken) {
            throw new Error('Dependency Injection could not find class for token: '
                + firstMissingClassToken.getPath());
        }
        else if (firstDiNotSetClass) {
            throw new Error('Dependency Injection is not ready for class: '
                + firstDiNotSetClass.name);
        }
        if (objects.length > 1) {
            return objects;
        }
        else {
            return objects[0];
        }
    }
}
//# sourceMappingURL=ChildContainer.js.map