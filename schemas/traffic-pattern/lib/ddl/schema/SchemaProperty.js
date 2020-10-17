var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, Id, JoinColumn, ManyToOne, OneToMany, Table } from '@airport/air-control';
import { CascadeType } from '@airport/ground-control';
import { VersionedSchemaObject } from './VersionedSchemaObject';
let SchemaProperty = class SchemaProperty extends VersionedSchemaObject {
    constructor() {
        super(...arguments);
        this.propertyColumns = [];
        this.relation = [];
    }
};
__decorate([
    DbNumber(),
    Id()
], SchemaProperty.prototype, "id", void 0);
__decorate([
    DbNumber(),
    Column({ name: 'PROPERTY_INDEX', nullable: false })
], SchemaProperty.prototype, "index", void 0);
__decorate([
    DbString(),
    Column({ name: 'NAME', nullable: false })
], SchemaProperty.prototype, "name", void 0);
__decorate([
    DbBoolean(),
    Column({ name: 'IS_ID', nullable: false })
], SchemaProperty.prototype, "isId", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'SCHEMA_ENTITY_ID', referencedColumnName: 'ID', nullable: false })
], SchemaProperty.prototype, "entity", void 0);
__decorate([
    OneToMany({ cascade: CascadeType.ALL, mappedBy: 'property' })
], SchemaProperty.prototype, "propertyColumns", void 0);
__decorate([
    OneToMany({ cascade: CascadeType.ALL, mappedBy: 'property' })
], SchemaProperty.prototype, "relation", void 0);
SchemaProperty = __decorate([
    Entity(),
    Table({
        name: 'SCHEMA_PROPERTIES'
    })
], SchemaProperty);
export { SchemaProperty };
//# sourceMappingURL=SchemaProperty.js.map