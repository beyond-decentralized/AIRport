var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-traffic-control';
let Terminal = class Terminal {
    constructor() {
        this.isLocal = false;
    }
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], Terminal.prototype, "id", void 0);
__decorate([
    Column({ name: 'GUID', nullable: false }),
    DbString()
], Terminal.prototype, "GUID", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'OWNER_USER_ID', referencedColumnName: 'ID', nullable: true })
], Terminal.prototype, "owner", void 0);
__decorate([
    Column({ name: 'IS_LOCAL', nullable: false }),
    DbBoolean()
], Terminal.prototype, "isLocal", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'CONTINENT_ID', referencedColumnName: 'ID', nullable: true })
], Terminal.prototype, "continent", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'COUNTRY_ID', referencedColumnName: 'ID', nullable: true })
], Terminal.prototype, "country", void 0);
__decorate([
    OneToMany({ mappedBy: 'terminal' })
], Terminal.prototype, "terminalTypes", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'STATE_ID', referencedColumnName: 'ID', nullable: true })
], Terminal.prototype, "state", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'METRO_AREA_ID', referencedColumnName: 'ID', nullable: true })
], Terminal.prototype, "metroArea", void 0);
Terminal = __decorate([
    Entity(),
    Table({
        name: 'TERMINALS',
        indexes: (t) => [{
                property: t.GUID,
                unique: true
            }]
    })
], Terminal);
export { Terminal };
//# sourceMappingURL=Terminal.js.map