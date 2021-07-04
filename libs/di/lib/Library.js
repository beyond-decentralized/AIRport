import { DiToken } from './Token';
let diTokenSeq = -1;
export class Library {
    constructor(name, system) {
        this.name = name;
        this.system = system;
        this.tokens = [];
    }
    token(name, autopilot = false) {
        diTokenSeq++;
        const diToken = new DiToken(this, name, diTokenSeq, autopilot);
        this.tokens.push(diToken);
        return diToken;
    }
}
export const AUTOPILOT = true;
//# sourceMappingURL=Library.js.map