var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, Table } from '@airport/air-control';
let PackagedUnit = class PackagedUnit {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], PackagedUnit.prototype, "id", void 0);
__decorate([
    DbString()
], PackagedUnit.prototype, "name", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: "PACKAGE_ID", referencedColumnName: "ID" })
], PackagedUnit.prototype, "package", void 0);
PackagedUnit = __decorate([
    Entity(),
    Table({ name: "PACKAGED_UNITS" })
], PackagedUnit);
export { PackagedUnit };
//# sourceMappingURL=PackagedUnit.js.map