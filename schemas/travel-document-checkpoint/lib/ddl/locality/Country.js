var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-traffic-control";
let Country = class Country {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], Country.prototype, "id", void 0);
__decorate([
    DbString()
], Country.prototype, "name", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'CONTINENT_ID', referencedColumnName: 'ID' })
], Country.prototype, "continent", void 0);
__decorate([
    OneToMany({ mappedBy: 'country' })
], Country.prototype, "users", void 0);
Country = __decorate([
    Entity(),
    Table({ name: "COUNTRIES" })
], Country);
export { Country };
//# sourceMappingURL=Country.js.map