import { Library } from './Library';
export class System {
    constructor(name) {
        this.name = name;
        this.libraryMap = {};
    }
    lib(libraryName) {
        if (this.libraryMap[libraryName]) {
            throw new Error(`
			Library already defined.
			System:  ${this.name}
			Library: ${libraryName}
			`);
        }
        const library = new Library(libraryName, this);
        this.libraryMap[libraryName] = library;
        return library;
    }
}
const SYSTEM_MAP = {};
export function system(systemName) {
    if (SYSTEM_MAP[systemName]) {
        return SYSTEM_MAP[systemName];
    }
    const system = new System(systemName);
    SYSTEM_MAP[systemName] = system;
    return system;
}
//# sourceMappingURL=System.js.map