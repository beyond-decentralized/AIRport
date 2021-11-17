import { Library } from './Library';
export class System {
    constructor(name) {
        this.name = name;
        this.libraryMap = {};
        this.libraryMapBySignature = {};
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
    getLib(libraryName) {
        return this.libraryMap[libraryName];
    }
    getLibBySignature(signature) {
        return this.libraryMapBySignature[signature];
    }
    mapLibraryBySignature(libraryName, signature) {
        const library = this.libraryMap[libraryName];
        if (!library) {
            throw new Error(`Could not find library: '${libraryName}', in system: '${this.name}'`);
        }
        if (this.libraryMapBySignature[signature]) {
            throw new Error(`System '${this.name}' already has a library '${libraryName}'
			for signature: ${signature}`);
        }
        this.libraryMapBySignature[signature] = library;
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
export const SYSTEM = system('airport');
//# sourceMappingURL=System.js.map