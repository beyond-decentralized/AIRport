export class DependencyInjectionToken {
    constructor(application, descriptor) {
        this.application = application;
        this.descriptor = descriptor;
    }
    get dependencyConfiguration() {
        return this.getInheritedDependencyConfiguration(this.descriptor.class);
    }
    getPath() {
        return this.application.domain.name + ':' + this.application.name + ':'
            + this.descriptor.token;
    }
    setDependencies(dependencyConfiguration) {
        if (this._dependencyConfiguration) {
            this._dependencyConfiguration = {
                ...this._dependencyConfiguration,
                ...dependencyConfiguration
            };
        }
        else {
            this._dependencyConfiguration = dependencyConfiguration;
        }
        if (!this.descriptor.class) {
            return;
        }
        if (this.descriptor.class.dependencyConfiguration) {
            this.descriptor.class.dependencyConfiguration = {
                ...this.descriptor.class.dependencyConfiguration,
                ...dependencyConfiguration
            };
        }
        else {
            this.descriptor.class.dependencyConfiguration = dependencyConfiguration;
        }
    }
    setClass(aClass) {
        this.descriptor.class = aClass;
        aClass.dependencyConfiguration = this._dependencyConfiguration;
    }
    getInheritedDependencyConfiguration(aClass) {
        const parentClass = Object.getPrototypeOf(aClass);
        let returnedDependencyConfiguration = {};
        if (parentClass) {
            returnedDependencyConfiguration = this.getInheritedDependencyConfiguration(parentClass);
        }
        const dependencyConfiguration = aClass.dependencyConfiguration;
        if (dependencyConfiguration) {
            returnedDependencyConfiguration = {
                ...returnedDependencyConfiguration,
                ...dependencyConfiguration
            };
        }
        return returnedDependencyConfiguration;
    }
}
//# sourceMappingURL=Token.js.map