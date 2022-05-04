var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-traffic-control';
import { VersionedApplicationObject } from './VersionedApplicationObject';
let ApplicationColumn = class ApplicationColumn extends VersionedApplicationObject {
    constructor() {
        super(...arguments);
        this.propertyColumns = [];
        this.manyRelationColumns = [];
        this.oneRelationColumns = [];
    }
};
__decorate([
    DbNumber(),
    Id()
], ApplicationColumn.prototype, "id", void 0);
__decorate([
    Column({ name: 'COLUMN_INDEX', nullable: false }),
    DbNumber()
], ApplicationColumn.prototype, "index", void 0);
__decorate([
    Column({ name: 'ID_INDEX' }),
    DbNumber()
], ApplicationColumn.prototype, "idIndex", void 0);
__decorate([
    Column({ name: 'IS_GENERATED', nullable: false }),
    DbBoolean()
], ApplicationColumn.prototype, "isGenerated", void 0);
__decorate([
    Column({ name: 'ALLOCATION_SIZE' }),
    DbNumber()
], ApplicationColumn.prototype, "allocationSize", void 0);
__decorate([
    Column({ name: 'NAME', nullable: false }),
    DbString()
], ApplicationColumn.prototype, "name", void 0);
__decorate([
    Column({ name: 'NOT_NULL', nullable: false }),
    DbBoolean()
], ApplicationColumn.prototype, "notNull", void 0);
__decorate([
    Column({ name: 'PRECISION' }),
    DbNumber()
], ApplicationColumn.prototype, "precision", void 0);
__decorate([
    Column({ name: 'SCALE' }),
    DbNumber()
], ApplicationColumn.prototype, "scale", void 0);
__decorate([
    Column({ name: 'TYPE', nullable: false }),
    DbString()
], ApplicationColumn.prototype, "type", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'APPLICATION_ENTITY_ID', referencedColumnName: 'ID', nullable: false })
], ApplicationColumn.prototype, "entity", void 0);
__decorate([
    OneToMany({ mappedBy: 'column' })
], ApplicationColumn.prototype, "propertyColumns", void 0);
__decorate([
    OneToMany({ mappedBy: 'manyColumn' })
], ApplicationColumn.prototype, "manyRelationColumns", void 0);
__decorate([
    OneToMany({ mappedBy: 'oneColumn' })
], ApplicationColumn.prototype, "oneRelationColumns", void 0);
ApplicationColumn = __decorate([
    Entity(),
    Table({
        name: 'APPLICATION_COLUMNS'
    })
], ApplicationColumn);
export { ApplicationColumn };
//# sourceMappingURL=ApplicationColumn.js.map