var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, DbBoolean, DbNumber, DbString, Entity, Id, JoinColumn, Json, ManyToOne, OneToMany, Table, Transient } from '@airport/tarmaq-entity';
import { VersionedApplicationObject } from './VersionedApplicationObject';
let ApplicationEntity = class ApplicationEntity extends VersionedApplicationObject {
    constructor() {
        super(...arguments);
        //
        // One-to-Many's
        //
        this.columns = [];
        // TODO: implement if needed
        // @OneToMany()
        // @JoinColumns([
        // 	{name: "APPLICATION_VERSION_LID"},
        // 	{name: "TABLE_INDEX", referencedColumnName: "INDEX"}
        // ])
        // @WhereJoinTable((
        // 	otm: QApplicationEntity,
        // 	mto: QApplicationColumn
        // ) => mto.idIndex.isNotNull())
        // idColumns: IApplicationColumn[];
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
    Id(),
    Column({ name: 'APPLICATION_ENTITY_LID' })
], ApplicationEntity.prototype, "_localId", void 0);
__decorate([
    Column({ name: 'TABLE_INDEX', nullable: false }),
    DbNumber()
], ApplicationEntity.prototype, "index", void 0);
__decorate([
    Column({ name: 'IS_LOCAL', nullable: false }),
    DbBoolean()
], ApplicationEntity.prototype, "isLocal", void 0);
__decorate([
    Column({ name: 'IS_AIR_ENTITY', nullable: false }),
    DbBoolean()
], ApplicationEntity.prototype, "isAirEntity", void 0);
__decorate([
    Column({ name: 'NAME', nullable: false }),
    DbString()
], ApplicationEntity.prototype, "name", void 0);
__decorate([
    Column({ name: 'TABLE_CONFIGURATION', nullable: false }),
    Json()
], ApplicationEntity.prototype, "tableConfig", void 0);
__decorate([
    ManyToOne(),
    JoinColumn({
        name: 'APPLICATION_VERSION_LID',
        referencedColumnName: 'APPLICATION_VERSION_LID', nullable: false
    })
], ApplicationEntity.prototype, "applicationVersion", void 0);
__decorate([
    OneToMany({ mappedBy: 'entity' })
], ApplicationEntity.prototype, "columns", void 0);
__decorate([
    OneToMany({ mappedBy: 'entity' })
], ApplicationEntity.prototype, "operations", void 0);
__decorate([
    OneToMany({ mappedBy: 'entity' })
], ApplicationEntity.prototype, "properties", void 0);
__decorate([
    OneToMany({ mappedBy: 'entity' })
], ApplicationEntity.prototype, "relations", void 0);
__decorate([
    OneToMany({ mappedBy: 'relationEntity' })
], ApplicationEntity.prototype, "relationReferences", void 0);
__decorate([
    Transient()
], ApplicationEntity.prototype, "columnMap", void 0);
__decorate([
    Transient()
], ApplicationEntity.prototype, "idColumns", void 0);
__decorate([
    Transient()
], ApplicationEntity.prototype, "idColumnMap", void 0);
__decorate([
    Transient()
], ApplicationEntity.prototype, "propertyMap", void 0);
ApplicationEntity = __decorate([
    Entity(),
    Table({
        name: 'APPLICATION_ENTITIES',
        // indexes: (se: ApplicationEntity) => [{
        // 	property: se.applicationVersion
        // }]
    })
], ApplicationEntity);
export { ApplicationEntity };
//# sourceMappingURL=ApplicationEntity.js.map