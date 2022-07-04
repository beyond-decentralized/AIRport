var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, Json, ManyToOne, Table } from '@airport/air-traffic-control';
import { VersionedApplicationObject } from './VersionedApplicationObject';
let ApplicationOperation = class ApplicationOperation extends VersionedApplicationObject {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber(),
    Column({ name: 'APPLICATION_OPERATION_LID' })
], ApplicationOperation.prototype, "_localId", void 0);
__decorate([
    Column({
        name: 'TYPE',
        nullable: false
    }),
    DbNumber()
], ApplicationOperation.prototype, "type", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'APPLICATION_ENTITY_LID',
        referencedColumnName: 'APPLICATION_ENTITY_LID',
        nullable: false
    })
], ApplicationOperation.prototype, "entity", void 0);
__decorate([
    Column({ name: 'NAME', nullable: false }),
    DbString()
], ApplicationOperation.prototype, "name", void 0);
__decorate([
    Column({ name: 'RULE', nullable: false }),
    Json()
], ApplicationOperation.prototype, "rule", void 0);
ApplicationOperation = __decorate([
    Entity(),
    Table({
        name: 'APPLICATION_OPERATIONS'
    })
], ApplicationOperation);
export { ApplicationOperation };
//# sourceMappingURL=ApplicationOperation.js.map