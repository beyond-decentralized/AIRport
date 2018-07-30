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
const air_control_1 = require("@airport/air-control");
const territory_1 = require("@airport/territory");
const traffic_pattern_1 = require("@airport/traffic-pattern");
const typedi_1 = require("typedi");
const Inject_1 = require("typedi/decorators/Inject");
const lib_1 = require("zipson/lib");
const InjectionTokens_1 = require("../../../InjectionTokens");
const SyncInUtils_1 = require("../SyncInUtils");
let SyncInSchemaChecker = class SyncInSchemaChecker {
    constructor(domainDao, schemaDao, schemaVersionDao, utils) {
        this.domainDao = domainDao;
        this.schemaDao = schemaDao;
        this.schemaVersionDao = schemaVersionDao;
        this.utils = utils;
    }
    async checkSchemas(dataMessages) {
        const schemaNameSet = new Set();
        const schemaDomainNameSet = new Set();
        const dataMessagesWithInvalidSchemas = [];
        // Build schema name and domainName sets
        for (const message of dataMessages) {
            message.data = lib_1.parse(message.data);
            if (!this.verifyRTBSchemaConsistency(message)) {
                dataMessagesWithInvalidSchemas.push(message);
                continue;
            }
            for (const schemaVersion of message.data.schemaVersions) {
                schemaDomainNameSet.add(schemaVersion.schema.domain.name);
                schemaNameSet.add(schemaVersion.schema.name);
            }
        }
        const domainNames = Array.from(schemaDomainNameSet);
        const domainMapByName = await this.domainDao.findMapByNameWithNames(domainNames);
        const foundDomainNames = Array.from(domainMapByName.keys());
        let maxVersionedMapBySchemaAndDomainNames = new Map();
        if (foundDomainNames.length) {
            await this.schemaVersionDao.findMaxVersionedMapBySchemaAndDomainNames(foundDomainNames, Array.from(schemaNameSet));
        }
        const { dataMessagesWithCompatibleSchemas, dataMessagesWithIncompatibleSchemas, dataMessagesToBeUpgraded, missingDomainMap, missingSchemaMap, 
        // repoTransBlockMissingSchemas,
        // repoTransBlockSchemasToBeUpgraded,
        // schemasToBeUpgradedMap,
        schemasWithChangesMap } = this.groupMessagesAndSchemasBySchemaState(dataMessages, domainMapByName, maxVersionedMapBySchemaAndDomainNames);
        const missingSchemaMap = await this.recordSchemasToBeAddedAndUpgraded(schemasToBeUpgradedMap, missingSchemaMap);
        // const schemasWithChangesMap
        // 	= this.mergeSchemaMaps(missingSchemaMap, schemasToBeUpgradedMap);
        // const allSchemaMap
        // 	= this.mergeSchemaMaps(maxVersionedMapBySchemaAndDomainNames, schemasWithChangesMap);
        return {
            dataMessagesWithCompatibleSchemas,
            dataMessagesWithIncompatibleSchemas,
            dataMessagesWithInvalidSchemas,
            dataMessagesToBeUpgraded,
            maxVersionedMapBySchemaAndDomainNames
        };
    }
    groupMessagesAndSchemasBySchemaState(dataMessages, domainMapByName, maxVersionedMapBySchemaAndDomainNames) {
        const dataMessagesWithIncompatibleSchemas = [];
        const dataMessagesWithCompatibleSchemas = [];
        const schemasToBeUpgradedMap = new Map();
        const missingDomainMap = new Map();
        const missingSchemaMap = new Map();
        const dataMessagesToBeUpgraded = [];
        // split messages by the status of the schemas in them
        for (const message of dataMessages) {
            let allMessageSchemasAreCompatible = true;
            let messageBuildWithOutdatedSchemaVersions = false;
            // for every schema (at a given version) used in the message
            for (const schemaVersion of message.data.schemaVersions) {
                const schema = schemaVersion.schema;
                const domain = schema.domain;
                const existingDomain = domainMapByName.get(domain.name);
                const maxVersionedMapBySchemaName = maxVersionedMapBySchemaAndDomainNames.get(domain.name);
                // If the domain of the message schema is not present in this TM
                if (!maxVersionedMapBySchemaName) {
                    const missingDomain = {
                        name: domain.name
                    };
                    missingDomainMap.set(domain.name, missingDomain);
                    this.utils.ensureChildJsMap(missingSchemaMap, domain.name)
                        .set(schema.name, {
                        domain: missingDomain,
                        name: schema.name
                    });
                    allMessageSchemasAreCompatible = false;
                    continue;
                }
                const maxSchemaVersion = maxVersionedMapBySchemaName.get(schema.name);
                // If the schema of the message is not present in this TM
                if (!maxSchemaVersion) {
                    this.utils.ensureChildJsMap(missingSchemaMap, domain.name)
                        .set(schema.name, {
                        domain: domain,
                        name: schema.name
                    });
                    this.utils.ensureChildJsMap(missingSchemaMap, schema.domainName)
                        .set(schema.name);
                    allMessageSchemasAreCompatible = false;
                    continue;
                }
                switch (this.compareSchemaVersions(schemaVersion, maxSchemaVersion)) {
                    case SyncInUtils_1.SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_LOWER:
                        messageBuildWithOutdatedSchemaVersions = true;
                        break;
                    case SyncInUtils_1.SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_HIGHER:
                        this.utils.ensureChildJsMap(schemasToBeUpgradedMap, schema.domainName)
                            .set(schema.name, schema);
                        allMessageSchemasAreCompatible = false;
                        break;
                }
            }
            if (!allMessageSchemasAreCompatible) {
                dataMessagesWithIncompatibleSchemas.push(message);
            }
            else if (messageBuildWithOutdatedSchemaVersions) {
                dataMessagesToBeUpgraded.push(message);
            }
            else {
                dataMessagesWithCompatibleSchemas.push(message);
            }
        }
        return {
            dataMessagesToBeUpgraded,
            dataMessgesWithCompatibleSchemas,
            dataMessagesWithIncompatibleSchemas,
            missingSchemaMap: missingSchemaNameMap,
            schemasToBeUpgradedMap
        };
    }
    verifyRTBSchemaConsistency(dataMessage) {
        const data = dataMessage.data;
        const domainMapById = new Map();
        const domainMapByName = new Map();
        for (const domain of data.domains) {
            if (domainMapById.has(domain.id)) {
                return false;
            }
            if (domainMapByName.has(domain.name)) {
                return false;
            }
            domainMapById.set(domain.id, domain);
            domainMapByName.set(domain.name, domain);
        }
        const schemaMapByIndex = new Map();
        for (const schema of data.schemas) {
            if (schemaMapByIndex.has(schema.index)) {
                return false;
            }
            if (!domainMapById.has(schema.domain.id)) {
                return false;
            }
            schema.domain = domainMapById.get(schema.domain.id);
            schemaMapByIndex.set(schema.index, schema);
        }
        const schemaVersionSet = new Set();
        for (const schemaVersion of data.schemaVersions) {
            const schemaVersionIdAlreadyDefinedInRTB = schemaVersionSet.has(schemaVersion.id);
            if (schemaVersionIdAlreadyDefinedInRTB) {
                return false;
            }
            if (!schemaMapByIndex.has(schemaVersion.schema.index)) {
                return false;
            }
            schemaVersion.schema = schemaMapByIndex.get(schemaVersion.schema.index);
            const schema = schemaVersion.schema;
            schemaVersionSet.add(schemaVersion.id);
        }
        return true;
    }
    /**
     * Record which schemas will have to be added to this TM or upgraded to a later version.
     *
     * Schemas to be upgraded change status to NEEDS_UPGRADES.  New records are created for
     * missing schemas.
     *
     * @param {Map<SchemaDomainName, Map<SchemaName, ISchema>>} schemasToBeUpgradedMap
     * @param {Map<SchemaDomainName, Set<SchemaName>>} missingSchemaMap
     * @returns {Promise<void>}
     */
    async recordSchemasToBeAddedAndUpgraded(schemasToBeUpgradedMap, missingSchemaMap) {
        // All local (TM) indexes of schemas that need to be upgraded
        const schemaIndexesToUpdateStatusBy = [];
        for (const schemaMapByName of schemasToBeUpgradedMap.values()) {
            for (const schema of schemaMapByName.values()) {
                schemaIndexesToUpdateStatusBy.push(schema.index);
            }
        }
        await this.schemaDao.setStatusByIndexes(schemaIndexesToUpdateStatusBy, traffic_pattern_1.SchemaStatus.NEEDS_UPGRADES);
        // All schemas needed (that do not yet exist in this TM)
        const newlyNeededSchemas = [];
        for (const [domainName, schemaMapForDomain] of missingSchemaMap) {
            for (const name of schemaMapForDomain) {
                const schema = {
                    domainName,
                    name,
                    status: traffic_pattern_1.SchemaStatus.MISSING
                };
                missingSchemaDomainMap.set(name, schema);
                newlyNeededSchemas.push(schema);
            }
        }
        await this.schemaDao.bulkCreate(newlyNeededSchemas, false, false);
        return missingSchemaMap;
    }
    mergeSchemaMaps(schemaMap1, schemaMap2) {
        const mergedSchemaMap = new Map();
        this.copySchemaMap(schemaMap1, mergedSchemaMap);
        this.copySchemaMap(schemaMap2, mergedSchemaMap);
        return mergedSchemaMap;
    }
    copySchemaMap(sourceMap, targetMap) {
        for (const [schemaDomainName, schemaMapByName] of sourceMap) {
            const targetSchemaMapByName = this.utils.ensureChildJsMap(targetMap, schemaDomainName);
            for (const [schemaName, schema] of schemaMapByName) {
                targetSchemaMapByName.set(schemaName, schema);
            }
        }
    }
    compareSchemaVersions(messageSchemaVersion, maxSchemaVersionView) {
        const majorVersionComparison = this.compareGivenSchemaVersionLevel(messageSchemaVersion.majorVersion, maxSchemaVersionView.majorVersion);
        if (majorVersionComparison) {
            return majorVersionComparison;
        }
        const minorVersionComparison = this.compareGivenSchemaVersionLevel(messageSchemaVersion.minorVersion, maxSchemaVersionView.minorVersion);
        if (minorVersionComparison) {
            return minorVersionComparison;
        }
        return this.compareGivenSchemaVersionLevel(messageSchemaVersion.patchVersion, maxSchemaVersionView.patchVersion);
    }
    compareGivenSchemaVersionLevel(messageSchemaVersion, localSchemaVersion) {
        if (messageSchemaVersion < localSchemaVersion) {
            return SyncInUtils_1.SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_LOWER;
        }
        if (messageSchemaVersion > localSchemaVersion) {
            return SyncInUtils_1.SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_HIGHER;
        }
        return SyncInUtils_1.SchemaComparisonResult.MESSAGE_SCHEMA_VERSION_IS_EQUAL;
    }
};
SyncInSchemaChecker = __decorate([
    typedi_1.Service(InjectionTokens_1.SyncInSchemaCheckerToken),
    __param(0, Inject_1.Inject(territory_1.DomainDaoToken)),
    __param(1, Inject_1.Inject(traffic_pattern_1.SchemaDaoToken)),
    __param(2, Inject_1.Inject(traffic_pattern_1.SchemaVersionDaoToken)),
    __param(3, Inject_1.Inject(air_control_1.UtilsToken)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], SyncInSchemaChecker);
exports.SyncInSchemaChecker = SyncInSchemaChecker;
//# sourceMappingURL=SyncInSchemaChecker.js.map