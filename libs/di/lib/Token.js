export class DiToken {
    constructor(library, name, sequence, autopilot = false) {
        this.library = library;
        this.name = name;
        this.sequence = sequence;
        this.autopilot = autopilot;
    }
    getPath() {
        return this.library.system.name + ':' + this.library.name + ':' + this.name;
    }
}
//# sourceMappingURL=Token.js.map