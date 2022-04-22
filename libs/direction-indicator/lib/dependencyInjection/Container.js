import { Context, ContextType } from '../Context';
import { AUTOPILOT_API_LOADER } from '../tokens';
import { domain } from './InjectionDomain';
import { lib } from './InjectionApplication';
const classMap = new Map();
let numPendingInits = 0;
const objectMap = new Map();
export class Container {
    set(token, clazz) {
        classMap.set(token.descriptor.token, clazz);
        objectMap.set(token.descriptor.token, null);
    }
}
export class ChildContainer extends Container {
    // TODO: implement continuous upgrading
    // classes: any[]  = []
    // numPendingInits = 0
    // theObjects: any[]  = []
    constructor(context) {
        super();
        this.context = context;
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
            let object = objectMap.get(token.descriptor.token);
            if (!object) {
                if (!this.context.inAIRportApp && token.application.autopilot) {
                    object = this.getSync(AUTOPILOT_API_LOADER)
                        .loadApiAutopilot(token);
                }
                else {
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
                    this.setDependencyGetters(object, token);
                }
                object.__container__ = this;
                objectMap.set(token.descriptor.token, object);
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
        let thisContainer = this;
        for (let propertyName in token.dependencyConfiguration) {
            delete object[propertyName];
            let dependencyToken = token
                .dependencyConfiguration[propertyName];
            Object.defineProperty(object, propertyName, {
                get() {
                    return thisContainer.getSync(dependencyToken);
                }
            });
            object['get' + propertyName + 'Async'] = async function () {
                await this.get(dependencyToken);
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
export class RootContainer extends Container {
    constructor() {
        super(...arguments);
        this.childContainers = new Set();
        this.uiContainerMap = new Map();
    }
    db() {
        if (!this.dbContainer) {
            this.dbContainer = new ChildContainer(new Context(null, ContextType.DB));
        }
        return this.dbContainer;
    }
    remove(container) {
        if (!container) {
            return;
        }
        this.childContainers.delete(container);
        if (container.context && container.context.name) {
            this.uiContainerMap.get(container.context.name)
                .delete(container);
        }
    }
    ui(componentName) {
        const context = new Context(componentName, ContextType.UI);
        const container = this.addContainer(context);
        let matchingUiContainerSet = this.uiContainerMap.get(componentName);
        if (!matchingUiContainerSet) {
            matchingUiContainerSet = new Set();
            this.uiContainerMap.set(componentName, matchingUiContainerSet);
        }
        matchingUiContainerSet.add(container);
        return container;
    }
    addContainer(context) {
        const childContainer = new ChildContainer(context);
        this.childContainers.add(childContainer);
        return childContainer;
    }
}
export class InversionOfControl {
    async get(...tokens) {
        return await DI.db().get(...tokens);
    }
    async eventuallyGet(...tokens) {
        return await DI.db().eventuallyGet(...tokens);
    }
    getSync(...tokens) {
        return DI.db().getSync(...tokens);
    }
}
export const DI = new RootContainer();
if (typeof window !== 'undefined') {
    window.DI = DI;
    window.lib = lib;
    window.domain = domain;
}
export const IOC = new InversionOfControl();
//# sourceMappingURL=Container.js.map