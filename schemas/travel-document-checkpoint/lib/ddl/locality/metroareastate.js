var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from "@airport/air-traffic-control";
let MetroAreaState = class MetroAreaState {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'STATE_ID',
        referencedColumnName: 'STATE_ID'
    })
], MetroAreaState.prototype, "state", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({
        name: 'METRO_AREA_ID',
        referencedColumnName: 'METRO_AREA_ID'
    })
], MetroAreaState.prototype, "metroArea", void 0);
MetroAreaState = __decorate([
    Entity(),
    Table({ name: "METRO_AREA_STATES" })
], MetroAreaState);
export { MetroAreaState };
//# sourceMappingURL=MetroAreaState.js.map