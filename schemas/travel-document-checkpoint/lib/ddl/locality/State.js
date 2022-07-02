var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-traffic-control";
let State = class State {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], State.prototype, "id", void 0);
__decorate([
    DbString()
], State.prototype, "name", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'COUNTRY_ID', referencedColumnName: 'ID' })
], State.prototype, "country", void 0);
__decorate([
    OneToMany({ mappedBy: 'state' })
], State.prototype, "metroAreaStates", void 0);
__decorate([
    OneToMany({ mappedBy: 'state' })
], State.prototype, "users", void 0);
State = __decorate([
    Entity(),
    Table({ name: "STATES" })
], State);
export { State };
//# sourceMappingURL=State.js.map