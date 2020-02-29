var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-control';
import { VersionedSchemaObject } from './VersionedSchemaObject';
let SchemaColumn = class SchemaColumn extends VersionedSchemaObject {
    constructor() {
        super(...arguments);
        this.propertyColumns = [];
        this.manyRelationColumns = [];
        this.oneRelationColumns = [];
    }
};
__decorate([
    Id()
], SchemaColumn.prototype, "id", void 0);
__decorate([
    Column({ name: 'COLUMN_INDEX', nullable: false })
], SchemaColumn.prototype, "index", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false })
], SchemaColumn.prototype, "entity", void 0);
__decorate([
    Column({ name: 'ID_INDEX' })
], SchemaColumn.prototype, "idIndex", void 0);
__decorate([
    Column({ name: 'IS_GENERATED', nullable: false })
], SchemaColumn.prototype, "isGenerated", void 0);
__decorate([
    Column({ name: 'ALLOCATION_SIZE' })
], SchemaColumn.prototype, "allocationSize", void 0);
__decorate([
    Column({ name: 'NAME', nullable: false })
], SchemaColumn.prototype, "name", void 0);
__decorate([
    Column({ name: 'NOT_NULL', nullable: false })
], SchemaColumn.prototype, "notNull", void 0);
__decorate([
    DbNumber(),
    Column({ name: 'TYPE', nullable: false })
], SchemaColumn.prototype, "type", void 0);
__decorate([
    OneToMany({ mappedBy: 'column' })
], SchemaColumn.prototype, "propertyColumns", void 0);
__decorate([
    OneToMany({ mappedBy: 'manyColumn' })
], SchemaColumn.prototype, "manyRelationColumns", void 0);
__decorate([
    OneToMany({ mappedBy: 'oneColumn' })
], SchemaColumn.prototype, "oneRelationColumns", void 0);
SchemaColumn = __decorate([
    Entity(),
    Table({
        name: 'SCHEMA_COLUMNS'
    })
], SchemaColumn);
export { SchemaColumn };
//# sourceMappingURL=SchemaColumn.js.map