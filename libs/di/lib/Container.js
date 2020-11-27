import { Context, ContextType } from './Context';
const classes = [];
let numPendingInits = 0;
const theObjects = [];
export class Container {
    set(token, clazz) {
        classes[token.sequence] = clazz;
        theObjects[token.sequence] = null;
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
                + firstMissingClassToken);
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
        }
        else if (firstMissingClassToken) {
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
            let object = theObjects[token.sequence];
            if (!object) {
                const clazz = classes[token.sequence];
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
                object.__container__ = this;
                theObjects[token.sequence] = object;
            }
            return object;
        });
        return {
            firstDiNotSetClass,
            firstMissingClassToken,
            objects
        };
    }
}
export class RootContainer extends Container {
    constructor() {
        super(...arguments);
        this.childContainers = new Set();
        this.uiContainerMap = new Map();
    }
    db() {
        const context = new Context(null, ContextType.DB);
        return this.addContainer(context);
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
    remove(container) {
        this.childContainers.delete(container);
        if (container.context.name) {
            this.uiContainerMap.get(container.context.name)
                .delete(container);
        }
    }
    addContainer(context) {
        const childContainer = new ChildContainer(context);
        this.childContainers.add(childContainer);
        return childContainer;
    }
}
export const DI = new RootContainer();
//# sourceMappingURL=Container.js.map