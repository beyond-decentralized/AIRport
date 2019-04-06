"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("./Container");
class CachedPromise {
    constructor(token) {
        this.token = token;
    }
    async get() {
        if (this.injectable) {
            return this.injectable;
        }
        this.injectable = await Container_1.DI.getP(this.token);
        return this.injectable;
    }
}
exports.CachedPromise = CachedPromise;
//# sourceMappingURL=CachedPromise.js.map