var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbNumber, DbString, Entity, GeneratedValue, Id, JoinColumn, Json, ManyToOne, Table } from '@airport/air-control';
import { VersionedSchemaObject } from './VersionedSchemaObject';
let SchemaOperation = class SchemaOperation extends VersionedSchemaObject {
};
__decorate([
    Id(),
    GeneratedValue(),
    DbNumber()
], SchemaOperation.prototype, "id", void 0);
__decorate([
    Column({
        name: 'TYPE',
        nullable: false
    }),
    DbNumber()
], SchemaOperation.prototype, "type", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'SCHEMA_ENTITY_ID',
        referencedColumnName: 'ID',
        nullable: false
    })
], SchemaOperation.prototype, "entity", void 0);
__decorate([
    Column({ name: 'NAME', nullable: false }),
    DbString()
], SchemaOperation.prototype, "name", void 0);
__decorate([
    Column({ name: 'RULE', nullable: false }),
    Json()
], SchemaOperation.prototype, "rule", void 0);
SchemaOperation = __decorate([
    Entity(),
    Table({
        name: 'SCHEMA_OPERATIONS'
    })
], SchemaOperation);
export { SchemaOperation };
//# sourceMappingURL=SchemaOperation.js.map