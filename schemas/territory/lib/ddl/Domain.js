var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbNumber, DbString, Entity, Id, OneToMany, Table, Transient } from '@airport/air-control';
let Domain = class Domain {
    constructor() {
        this.applications = [];
        this.schemas = [];
    }
};
__decorate([
    Id(),
    DbNumber()
], Domain.prototype, "id", void 0);
__decorate([
    DbString()
], Domain.prototype, "name", void 0);
__decorate([
    OneToMany({ mappedBy: 'domain' })
], Domain.prototype, "applications", void 0);
__decorate([
    Transient()
], Domain.prototype, "schemas", void 0);
Domain = __decorate([
    Entity(),
    Table({ name: 'DOMAINS' })
], Domain);
export { Domain };
//# sourceMappingURL=Domain.js.map