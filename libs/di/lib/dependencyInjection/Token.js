export class DiToken {
    constructor(application, name) {
        this.application = application;
        this.name = name;
    }
    getPath() {
        return this.application.domain.name + ':' + this.application.name + ':' + this.name;
    }
    setDependencies(dependencyConfiguration) {
        this.dependencyConfiguration = dependencyConfiguration;
    }
}
//# sourceMappingURL=Token.js.map