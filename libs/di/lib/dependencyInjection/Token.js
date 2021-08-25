export class DiToken {
    constructor(library, name) {
        this.library = library;
        this.name = name;
    }
    getPath() {
        return this.library.system.name + ':' + this.library.name + ':' + this.name;
    }
}
//# sourceMappingURL=Token.js.map