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
let SchemaRecorder = class SchemaRecorder {
    constructor(domainDao, schemaDao, schemaUtils, schemaVersionDao) {
        this.domainDao = domainDao;
        this.schemaDao = schemaDao;
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
        // Schema versions are guaranteed to be new
        const newSchemaVersions = [];
        for (const [schemaName, jsonSchema] of jsonSchemaMapByName) {
            const schema = schemaMapByName.get(schemaName);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const versionParts = lastJsonSchemaVersion.versionString.split('.');
            newSchemaVersions.push({
                integerVersion: lastJsonSchemaVersion.integerVersion,
                versionString: lastJsonSchemaVersion.versionString,
                majorVersion: parseInt(versionParts[0]),
                minorVersion: parseInt(versionParts[1]),
                patchVersion: parseInt(versionParts[2]),
                schema
            });
        }
        await this.schemaVersionDao.bulkCreate(newSchemaVersions, false, false);
        for (const schemaVersion of newSchemaVersions) {
            const schema = schemaVersion.schema;
            const jsonSchema = jsonSchemaMapByName.get(schema.name);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
            }
        }
    }
};
SchemaRecorder = __decorate([
    typedi_1.Service(ground_control_1.SchemaUtilsToken),
    __param(0, typedi_1.Inject(territory_1.DomainDaoToken)),
    __param(1, typedi_1.Inject(traffic_pattern_1.SchemaDaoToken)),
    __param(2, typedi_1.Inject(ground_control_1.SchemaUtilsToken)),
    __param(3, typedi_1.Inject(traffic_pattern_1.SchemaVersionDaoToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SchemaRecorder);
exports.SchemaRecorder = SchemaRecorder;
//# sourceMappingURL=SchemaRecorder.js.map