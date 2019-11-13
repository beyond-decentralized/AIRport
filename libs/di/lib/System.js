"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Library_1 = require("./Library");
class System {
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
        const library = new Library_1.Library(libraryName, this);
        this.libraryMap[libraryName] = library;
        return library;
    }
}
exports.System = System;
const SYSTEM_MAP = {};
function system(systemName) {
    if (SYSTEM_MAP[systemName]) {
        return SYSTEM_MAP[systemName];
    }
    const system = new System(systemName);
    SYSTEM_MAP[systemName] = system;
    return system;
}
exports.system = system;
//# sourceMappingURL=System.js.map