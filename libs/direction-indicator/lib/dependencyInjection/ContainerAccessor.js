var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Container } from "./Container";
import { Injected } from "./decorators";
let ContainerAccessor = class ContainerAccessor {
    getContainer(injectedObject) {
        const iocContainer = injectedObject.__container__;
        if (!iocContainer) {
            throw new Error('"container" is not set on injectable object.');
        }
        if (!(iocContainer instanceof Container)) {
            throw new Error('"container" property of injectable is not an' +
                'instance of @airport/direction-indicator Container');
        }
        return iocContainer;
    }
};
ContainerAccessor = __decorate([
    Injected()
], ContainerAccessor);
export { ContainerAccessor };
//# sourceMappingURL=ContainerAccessor.js.map