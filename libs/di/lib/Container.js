"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Context_1 = require("./Context");
const classes = [];
let numPendingInits = 0;
const objects = [];
class Container {
    set(token, clazz) {
        classes[token.sequence] = clazz;
        objects[token.sequence] = null;
    }
}
exports.Container = Container;
class ChildContainer extends Container {
    // TODO: implement continuous upgrading
    // classes: any[]  = []
    // numPendingInits = 0
    // objects: any[]  = []
    constructor(context) {
        super();
        this.context = context;
    }
    get(...tokens) {
        return new Promise((resolve, reject) => {
            this.doGet(tokens, resolve, reject);
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
    doGet(tokens, successCallback, errorCallback) {
        const { firstDiNotSetClass, firstMissingClassToken, objects } = this.doGetCore(tokens);
        if (firstMissingClassToken) {
            const message = 'Dependency Injection could not find class for token: '
                + firstMissingClassToken;
            console.log(message);
            errorCallback(message);
        }
        else if (firstDiNotSetClass) {
            // console.log('Dependency Injection is not ready for class: '
            // 	+ firstDiNotSetClass.name + '. Delaying injection by 100ms')
            setTimeout(() => {
                this.doGet(tokens, successCallback, errorCallback);
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
    doGetCore(tokens) {
        let firstMissingClassToken;
        let firstDiNotSetClass;
        const objects = tokens.map(token => {
            if (firstMissingClassToken || firstDiNotSetClass) {
                return;
            }
            let object = objects[token.sequence];
            if (!object) {
                const clazz = classes[token.sequence];
                if (!clazz) {
                    firstMissingClassToken = token;
                    return;
                }
                if (clazz.diSet && !clazz.diSet()) {
                    firstDiNotSetClass = clazz;
                    return;
                }
                const container = this;
                object = new Proxy(new clazz(), {
                    get: function (obj, prop) {
                        return prop === 'container' ?
                            container :
                            obj[prop];
                    }
                });
                objects[token.sequence] = object;
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
exports.ChildContainer = ChildContainer;
class RootContainer extends Container {
    constructor() {
        super(...arguments);
        this.childContainers = new Set();
    }
    db() {
        const context = new Context_1.Context(null, Context_1.ContextType.DB);
        return this.addContainer(context);
    }
    ui(componentName) {
        const context = new Context_1.Context(componentName, Context_1.ContextType.UI);
        return this.addContainer(context);
    }
    remove(container) {
        this.childContainers.delete(container);
    }
    addContainer(context) {
        const childContainer = new ChildContainer(context);
        this.childContainers.add(childContainer);
        return childContainer;
    }
}
exports.RootContainer = RootContainer;
exports.DI = new RootContainer();
//# sourceMappingURL=Container.js.map