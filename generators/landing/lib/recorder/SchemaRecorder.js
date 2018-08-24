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
const ground_control_1 = require("@airport/ground-control");
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const typedi_1 = require("typedi");
const InjectionTokens_1 = require("../InjectionTokens");
let SchemaRecorder = class SchemaRecorder {
    constructor(domainDao, schemaColumnDao, schemaDao, schemaEntityDao, schemaLocator, schemaReferenceDao, schemaUtils, schemaVersionDao) {
        this.domainDao = domainDao;
        this.schemaColumnDao = schemaColumnDao;
        this.schemaDao = schemaDao;
        this.schemaEntityDao = schemaEntityDao;
        this.schemaLocator = schemaLocator;
        this.schemaReferenceDao = schemaReferenceDao;
        this.schemaUtils = schemaUtils;
        this.schemaVersionDao = schemaVersionDao;
    }
    async record(jsonSchemas) {
        const domainSet = new Set();
        const jsonSchemaMapByName = new Map();
        for (const jsonSchema of jsonSchemas) {
            domainSet.add(jsonSchema.domain);
            jsonSchemaMapByName.set(this.schemaUtils.getSchemaName(jsonSchema), jsonSchema);
        }
        const domainMapByName = await this.recordDomains(domainSet);
        const schemaMapByName = await this.recordSchemas(domainMapByName, jsonSchemaMapByName);
        const newSchemaVersionMapBySchemaName = await this.recordSchemaVersions(jsonSchemaMapByName, schemaMapByName);
        await this.generateSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName);
        const entitiesMapBySchemaName = await this.generateSchemaEntities(jsonSchemaMapByName, newSchemaVersionMapBySchemaName);
        await this.generateSchemaColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, entitiesMapBySchemaName);
    }
    async recordDomains(domainSet) {
        const domainMapByName = await this.domainDao.findMapByNameWithNames(Array.from(domainSet));
        const newDomains = [];
        for (const domainName of domainSet) {
            if (domainMapByName.has(domainName)) {
                continue;
            }
            newDomains.push({
                name: domainName
            });
        }
        if (newDomains.length) {
            await this.domainDao.bulkCreate(newDomains, false, false);
            for (const domain of newDomains) {
                domainMapByName.set(domain.name, domain);
            }
        }
        return domainMapByName;
    }
    async recordSchemas(domainMapByName, jsonSchemaMapByName) {
        const schemaMapByName = await this.schemaDao
            .findMapByNames(Array.from(jsonSchemaMapByName.keys()));
        const newSchemas = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            if (schemaMapByName.has(schemaName)) {
                continue;
            }
            const domain = domainMapByName.get(jsonSchema.domain);
            newSchemas.push({
                domain,
                scope: 'public',
                name: schemaName,
                status: traffic_pattern_1.SchemaStatus.CURRENT
            });
        }
        if (newSchemas.length) {
            await this.schemaDao.bulkCreate(newSchemas, false, false);
            for (const schema of newSchemas) {
                schemaMapByName.set(schema.name, schema);
            }
        }
        return schemaMapByName;
    }
    async recordSchemaVersions(jsonSchemaMapByName, schemaMapByName) {
        // Schema versions are guaranteed to be new
        const newSchemaVersions = [];
        const newSchemaVersionMapBySchemaName = new Map();
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const schema = schemaMapByName.get(schemaName);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const versionParts = lastJsonSchemaVersion.versionString.split('.');
            const newSchemaVersion = {
                integerVersion: lastJsonSchemaVersion.integerVersion,
                versionString: lastJsonSchemaVersion.versionString,
                majorVersion: parseInt(versionParts[0]),
                minorVersion: parseInt(versionParts[1]),
                patchVersion: parseInt(versionParts[2]),
                schema
            };
            newSchemaVersions.push(newSchemaVersion);
            newSchemaVersionMapBySchemaName.set(schemaName, newSchemaVersion);
        }
        await this.schemaVersionDao.bulkCreate(newSchemaVersions, false, false);
        return newSchemaVersionMapBySchemaName;
    }
    async generateSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName) {
        const schemaReferences = [];
        for (const ownSchemaVersion of newSchemaVersionMapBySchemaName.values()) {
            const schema = ownSchemaVersion.schema;
            const jsonSchema = jsonSchemaMapByName.get(schema.name);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
                const schemaName = this.schemaUtils.getSchemaName(jsonReferencedSchema);
                let referencedSchemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
                if (!referencedSchemaVersion) {
                    referencedSchemaVersion = this.schemaLocator.locateLatestSchemaVersionBySchemaName(schemaName);
                    if (!referencedSchemaVersion) {
                        throw new Error(`Could not locate schema:
						${schemaName}
						in either existing schemas or schemas being currently processed`);
                    }
                }
                schemaReferences.push({
                    index: jsonReferencedSchema.index,
                    ownSchemaVersion,
                    referencedSchemaVersion
                });
            }
        }
        await this.schemaReferenceDao.bulkCreate(schemaReferences, false, false);
    }
    async generateSchemaEntities(jsonSchemaMapByName, newSchemaVersionMapBySchemaName) {
        const entitiesMapBySchemaName = new Map();
        const allEntities = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            let index = 0;
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const schemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
            const entities = [];
            for (const jsonEntity of jsonEntities) {
                const entity = {
                    index: index++,
                    schemaVersion,
                    isLocal: jsonEntity.isLocal,
                    isRepositoryEntity: jsonEntity.isRepositoryEntity,
                    name: jsonEntity.name,
                    tableConfig: jsonEntity.tableConfig
                };
                entities.push(entity);
                allEntities.push(entity);
            }
            entitiesMapBySchemaName.set(schemaName, entities);
        }
        await this.schemaEntityDao.bulkCreate(allEntities, false, false);
        return entitiesMapBySchemaName;
    }
    async generateSchemaColumns(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, entitiesMapBySchemaName) {
        const columns = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            let index = 0;
            const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const jsonEntities = currentSchemaVersion.entities;
            const schemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
            const entities = entitiesMapBySchemaName.get(schemaName);
            jsonEntities.forEach((jsonEntity, tableIndex) => {
                const entity = entities[tableIndex];
                let index = 0;
                for (const jsonColumn of jsonEntity.columns) {
                    columns.push({
                        index: index++,
                        tableIndex,
                        schemaVersionId: schemaVersion.id,
                        idIndex: ,
                        isGenerated: jsonColumn.isGenerated,
                        allocationSize: jsonColumn.allocationSize,
                        type: jsonColumn.type
                    });
                }
            });
        }
        await this.schemaEntityDao.bulkCreate(columns, false, false);
    }
};
SchemaRecorder = __decorate([
    typedi_1.Service(ground_control_1.SchemaUtilsToken),
    __param(0, typedi_1.Inject(territory_1.DomainDaoToken)),
    __param(1, typedi_1.Inject(traffic_pattern_1.SchemaColumnDaoToken)),
    __param(2, typedi_1.Inject(traffic_pattern_1.SchemaDaoToken)),
    __param(3, typedi_1.Inject(traffic_pattern_1.SchemaEntityDaoToken)),
    __param(4, typedi_1.Inject(InjectionTokens_1.SchemaLocatorToken)),
    __param(5, typedi_1.Inject(traffic_pattern_1.SchemaReferenceDaoToken)),
    __param(6, typedi_1.Inject(ground_control_1.SchemaUtilsToken)),
    __param(7, typedi_1.Inject(traffic_pattern_1.SchemaVersionDaoToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Object, Object])
], SchemaRecorder);
exports.SchemaRecorder = SchemaRecorder;
//# sourceMappingURL=SchemaRecorder.js.map