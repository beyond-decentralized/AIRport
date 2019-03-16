"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Container {
    constructor() {
        this.numPendingInits = 0;
    }
    get(callback, ...tokens) {
        this.numPendingInits++;
        setTimeout(() => {
            callback(tokens.map(token => {
                let object = this.objects[token];
                if (!object) {
                    object = new this.classes[token]();
                    this.objects[token] = object;
                }
                return object;
            }));
            setTimeout(() => {
                if (this.numPendingInits === 0) {
                    this.onInitCallback();
                }
            });
        });
    }
    onInit(callback) {
        this.onInitCallback = callback;
    }
    set(token, clazz) {
        this.classes[token] = clazz;
    }
}
exports.Container = Container;
exports.DI = new Container();
//# sourceMappingURL=Container.js.map