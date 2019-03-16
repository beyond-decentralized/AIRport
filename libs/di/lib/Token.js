"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenSequence {
    constructor() {
        this.counter = 0;
    }
    get n() {
        return this.counter++;
    }
}
exports.TokenSequence = TokenSequence;
exports.TOKE = new TokenSequence();
//# sourceMappingURL=Token.js.map