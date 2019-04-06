"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const diTokens_1 = require("../diTokens");
class SchemaChecker {
    constructor() {
        this.schemaDao = di_1.DI.cache(traffic_pattern_1.SCHEMA_DAO);
        di_1.DI.get((dbSchemaUtils, utils) => {
            this.dbSchemaUtils = dbSchemaUtils;
            this.utils = utils;
        }, ground_control_1.DB_SCHEMA_UTILS, air_control_1.UTILS);
    }
    async check(jsonSchema) {
        if (!jsonSchema) {
            throw new Error(`Json Schema not provided`);
        }
        if (!(jsonSchema.versions instanceof Array)) {
            throw new Error('schema.versions is not an array');
        }
        if (jsonSchema.versions.length !== 1) {
            // FIXME: add support for schema versioning
            throw new Error('Currently only 1 version of schema is supported');
        }
        await this.checkDomain(jsonSchema);
    }
    async checkDomain(jsonSchema) {
        // TODO: implement domain checking
    }
    async checkDependencies(jsonSchemas) {
        const allReferencedSchemaMap = new Map();
        const referencedSchemaMapBySchema = new Map();
        for (const jsonSchema of jsonSchemas) {
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const referencedSchemaMapForSchema = this.utils.ensureChildJsMap(this.utils.ensureChildJsMap(referencedSchemaMapBySchema, jsonSchema.domain), jsonSchema.name);
            for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
                this.utils.ensureChildJsMap(allReferencedSchemaMap, jsonReferencedSchema.domain).set(jsonReferencedSchema.name, jsonReferencedSchema);
                this.utils.ensureChildJsMap(referencedSchemaMapForSchema, jsonReferencedSchema.domain).set(jsonReferencedSchema.name, jsonReferencedSchema);
            }
        }
        this.pruneInGroupReferences(jsonSchemas, allReferencedSchemaMap, referencedSchemaMapBySchema);
        await this.pruneReferencesToExistingSchemas(jsonSchemas, allReferencedSchemaMap, referencedSchemaMapBySchema);
        const schemasWithValidDependencies = [];
        const schemasInNeedOfAdditionalDependencies = [];
        const neededDependencies = [];
        for (const dependenciesForDomain of allReferencedSchemaMap.values()) {
            for (const dependency of dependenciesForDomain.values()) {
                neededDependencies.push(dependency);
            }
        }
        for (const jsonSchema of jsonSchemas) {
            const referencedSchemaMapForSchema = referencedSchemaMapBySchema.get(jsonSchema.domain).get(jsonSchema.name);
            if (this.hasReferences(referencedSchemaMapForSchema)) {
                schemasWithValidDependencies.push(jsonSchema);
            }
            else {
                schemasInNeedOfAdditionalDependencies.push(jsonSchema);
            }
        }
        return {
            schemasWithValidDependencies,
            schemasInNeedOfAdditionalDependencies,
            neededDependencies
        };
    }
    pruneInGroupReferences(jsonSchemas, allReferencedSchemaMap, referencedSchemaMapBySchema) {
        for (const jsonSchema of jsonSchemas) {
            // Remove every in-group reference for this schema
            for (const [domainName, referenceMapForSchemasOfDomain] of referencedSchemaMapBySchema) {
                for (const [schemaName, schemasReferencedByAGivenSchema] of referenceMapForSchemasOfDomain) {
                    const schemaReferencesForDomain = schemasReferencedByAGivenSchema.get(jsonSchema.domain);
                    if (schemaReferencesForDomain) {
                        schemaReferencesForDomain.delete(jsonSchema.name);
                    }
                }
            }
            const allSchemaReferencesForDomain = allReferencedSchemaMap.get(jsonSchema.domain);
            if (allSchemaReferencesForDomain) {
                allSchemaReferencesForDomain.delete(jsonSchema.name);
            }
        }
    }
    async pruneReferencesToExistingSchemas(jsonSchemas, allReferencedSchemaMap, referencedSchemaMapBySchema) {
        const existingSchemaInfo = await this.findExistingSchemas(allReferencedSchemaMap);
        for (const schemaName of existingSchemaInfo.existingSchemaMapByName.keys()) {
            const coreDomainAndSchemaNames = existingSchemaInfo.coreDomainAndSchemaNamesBySchemaName.get(schemaName);
            // Remove every reference for this existing schema
            for (const referenceMapForSchemasOfDomain of referencedSchemaMapBySchema.values()) {
                for (const schemasReferencedByAGivenSchema of referenceMapForSchemasOfDomain.values()) {
                    const schemaReferencesForDomain = schemasReferencedByAGivenSchema.get(coreDomainAndSchemaNames.domain);
                    if (schemaReferencesForDomain) {
                        schemaReferencesForDomain.delete(coreDomainAndSchemaNames.schema);
                    }
                }
            }
            const allSchemaReferencesForDomain = allReferencedSchemaMap.get(coreDomainAndSchemaNames.domain);
            if (allSchemaReferencesForDomain) {
                allSchemaReferencesForDomain.delete(coreDomainAndSchemaNames.schema);
            }
        }
    }
    async findExistingSchemas(allReferencedSchemaMap) {
        const schemaNames = [];
        const coreDomainAndSchemaNamesBySchemaName = new Map();
        for (const [domainName, allReferencedSchemasForDomain] of allReferencedSchemaMap) {
            for (const [coreSchemaName, referencedSchema] of allReferencedSchemasForDomain) {
                const schemaName = this.dbSchemaUtils.getSchemaName(referencedSchema);
                schemaNames.push(schemaName);
                coreDomainAndSchemaNamesBySchemaName.set(schemaName, {
                    domain: domainName,
                    schema: coreSchemaName
                });
            }
        }
        let existingSchemaMapByName;
        if (schemaNames.length) {
            existingSchemaMapByName = new Map();
        }
        else {
            existingSchemaMapByName = await (await this.schemaDao.get()).findMapByNames(schemaNames);
        }
        return {
            coreDomainAndSchemaNamesBySchemaName,
            existingSchemaMapByName
        };
    }
    hasReferences(referencedSchemaMap) {
        for (const referencesForDomain of referencedSchemaMap.values()) {
            for (const _ of referencesForDomain) {
                return true;
            }
        }
        return false;
    }
}
exports.SchemaChecker = SchemaChecker;
di_1.DI.set(diTokens_1.SCHEMA_CHECKER, SchemaChecker);
//# sourceMappingURL=SchemaChecker.js.map