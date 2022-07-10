var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/tarmaq-entity";
let MetroArea = class MetroArea {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column({ name: 'METRO_AREA_ID' })
], MetroArea.prototype, "id", void 0);
__decorate([
    DbString()
], MetroArea.prototype, "name", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'COUNTRY_ID',
        referencedColumnName: 'COUNTRY_ID'
    })
], MetroArea.prototype, "country", void 0);
__decorate([
    OneToMany({ mappedBy: 'metroArea' })
], MetroArea.prototype, "metroAreaStates", void 0);
__decorate([
    OneToMany({ mappedBy: 'metroArea' })
], MetroArea.prototype, "userAccounts", void 0);
MetroArea = __decorate([
    Entity(),
    Table({ name: "METRO_AREAS" })
], MetroArea);
export { MetroArea };
//# sourceMappingURL=MetroArea.js.map