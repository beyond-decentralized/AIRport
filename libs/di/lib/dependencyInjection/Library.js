import { DiToken } from './Token';
let diTokenSeq = -1;
export class Library {
    constructor(name, system) {
        this.name = name;
        this.system = system;
        this.tokenMap = new Map();
    }
    hash(uniqueHash) {
        this.uniqueHash = uniqueHash;
        return this;
    }
    token(name, autopilot) {
        const existingToken = this.tokenMap.get(name);
        if (existingToken) {
            throw new Error(`Token with name '${name}' has already been created`);
        }
        const diToken = new DiToken(this, name, autopilot);
        this.tokenMap.set(name, diToken);
        return diToken;
    }
}
export const AUTOPILOT = true;
//# sourceMappingURL=Library.js.map