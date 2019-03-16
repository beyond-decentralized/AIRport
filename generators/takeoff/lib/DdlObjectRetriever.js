"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("./InjectionTokens");
let DdlObjectRetriever = class DdlObjectRetriever {
    constructor(domainDao, schemaColumnDao, schemaDao, schemaEntityDao, schemaPropertyColumnDao, schemaPropertyDao, schemaReferenceDao, schemaRelationColumnDao, schemaRelationDao, schemaVersionDao) {
        this.domainDao = domainDao;
        this.schemaColumnDao = schemaColumnDao;
        this.schemaDao = schemaDao;
        this.schemaEntityDao = schemaEntityDao;
        this.schemaPropertyColumnDao = schemaPropertyColumnDao;
        this.schemaPropertyDao = schemaPropertyDao;
        this.schemaReferenceDao = schemaReferenceDao;
        this.schemaRelationColumnDao = schemaRelationColumnDao;
        this.schemaRelationDao = schemaRelationDao;
        this.schemaVersionDao = schemaVersionDao;
    }
    async retrieveDdlObjects() {
        const schemas = await this.schemaDao
            .findAllActive();
        const schemaIndexes = [];
        const domainIdSet = new Set();
        schemas.forEach(schema => {
            schemaIndexes.push(schema.index);
            domainIdSet.add(schema.domain.id);
        });
        schemas.sort((schema1, schema2) => {
            return schema1.index - schema2.index;
        });
        const domains = await this.domainDao
            .findByIdIn(Array.from(domainIdSet));
        const latestSchemaVersions = await this.schemaVersionDao
            .findAllLatestForSchemaIndexes(schemaIndexes);
        const latestSchemaVersionIds = latestSchemaVersions.map(schemaVersion => schemaVersion.id);
        const schemaReferences = await this.schemaReferenceDao
            .findAllForSchemaVersions(latestSchemaVersionIds);
        const entities = await this.schemaEntityDao
            .findAllForSchemaVersions(latestSchemaVersionIds);
        const entityIds = entities.map(entity => entity.id);
        const properties = await this.schemaPropertyDao
            .findAllForEntities(entityIds);
        const propertyIds = properties.map(property => property.id);
        const relations = await this.schemaRelationDao
            .findAllForProperties(propertyIds);
        const columns = await this.schemaColumnDao
            .findAllForEntities(entityIds);
        const columnIds = columns.map(column => column.id);
        const propertyColumns = await this.schemaPropertyColumnDao
            .findAllForColumns(columnIds);
        const relationColumns = await this.schemaRelationColumnDao
            .findAllForColumns(columnIds);
        return {
            columns,
            domains,
            entities,
            latestSchemaVersions,
            properties,
            propertyColumns,
            relationColumns,
            relations,
            schemaReferences,
            schemas
        };
    }
};
DdlObjectRetriever = __decorate([
    typedi_1.Service(InjectionTokens_1.DdlObjectRetrieverToken),
    __param(0, typedi_1.Inject(territory_1.DomainDaoToken)),
    __param(1, typedi_1.Inject(traffic_pattern_1.SchemaColumnDaoToken)),
    __param(2, typedi_1.Inject(traffic_pattern_1.SchemaDaoToken)),
    __param(3, typedi_1.Inject(traffic_pattern_1.SchemaEntityDaoToken)),
    __param(4, typedi_1.Inject(traffic_pattern_1.SchemaPropertyColumnDaoToken)),
    __param(5, typedi_1.Inject(traffic_pattern_1.SchemaPropertyDaoToken)),
    __param(6, typedi_1.Inject(traffic_pattern_1.SchemaReferenceDaoToken)),
    __param(7, typedi_1.Inject(traffic_pattern_1.SchemaRelationColumnDaoToken)),
    __param(8, typedi_1.Inject(traffic_pattern_1.SchemaRelationDaoToken)),
    __param(9, typedi_1.Inject(traffic_pattern_1.SchemaVersionDaoToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object])
], DdlObjectRetriever);
exports.DdlObjectRetriever = DdlObjectRetriever;
//# sourceMappingURL=DdlObjectRetriever.js.map