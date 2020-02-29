var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Entity, Id, JoinColumn, ManyToOne, Table } from '@airport/air-control';
import { VersionedSchemaObject } from './VersionedSchemaObject';
let SchemaReference = class SchemaReference extends VersionedSchemaObject {
};
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'OWN_SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false })
], SchemaReference.prototype, "ownSchemaVersion", void 0);
__decorate([
    Id(),
    ManyToOne(),
    JoinColumn({ name: 'REFERENCED_SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false })
], SchemaReference.prototype, "referencedSchemaVersion", void 0);
__decorate([
    Column({ name: 'SCHEMA_REFERENCE_INDEX', nullable: false })
], SchemaReference.prototype, "index", void 0);
SchemaReference = __decorate([
    Entity(),
    Table({
        name: 'SCHEMA_REFERENCES'
    })
], SchemaReference);
export { SchemaReference };
//# sourceMappingURL=SchemaReference.js.map