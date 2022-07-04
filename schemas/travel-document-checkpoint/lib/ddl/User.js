var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, ManyToOne, } from '@airport/air-traffic-control';
let User = class User {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column({ name: 'USER_LID' })
], User.prototype, "_localId", void 0);
__decorate([
    Column({ name: "EMAIL" }),
    DbString()
], User.prototype, "email", void 0);
__decorate([
    Column({ name: "PASSWORD_HASH" }),
    DbString()
], User.prototype, "passwordHash", void 0);
__decorate([
    Column({ name: "RANKING" }),
    DbNumber()
], User.prototype, "ranking", void 0);
__decorate([
    Column({ name: "USERNAME" }),
    DbString()
], User.prototype, "username", void 0);
__decorate([
    Column({ name: "USER_GUID", nullable: false }),
    DbString()
], User.prototype, "GUID", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'DOMAIN_LID',
        referencedColumnName: 'DOMAIN_LID'
    })
], User.prototype, "domain", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'CONTINENT_ID',
        referencedColumnName: 'CONTINENT_ID', nullable: true
    })
], User.prototype, "continent", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'COUNTRY_ID',
        referencedColumnName: 'COUNTRY_ID', nullable: true
    })
], User.prototype, "country", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'STATE_ID',
        referencedColumnName: 'STATE_ID', nullable: true
    })
], User.prototype, "state", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'METRO_AREA_ID',
        referencedColumnName: 'METRO_AREA_ID', nullable: true
    })
], User.prototype, "metroArea", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=User.js.map