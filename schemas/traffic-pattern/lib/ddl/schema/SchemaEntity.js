var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, Id, JoinColumn, Json, ManyToOne, OneToMany, Table, Transient } from '@airport/air-control';
import { VersionedSchemaObject } from './VersionedSchemaObject';
let SchemaEntity = class SchemaEntity extends VersionedSchemaObject {
    constructor() {
        super(...arguments);
        //
        // One-to-Many's
        //
        this.columns = [];
        // TODO: implement if needed
        // @OneToMany()
        // @JoinColumns([
        // 	{name: "SCHEMA_VERSION_ID"},
        // 	{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
        // ])
        // @WhereJoinTable((
        // 	otm: QSchemaEntity,
        // 	mto: QSchemaColumn
        // ) => mto.idIndex.isNotNull())
        // idColumns: ISchemaColumn[];
        this.operations = [];
        this.properties = [];
        this.relations = [];
        this.relationReferences = [];
        this.columnMap = {};
        this.idColumns = [];
        this.idColumnMap = {};
        this.propertyMap = {};
    }
};
__decorate([
    DbNumber(),
    Id()
], SchemaEntity.prototype, "id", void 0);
__decorate([
    Column({ name: 'TABLE_INDEX', nullable: false }),
    DbNumber()
], SchemaEntity.prototype, "index", void 0);
__decorate([
    Column({ name: 'IS_LOCAL', nullable: false }),
    DbBoolean()
], SchemaEntity.prototype, "isLocal", void 0);
__decorate([
    Column({ name: 'IS_REPOSITORY_ENTITY', nullable: false }),
    DbBoolean()
], SchemaEntity.prototype, "isRepositoryEntity", void 0);
__decorate([
    Column({ name: 'NAME', nullable: false }),
    DbString()
], SchemaEntity.prototype, "name", void 0);
__decorate([
    Column({ name: 'TABLE_CONFIGURATION', nullable: false }),
    Json()
], SchemaEntity.prototype, "tableConfig", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({ name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false })
], SchemaEntity.prototype, "schemaVersion", void 0);
__decorate([
    OneToMany({ mappedBy: 'entity' })
], SchemaEntity.prototype, "columns", void 0);
__decorate([
    OneToMany({ mappedBy: 'entity' })
], SchemaEntity.prototype, "operations", void 0);
__decorate([
    OneToMany({ mappedBy: 'entity' })
], SchemaEntity.prototype, "properties", void 0);
__decorate([
    OneToMany({ mappedBy: 'entity' })
], SchemaEntity.prototype, "relations", void 0);
__decorate([
    OneToMany({ mappedBy: 'relationEntity' })
], SchemaEntity.prototype, "relationReferences", void 0);
__decorate([
    Transient()
], SchemaEntity.prototype, "columnMap", void 0);
__decorate([
    Transient()
], SchemaEntity.prototype, "idColumns", void 0);
__decorate([
    Transient()
], SchemaEntity.prototype, "idColumnMap", void 0);
__decorate([
    Transient()
], SchemaEntity.prototype, "propertyMap", void 0);
SchemaEntity = __decorate([
    Entity(),
    Table({
        name: 'SCHEMA_ENTITIES',
        // indexes: (se: SchemaEntity) => [{
        // 	property: se.schemaVersion
        // }]
    })
], SchemaEntity);
export { SchemaEntity };
//# sourceMappingURL=SchemaEntity.js.map