"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Token_1 = require("./Token");
let diTokenSeq = -1;
class Library {
    constructor(name, system) {
        this.name = name;
        this.system = system;
        this.tokens = [];
    }
    token() {
        diTokenSeq++;
        const diToken = new Token_1.DiToken(this, diTokenSeq);
        this.tokens.push(diToken);
        return diToken;
    }
}
exports.Library = Library;
//# sourceMappingURL=Library.js.map