var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ApplicationStatus, ensureChildArray, ensureChildJsSet, } from '@airport/ground-control';
import { Inject, Injected } from '@airport/direction-indicator';
let ApplicationComposer = class ApplicationComposer {
    async compose(jsonApplications, context) {
        // NOTE: application name contains domain name as a prefix
        const jsonApplicationMapByFullName = new Map();
        const terminalStore = context.terminalStore;
        const allDomains = terminalStore.getDomains().slice();
        const domainMapByName = new Map();
        for (const domain of allDomains) {
            domainMapByName.set(domain.name, domain);
        }
        const allApplications = terminalStore.getApplications().slice();
        // NOTE: application fullName contains domain name as a prefix
        const applicationMapByFullName = new Map();
        for (const application of allApplications) {
            applicationMapByFullName.set(application.fullName, application);
        }
        const newLatestApplicationVersions = [];
        const newApplicationVersionMapByApplication_Name = new Map();
        const newEntitiesMapByApplication_Name = new Map();
        const newPropertiesMap = new Map();
        const newRelationsMap = new Map();
        const newColumnsMap = new Map();
        const added = {
            columns: [],
            domains: [],
            entities: [],
            latestApplicationVersions: [],
            properties: [],
            propertyColumns: [],
            relationColumns: [],
            relations: [],
            applicationReferences: [],
            applications: [],
            applicationVersions: []
        };
        const allApplicationVersionsByIds = [...terminalStore.getAllApplicationVersionsByIds()];
        const all = {
            columns: [],
            domains: [],
            entities: [],
            latestApplicationVersions: [],
            properties: [],
            propertyColumns: [],
            relationColumns: [],
            relations: [],
            applicationReferences: [],
            applications: [],
            applicationVersions: [] //
        };
        const allDdlObjects = {
            all,
            allApplicationVersionsByIds,
            added
        };
        for (const jsonApplication of jsonApplications) {
            jsonApplicationMapByFullName.set(this.dbApplicationUtils.
                getFullApplication_Name(jsonApplication), jsonApplication);
            const domain = await this.composeDomain(jsonApplication.domain, allDomains, added.domains, domainMapByName);
            const application = this.composeApplication(domain, jsonApplication, allApplications, added.applications, applicationMapByFullName);
            this.composeApplicationVersion(jsonApplication, application, newLatestApplicationVersions, added.applicationVersions, newApplicationVersionMapByApplication_Name);
        }
        const { newApplicationReferenceMap, newApplicationReferences } = await this.composeApplicationReferences(jsonApplicationMapByFullName, newApplicationVersionMapByApplication_Name, terminalStore, allDdlObjects, context.deepTraverseReferences);
        added.applicationReferences = newApplicationReferences;
        for (const applicationVersion of allApplicationVersionsByIds) {
            if (applicationVersion) {
                this.addApplicationVersionObjects(applicationVersion, all);
            }
        }
        for (const jsonApplication of jsonApplications) {
            const fullApplication_Name = this.dbApplicationUtils.
                getFullApplication_Name(jsonApplication);
            jsonApplicationMapByFullName.set(fullApplication_Name, jsonApplication);
            const domain = domainMapByName.get(jsonApplication.domain);
            const application = applicationMapByFullName.get(this.dbApplicationUtils.
                getFullApplication_Name(jsonApplication));
            if (!application.index) {
                jsonApplication.lastIds = {
                    ...this.terminalStore.getLastIds()
                };
                application.index = ++this.terminalStore.getLastIds().applications;
            }
            if (!domain._localId) {
                domain._localId = ++this.terminalStore.getLastIds().domains;
            }
            const applicationVersion = newApplicationVersionMapByApplication_Name.get(application.fullName);
            if (!applicationVersion._localId) {
                applicationVersion._localId = ++this.terminalStore.getLastIds().applicationVersions;
                applicationVersion.jsonApplication = jsonApplication;
            }
            this.composeApplicationEntities(jsonApplication, applicationVersion, newEntitiesMapByApplication_Name, added.entities);
            this.composeApplicationProperties(jsonApplication, added.properties, newPropertiesMap, newEntitiesMapByApplication_Name);
            await this.composeApplicationRelations(jsonApplication, added.relations, newRelationsMap, newEntitiesMapByApplication_Name, newPropertiesMap, newApplicationReferenceMap, terminalStore, allDdlObjects);
            this.composeApplicationColumns(jsonApplication, added.columns, newColumnsMap, added.propertyColumns, newEntitiesMapByApplication_Name, newPropertiesMap);
            await this.composeApplicationRelationColumns(jsonApplication, added.relationColumns, newApplicationVersionMapByApplication_Name, newApplicationReferenceMap, newRelationsMap, newColumnsMap, terminalStore, allDdlObjects);
        }
        this.addObjects(allDdlObjects.added, allDdlObjects.all);
        for (const applicationVersion of allDdlObjects.all.applicationVersions) {
            allDdlObjects.allApplicationVersionsByIds[applicationVersion._localId] = applicationVersion;
        }
        return allDdlObjects;
    }
    async getExistingLatestApplicationVersion(referencedApplication_Name, allDdlObjects) {
        for (const latestApplicationVersion of allDdlObjects.all.latestApplicationVersions) {
            if (latestApplicationVersion.application.fullName == referencedApplication_Name) {
                return latestApplicationVersion;
            }
        }
        throw new Error(`Cannot find application "${referencedApplication_Name}".`);
    }
    addApplicationVersionObjects(applicationVersion, ddlObjects) {
        let foundDomain = false;
        for (const domain of ddlObjects.domains) {
            if (domain.name === applicationVersion.application.domain.name) {
                foundDomain = true;
                break;
            }
        }
        if (!foundDomain) {
            ddlObjects.domains.push(applicationVersion.application.domain);
        }
        let foundApplication = false;
        for (const application of ddlObjects.applications) {
            if (application.domain === applicationVersion.application.domain
                && application.name === applicationVersion.application.name) {
                foundApplication = true;
                break;
            }
        }
        if (!foundApplication) {
            ddlObjects.applications.push(applicationVersion.application);
        }
        ddlObjects.applicationVersions.push(applicationVersion);
        ddlObjects.latestApplicationVersions.push(applicationVersion);
        ddlObjects.applicationReferences = ddlObjects.applicationReferences
            .concat(applicationVersion.references);
        ddlObjects.entities = ddlObjects.entities.concat(applicationVersion.entities);
        for (const entity of applicationVersion.entities) {
            ddlObjects.columns = ddlObjects.columns.concat(entity.columns);
            ddlObjects.properties = ddlObjects.properties.concat(entity.properties);
            let entityPropertyColumns = [];
            for (const property of entity.properties) {
                entityPropertyColumns = entityPropertyColumns
                    .concat(property.propertyColumns);
            }
            ddlObjects.propertyColumns = ddlObjects.propertyColumns
                .concat(entityPropertyColumns);
            ddlObjects.relations = ddlObjects.relations.concat(entity.relations);
            let entityRelationColumns = [];
            for (const relation of entity.relations) {
                entityRelationColumns = entityRelationColumns
                    .concat(relation.manyRelationColumns);
            }
            ddlObjects.relationColumns = ddlObjects.relationColumns
                .concat(entityRelationColumns);
        }
    }
    addObjects(fromObjects, toObjects) {
        toObjects.columns = toObjects.columns.concat(fromObjects.columns);
        for (const fromDomain of fromObjects.domains) {
            let foundDomain = false;
            for (const toDomain of toObjects.domains) {
                if (toDomain.name === fromDomain.name) {
                    foundDomain = true;
                    break;
                }
            }
            if (!foundDomain) {
                toObjects.domains.push(fromDomain);
            }
        }
        toObjects.entities = toObjects.entities.concat(fromObjects.entities);
        toObjects.latestApplicationVersions = toObjects.latestApplicationVersions
            .concat(fromObjects.latestApplicationVersions);
        toObjects.properties = toObjects.properties.concat(fromObjects.properties);
        toObjects.propertyColumns = toObjects.propertyColumns
            .concat(fromObjects.propertyColumns);
        toObjects.relationColumns = toObjects.relationColumns
            .concat(fromObjects.relationColumns);
        toObjects.relations = toObjects.relations.concat(fromObjects.relations);
        for (const fromApplication of fromObjects.applications) {
            let foundApplication = false;
            for (const toApplication of toObjects.applications) {
                if (toApplication.domain === fromApplication.domain
                    && toApplication.name === fromApplication.name) {
                    foundApplication = true;
                    break;
                }
            }
            if (!foundApplication) {
                toObjects.applications.push(fromApplication);
            }
        }
        toObjects.applicationReferences = toObjects.applicationReferences
            .concat(fromObjects.applicationReferences);
        toObjects.applicationVersions = toObjects.applicationVersions
            .concat(fromObjects.applicationVersions);
    }
    async composeDomain(domainName, allDomains, newDomains, domainMapByName) {
        let domain = await this.domainRetriever.retrieveDomain(domainName, domainMapByName, allDomains, newDomains);
        if (!domain) {
            domain = {
                _localId: null,
                name: domainName,
                applications: []
            };
            allDomains.push(domain);
            newDomains.push(domain);
            domainMapByName.set(domainName, domain);
        }
        return domain;
    }
    composeApplication(domain, jsonApplication, allApplications, newApplications, applicationMapByFullName) {
        const fullApplication_Name = this.dbApplicationUtils.
            getFullApplication_Name(jsonApplication);
        let application = applicationMapByFullName.get(fullApplication_Name);
        if (!application) {
            application = {
                domain,
                index: null,
                fullName: fullApplication_Name,
                name: jsonApplication.name,
                scope: 'public',
                signature: 'localhost',
                status: ApplicationStatus.CURRENT,
            };
            allApplications.push(application);
            newApplications.push(application);
            applicationMapByFullName.set(fullApplication_Name, application);
        }
        return application;
    }
    composeApplicationVersion(jsonApplication, application, newLatestApplicationVersions, newApplicationVersions, newApplicationVersionMapByApplication_Name) {
        // Application versions are guaranteed to be new
        let newApplicationVersion;
        for (const applicationVersion of jsonApplication.versions) {
            const versionParts = applicationVersion.versionString.split('.');
            newApplicationVersion = {
                _localId: null,
                integerVersion: applicationVersion.integerVersion,
                versionString: applicationVersion.versionString,
                majorVersion: parseInt(versionParts[0]),
                minorVersion: parseInt(versionParts[1]),
                patchVersion: parseInt(versionParts[2]),
                application,
                jsonApplication,
                entities: [],
                references: [],
                referencedBy: [],
                entityMapByName: {},
                referencesMapByName: {},
                referencedByMapByName: {},
            };
            if (application.versions) {
                application.versions.push(newApplicationVersion);
            }
            else {
                application.versions = [newApplicationVersion];
            }
            newApplicationVersions.push(newApplicationVersion);
        }
        let newApplicationCurrentVersion = {
            application,
            applicationVersion: newApplicationVersion
        };
        // needed for normalOperation only
        application.currentVersion = [newApplicationCurrentVersion];
        newLatestApplicationVersions.push(newApplicationVersion);
        newApplicationVersionMapByApplication_Name.set(application.fullName, newApplicationVersion);
        return newApplicationVersion;
    }
    async composeApplicationReferences(jsonApplicationMapByName, newApplicationVersionMapByApplication_Name, terminalStore, allDdlObjects, deepTraverseReferences) {
        const newApplicationReferenceMap = new Map();
        const newApplicationReferenceLookup = new Map();
        const newApplicationReferences = [];
        for (const [applicationName, ownApplicationVersion] of newApplicationVersionMapByApplication_Name) {
            const application = ownApplicationVersion.application;
            const jsonApplication = jsonApplicationMapByName.get(application.fullName);
            const lastJsonApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
            const applicationReferences = ensureChildArray(newApplicationReferenceMap, applicationName);
            const applicationReferenceLookup = ensureChildJsSet(newApplicationReferenceLookup, applicationName);
            for (const jsonReferencedApplication of lastJsonApplicationVersion.referencedApplications) {
                const referencedFullApplication_Name = this.dbApplicationUtils.
                    getFullApplication_Name(jsonReferencedApplication);
                let referencedApplicationVersion = newApplicationVersionMapByApplication_Name.get(referencedFullApplication_Name);
                if (!referencedApplicationVersion) {
                    referencedApplicationVersion = await this.applicationLocator.locateLatestApplicationVersionByApplication_Name(referencedFullApplication_Name, terminalStore);
                    if (!referencedApplicationVersion) {
                        throw new Error(`Could not locate application:
						${referencedFullApplication_Name}
						in either existing applications or applications being currently processed`);
                    }
                    this.addApplicationVersionObjects(referencedApplicationVersion, allDdlObjects.all);
                    if (deepTraverseReferences) {
                        // This should cause another iteration over the outer loop to process newly added ApplicationVersion
                        jsonApplicationMapByName.set(referencedFullApplication_Name, referencedApplicationVersion.jsonApplication);
                        newApplicationVersionMapByApplication_Name.set(referencedFullApplication_Name, referencedApplicationVersion);
                    }
                }
                const applicationReference = {
                    index: jsonReferencedApplication.index,
                    ownApplicationVersion,
                    referencedApplicationVersion
                };
                if (!applicationReferenceLookup.has(jsonReferencedApplication.index)) {
                    applicationReferenceLookup.add(jsonReferencedApplication.index);
                    newApplicationReferences.push(applicationReference);
                    applicationReferences.push(applicationReference);
                }
            }
        }
        return {
            newApplicationReferenceMap,
            newApplicationReferences
        };
    }
    composeApplicationEntities(jsonApplication, applicationVersion, newEntitiesMapByApplication_Name, newEntities) {
        const applicationName = this.dbApplicationUtils.
            getFullApplication_Name(jsonApplication);
        let index = 0;
        // TODO: verify that jsonApplication.versions is always ordered ascending
        const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const jsonEntities = currentApplicationVersion.entities;
        const newApplicationEntities = [];
        for (const jsonEntity of jsonEntities) {
            const entity = {
                _localId: ++this.terminalStore.getLastIds().entities,
                index: index++,
                applicationVersion,
                isLocal: jsonEntity.isLocal,
                isAirEntity: jsonEntity.isAirEntity,
                name: jsonEntity.name,
                tableConfig: jsonEntity.tableConfig,
                // columns: [],
                // columnMap: {},
                // idColumns: [],
                // idColumnMap: {},
                // relations: [],
                // properties: [],
                // propertyMap: {}
            };
            // applicationVersion.entities.push(entity)
            newApplicationEntities.push(entity);
            newEntities.push(entity);
        }
        newEntitiesMapByApplication_Name.set(applicationName, newApplicationEntities);
        applicationVersion.entities = newApplicationEntities;
    }
    composeApplicationProperties(jsonApplication, newProperties, newPropertiesMap, newEntitiesMapByApplication_Name) {
        const applicationName = this.dbApplicationUtils.
            getFullApplication_Name(jsonApplication);
        const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const jsonEntities = currentApplicationVersion.entities;
        const entities = newEntitiesMapByApplication_Name.get(applicationName);
        const propertiesByEntityIndex = ensureChildArray(newPropertiesMap, applicationName);
        jsonEntities.forEach((jsonEntity, tableIndex) => {
            const entity = entities[tableIndex];
            const propertiesForEntity = [];
            propertiesByEntityIndex[tableIndex]
                = propertiesForEntity;
            let index = 0;
            for (const jsonProperty of jsonEntity.properties) {
                const property = {
                    _localId: ++this.terminalStore.getLastIds().properties,
                    index,
                    entity,
                    name: jsonProperty.name,
                    isId: jsonProperty.isId,
                };
                propertiesForEntity[index] = property;
                index++;
                newProperties.push(property);
            }
        });
    }
    async composeApplicationRelations(jsonApplication, newRelations, newRelationsMap, newEntitiesMapByApplication_Name, newPropertiesMap, newApplicationReferenceMap, terminalStore, allDdlObjects) {
        const applicationName = this.dbApplicationUtils.
            getFullApplication_Name(jsonApplication);
        const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const jsonEntities = currentApplicationVersion.entities;
        const entitiesForApplication = newEntitiesMapByApplication_Name.get(applicationName);
        const propertiesByEntityIndex = newPropertiesMap.get(applicationName);
        const relationsByEntityIndex = ensureChildArray(newRelationsMap, applicationName);
        const referencesForApplication = newApplicationReferenceMap.get(applicationName);
        for (let tableIndex = 0; tableIndex < jsonEntities.length; tableIndex++) {
            const jsonEntity = jsonEntities[tableIndex];
            const propertiesForEntity = propertiesByEntityIndex[tableIndex];
            const relationsForEntity = [];
            relationsByEntityIndex[tableIndex]
                = relationsForEntity;
            const entity = entitiesForApplication[tableIndex];
            let index = 0;
            const relations = [];
            for (const jsonRelation of jsonEntity.relations) {
                const property = propertiesForEntity[jsonRelation.propertyRef.index];
                let referencedApplication_Name = applicationName;
                if (jsonRelation.relationTableApplication_Index
                    || jsonRelation.relationTableApplication_Index === 0) {
                    const applicationReference = referencesForApplication[jsonRelation.relationTableApplication_Index];
                    referencedApplication_Name = applicationReference.referencedApplicationVersion.application.fullName;
                }
                let entitiesArray = newEntitiesMapByApplication_Name.get(referencedApplication_Name);
                if (!entitiesArray) {
                    const applicationVersion = await this.getExistingLatestApplicationVersion(referencedApplication_Name, allDdlObjects);
                    entitiesArray = applicationVersion.entities;
                }
                const relationEntity = entitiesArray[jsonRelation.relationTableIndex];
                const relation = {
                    entity,
                    _localId: ++terminalStore.getLastIds().relations,
                    index,
                    foreignKey: jsonRelation.foreignKey,
                    isId: property.isId,
                    manyToOneElems: jsonRelation.manyToOneElems,
                    property,
                    oneToManyElems: jsonRelation.oneToManyElems,
                    relationEntity,
                    relationType: jsonRelation.relationType,
                    // oneRelationColumns: [],
                    // manyRelationColumns: []
                };
                // property.relation               = [relation]
                // relationEntity.relations.push(relation)
                relationsForEntity[index] = relation;
                index++;
                relations.push(relation);
                newRelations.push(relation);
            }
        }
    }
    composeApplicationColumns(jsonApplication, newColumns, newColumnsMap, newPropertyColumns, newEntitiesMapByApplication_Name, newPropertiesMap) {
        const applicationName = this.dbApplicationUtils.
            getFullApplication_Name(jsonApplication);
        const columnsByTable = [];
        newColumnsMap.set(applicationName, columnsByTable);
        const entitiesForApplication = newEntitiesMapByApplication_Name.get(applicationName);
        const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const jsonEntities = currentApplicationVersion.entities;
        const propertiesForApplication = newPropertiesMap.get(applicationName);
        jsonEntities.forEach((jsonEntity, tableIndex) => {
            const entity = entitiesForApplication[tableIndex];
            const columnsForTable = [];
            columnsByTable[tableIndex] = columnsForTable;
            const idColumnIndexes = [];
            jsonEntity.idColumnRefs.forEach((idColumnRef, idColumnIndex) => {
                idColumnIndexes[idColumnRef.index] = idColumnIndex;
            });
            const propertiesForEntity = propertiesForApplication[tableIndex];
            jsonEntity.columns.forEach((jsonColumn, index) => {
                const idColumndIndex = idColumnIndexes[index];
                const column = {
                    allocationSize: jsonColumn.allocationSize,
                    entity,
                    _localId: ++this.terminalStore.getLastIds().columns,
                    idIndex: idColumndIndex,
                    index,
                    isGenerated: jsonColumn.isGenerated,
                    manyRelationColumns: [],
                    name: jsonColumn.name,
                    notNull: jsonColumn.notNull,
                    oneRelationColumns: [],
                    precision: jsonColumn.precision,
                    propertyColumns: [],
                    scale: jsonColumn.scale,
                    type: jsonColumn.type,
                };
                columnsForTable[index] = column;
                newColumns.push(column);
                jsonColumn.propertyRefs.forEach((propertyReference) => {
                    const property = propertiesForEntity[propertyReference.index];
                    const propertyColumn = {
                        column,
                        property
                    };
                    newPropertyColumns.push(propertyColumn);
                });
            });
        });
    }
    async composeApplicationRelationColumns(jsonApplication, newRelationColumns, newApplicationVersionMapByApplication_Name, newApplicationReferenceMap, newRelationsMap, newColumnsMap, terminalStore, allDdlObjects) {
        const applicationName = this.dbApplicationUtils.
            getFullApplication_Name(jsonApplication);
        const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const jsonEntities = currentApplicationVersion.entities;
        const columnsForApplication = newColumnsMap.get(applicationName);
        const relationsForApplication = newRelationsMap.get(applicationName);
        const applicationReferencesForApplication = newApplicationReferenceMap.get(applicationName);
        for (let tableIndex = 0; tableIndex < jsonEntities.length; tableIndex++) {
            const jsonEntity = jsonEntities[tableIndex];
            const columnsForEntity = columnsForApplication[tableIndex];
            const relationsForEntity = relationsForApplication[tableIndex];
            for (let index = 0; index < jsonEntity.columns.length; index++) {
                const jsonColumn = jsonEntity.columns[index];
                const manyColumn = columnsForEntity[index];
                const relationColumns = [];
                for (const jsonRelationColumn of jsonColumn.manyRelationColumnRefs) {
                    const manyRelation = relationsForEntity[jsonRelationColumn.manyRelationIndex];
                    // if (!manyRelation.manyRelationColumns) {
                    // 	manyRelation.manyRelationColumns = []
                    // }
                    let oneRelationApplicationVersion;
                    if (jsonRelationColumn.oneApplication_Index
                        || jsonRelationColumn.oneApplication_Index === 0) {
                        const applicationReference = applicationReferencesForApplication[jsonRelationColumn.oneApplication_Index];
                        oneRelationApplicationVersion = applicationReference.referencedApplicationVersion;
                    }
                    else {
                        oneRelationApplicationVersion = newApplicationVersionMapByApplication_Name.get(applicationName);
                    }
                    const referencedApplication_Name = oneRelationApplicationVersion.application.fullName;
                    const oneTableColumnsMapForApplication = newColumnsMap.get(referencedApplication_Name);
                    let oneTableColumns;
                    let oneTableRelations;
                    if (oneTableColumnsMapForApplication) {
                        oneTableColumns = oneTableColumnsMapForApplication[jsonRelationColumn.oneTableIndex];
                        oneTableRelations = newRelationsMap.get(oneRelationApplicationVersion.application.fullName)[jsonRelationColumn.oneTableIndex];
                    }
                    else {
                        const applicationVersion = await this.getExistingLatestApplicationVersion(referencedApplication_Name, allDdlObjects);
                        const entitiesArray = applicationVersion.entities;
                        const entity = entitiesArray[jsonRelationColumn.oneTableIndex];
                        oneTableColumns = entity.columns;
                        oneTableRelations = entity.relations;
                    }
                    const oneColumn = oneTableColumns[jsonRelationColumn.oneColumnIndex];
                    // if (!jsonRelationColumn.oneApplication_Index
                    // 	&& !oneColumn.oneRelationColumns) {
                    // 	oneColumn.oneRelationColumns = []
                    // }
                    const oneRelation = oneTableRelations[jsonRelationColumn.oneRelationIndex];
                    // if (!jsonRelationColumn.oneApplication_Index
                    // 	&& !oneRelation.oneRelationColumns) {
                    // 	oneRelation.oneRelationColumns = []
                    // }
                    const relationColumn = {
                        _localId: ++terminalStore.getLastIds().relationColumns,
                        manyColumn,
                        manyRelation,
                        oneColumn,
                        oneRelation,
                        // FIXME: figure out how to many OneToMany-only relations
                        parentRelation: manyRelation
                    };
                    // manyRelation.manyRelationColumns.push(relationColumn)
                    // if (!jsonRelationColumn.oneApplication_Index) {
                    // 	oneColumn.oneRelationColumns.push(relationColumn)
                    // 	oneRelation.oneRelationColumns.push(relationColumn)
                    // }
                    relationColumns.push(relationColumn);
                    newRelationColumns.push(relationColumn);
                }
                manyColumn.manyRelationColumns = []; // relationColumns
            }
        }
    }
};
__decorate([
    Inject()
], ApplicationComposer.prototype, "applicationLocator", void 0);
__decorate([
    Inject()
], ApplicationComposer.prototype, "dbApplicationUtils", void 0);
__decorate([
    Inject()
], ApplicationComposer.prototype, "domainRetriever", void 0);
__decorate([
    Inject()
], ApplicationComposer.prototype, "terminalStore", void 0);
ApplicationComposer = __decorate([
    Injected()
], ApplicationComposer);
export { ApplicationComposer };
//# sourceMappingURL=ApplicationComposer.js.map