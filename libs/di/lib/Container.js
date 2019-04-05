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
    onInit(callback) {
        this.onInitCallback = callback;
    }
    set(token, clazz) {
        this.classes[token] = clazz;
    }
    doGet(tokens, returnArray, successCallback, errorCallback) {
        this.numPendingInits++;
        if (tokens.every(token => this.classes[token])) {
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
        const objects = tokens.map(token => {
            if (firstErrorClass) {
                return;
            }
            let object = this.objects[token];
            if (!object) {
                const clazz = this.classes[token];
                if (!clazz) {
                    firstErrorClass = clazz;
                    return;
                }
                object = new this.classes[token]();
                this.objects[token] = object;
            }
            return object;
        });
        this.numPendingInits--;
        if (firstErrorClass) {
            console.log('Dependency Injection (DI) could not find class: '
                + firstErrorClass.name);
            errorCallback(firstErrorClass);
        }
        else {
            returnArray ?
                successCallback(objects)
                :
                    successCallback(...objects);
            setTimeout(() => {
                if (this.numPendingInits === 0) {
                    this.onInitCallback();
                }
            });
        }
    }
}
exports.Container = Container;
exports.DI = new Container();
//# sourceMappingURL=Container.js.map