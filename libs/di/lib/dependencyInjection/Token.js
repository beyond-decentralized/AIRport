export class DiToken {
    constructor(library, name, autopilot) {
        this.library = library;
        this.name = name;
        this.autopilot = autopilot;
    }
    getPath() {
        return this.library.system.name + ':' + this.library.name + ':' + this.name;
    }
}
//# sourceMappingURL=Token.js.map