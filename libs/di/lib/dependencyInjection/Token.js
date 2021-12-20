export class DiToken {
    constructor(library, name) {
        this.library = library;
        this.name = name;
    }
    getPath() {
        return this.library.domain.name + ':' + this.library.name + ':' + this.name;
    }
}
//# sourceMappingURL=Token.js.map