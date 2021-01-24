import { DiToken } from './Token';
let diTokenSeq = -1;
export class Library {
    constructor(name, system) {
        this.name = name;
        this.system = system;
        this.tokens = [];
    }
    token(name) {
        diTokenSeq++;
        const diToken = new DiToken(this, name, diTokenSeq);
        this.tokens.push(diToken);
        return diToken;
    }
}
//# sourceMappingURL=Library.js.map