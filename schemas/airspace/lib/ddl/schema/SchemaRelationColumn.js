var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-control';
import { VersionedSchemaObject } from './VersionedSchemaObject';
let SchemaRelationColumn = class SchemaRelationColumn extends VersionedSchemaObject {
};
__decorate([
    Id()
], SchemaRelationColumn.prototype, "id", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'MANY_SCHEMA_COLUMN_ID',
        referencedColumnName: 'ID',
        nullable: false
    })
], SchemaRelationColumn.prototype, "manyColumn", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'ONE_SCHEMA_COLUMN_ID', referencedColumnName: 'ID', nullable: false })
], SchemaRelationColumn.prototype, "oneColumn", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'MANY_SCHEMA_RELATION_ID', referencedColumnName: 'ID' })
], SchemaRelationColumn.prototype, "manyRelation", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'ONE_SCHEMA_RELATION_ID', referencedColumnName: 'ID' })
], SchemaRelationColumn.prototype, "oneRelation", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'PARENT_RELATION_ID', referencedColumnName: 'ID' })
], SchemaRelationColumn.prototype, "parentRelation", void 0);
SchemaRelationColumn = __decorate([
    Entity(),
    Table({
        name: 'SCHEMA_RELATION_COLUMNS'
    })
], SchemaRelationColumn);
export { SchemaRelationColumn };
//# sourceMappingURL=SchemaRelationColumn.js.map