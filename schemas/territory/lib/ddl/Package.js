var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, GeneratedValue, Id, OneToMany, Table } from "@airport/air-control";
let Package = class Package {
    constructor() {
        this.applicationPackages = [];
    }
};
__decorate([
    Id(),
    GeneratedValue()
], Package.prototype, "id", void 0);
__decorate([
    OneToMany({ mappedBy: "package" })
], Package.prototype, "applicationPackages", void 0);
Package = __decorate([
    Entity(),
    Table({ name: "PACKAGES" })
], Package);
export { Package };
//# sourceMappingURL=Package.js.map