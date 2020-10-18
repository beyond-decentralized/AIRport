var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-control';
let Application = class Application {
    constructor() {
        this.applicationPackages = [];
    }
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], Application.prototype, "id", void 0);
__decorate([
    DbString()
], Application.prototype, "name", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "DOMAIN_ID", referencedColumnName: "ID" })
], Application.prototype, "domain", void 0);
__decorate([
    OneToMany({ mappedBy: "application" })
], Application.prototype, "applicationPackages", void 0);
Application = __decorate([
    Entity(),
    Table({ name: "APPLICATIONS" })
], Application);
export { Application };
//# sourceMappingURL=Application.js.map