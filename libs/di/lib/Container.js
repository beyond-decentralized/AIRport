"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.objects = [];
        this.classes = [];
        this.numPendingInits = 0;
    }
    get(callback, ...tokens) {
        this.doGet(tokens, false, callback, () => {
        });
    }
    getP(...tokens) {
        return new Promise((resolve, reject) => {
            this.doGet(tokens, true, resolve, reject);
        });
    }
    set(token, clazz) {
        this.classes[token] = clazz;
    }
    doGet(tokens, returnArray, successCallback, errorCallback) {
        if (tokens.every(token => {
            const clazz = this.classes[token];
            return clazz && (!clazz.diSet || clazz.diSet());
        })) {
            this.getSync(tokens, returnArray, successCallback, errorCallback);
        }
        else {
            setTimeout(() => {
                this.getSync(tokens, returnArray, successCallback, errorCallback);
            });
        }
    }
    getSync(tokens, returnArray, successCallback, errorCallback) {
        let firstErrorClass;
        let firstDiNotSetClass;
        const objects = tokens.map(token => {
            if (firstErrorClass || firstDiNotSetClass) {
                return;
            }
            let object = this.objects[token];
            if (!object) {
                const clazz = this.classes[token];
                if (!clazz) {
                    firstErrorClass = clazz;
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
        if (firstErrorClass) {
            console.log('Dependency Injection could not find class: '
                + firstErrorClass.name);
            errorCallback(firstErrorClass);
        }
        else if (firstDiNotSetClass) {
            console.log('Dependency Injection is not ready for class: '
                + firstDiNotSetClass.name + '. Delaying injection by 100ms');
            setTimeout(() => {
                this.getSync(tokens, returnArray, successCallback, errorCallback);
            }, 100);
        }
        else {
            if (returnArray) {
                if (objects.length > 1) {
                    successCallback(objects);
                }
                else {
                    successCallback(objects[0]);
                }
            }
            else {
                successCallback(...objects);
            }
        }
    }
}
exports.Container = Container;
exports.DI = new Container();
//# sourceMappingURL=Container.js.map