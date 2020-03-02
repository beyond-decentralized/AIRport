"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const ground_control_1 = require("@airport/ground-control");
const VersionedSchemaObject_1 = require("./VersionedSchemaObject");
let SchemaEntity = class SchemaEntity extends VersionedSchemaObject_1.VersionedSchemaObject {
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
    air_control_1.Id()
], SchemaEntity.prototype, "id", void 0);
__decorate([
    air_control_1.Column({ name: 'TABLE_INDEX', nullable: false }),
    air_control_1.DbNumber()
], SchemaEntity.prototype, "index", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_LOCAL', nullable: false })
], SchemaEntity.prototype, "isLocal", void 0);
__decorate([
    air_control_1.Column({ name: 'IS_REPOSITORY_ENTITY', nullable: false })
], SchemaEntity.prototype, "isRepositoryEntity", void 0);
__decorate([
    air_control_1.Column({ name: 'NAME', nullable: false })
], SchemaEntity.prototype, "name", void 0);
__decorate([
    air_control_1.Column({ name: 'TABLE_CONFIGURATION', nullable: false }),
    air_control_1.Json()
], SchemaEntity.prototype, "tableConfig", void 0);
__decorate([
    air_control_1.ManyToOne(),
    air_control_1.JoinColumn({ name: 'SCHEMA_VERSION_ID', referencedColumnName: 'ID', nullable: false })
], SchemaEntity.prototype, "schemaVersion", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'entity' })
], SchemaEntity.prototype, "columns", void 0);
__decorate([
    air_control_1.OneToMany({ cascade: ground_control_1.CascadeType.ALL, mappedBy: 'entity' })
], SchemaEntity.prototype, "properties", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'entity' })
], SchemaEntity.prototype, "relations", void 0);
__decorate([
    air_control_1.OneToMany({ mappedBy: 'relationEntity' })
], SchemaEntity.prototype, "relationReferences", void 0);
__decorate([
    air_control_1.Transient()
], SchemaEntity.prototype, "columnMap", void 0);
__decorate([
    air_control_1.Transient()
], SchemaEntity.prototype, "idColumns", void 0);
__decorate([
    air_control_1.Transient()
], SchemaEntity.prototype, "idColumnMap", void 0);
__decorate([
    air_control_1.Transient()
], SchemaEntity.prototype, "propertyMap", void 0);
SchemaEntity = __decorate([
    air_control_1.Entity(),
    air_control_1.Table({
        name: 'SCHEMA_ENTITIES'
    })
], SchemaEntity);
exports.SchemaEntity = SchemaEntity;
//# sourceMappingURL=SchemaEntity.js.map