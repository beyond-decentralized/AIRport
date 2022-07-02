var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from "@airport/air-traffic-control";
let Client = class Client {
};
__decorate([
    Id()
], Client.prototype, "id", void 0);
__decorate([
    DbString()
], Client.prototype, "GUID", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'CONTINENT_ID', referencedColumnName: 'ID', nullable: true })
], Client.prototype, "continent", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'COUNTRY_ID', referencedColumnName: 'ID', nullable: true })
], Client.prototype, "country", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'STATE_ID', referencedColumnName: 'ID', nullable: true })
], Client.prototype, "state", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'METRO_AREA_ID', referencedColumnName: 'ID', nullable: true })
], Client.prototype, "metroArea", void 0);
__decorate([
    OneToMany({ mappedBy: 'client' })
], Client.prototype, "clientTypes", void 0);
Client = __decorate([
    Entity(),
    Table({
        name: 'CLIENTS'
    })
], Client);
export { Client };
//# sourceMappingURL=Client.js.map