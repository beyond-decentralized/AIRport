export class DiToken {
    constructor(library, name, sequence) {
        this.library = library;
        this.name = name;
        this.sequence = sequence;
    }
    getPath() {
        return this.library.system.name + ':' + this.library.name + ':' + this.name;
    }
}
//# sourceMappingURL=Token.js.map