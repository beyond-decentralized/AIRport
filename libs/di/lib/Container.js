"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.objects = [];
        this.classes = [];
        this.numPendingInits = 0;
    }
    get(...tokens) {
        return new Promise((resolve, reject) => {
            this.doGet(tokens, resolve, reject);
        });
    }
    set(token, clazz) {
        this.classes[token] = clazz;
        this.objects[token] = null;
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
            let object = this.objects[token];
            if (!object) {
                const clazz = this.classes[token];
                if (!clazz) {
                    firstMissingClassToken = token;
                    return;
                }
                if (clazz.diSet && !clazz.diSet()) {
                    firstDiNotSetClass = clazz;
                    return;
                }
                object = new clazz();
                this.objects[token] = object;
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
exports.Container = Container;
exports.DI = new Container();
//# sourceMappingURL=Container.js.map