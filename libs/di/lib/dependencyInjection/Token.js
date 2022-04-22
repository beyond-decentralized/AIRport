export class DependencyInjectionToken {
    constructor(application, descriptor) {
        this.application = application;
        this.descriptor = descriptor;
    }
    getPath() {
        return this.application.domain.name + ':' + this.application.name + ':'
            + this.descriptor.token;
    }
    setDependencies(dependencyConfiguration) {
        this.dependencyConfiguration = dependencyConfiguration;
    }
}
//# sourceMappingURL=Token.js.map