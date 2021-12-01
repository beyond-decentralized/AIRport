import { DI } from '@airport/di';
import { ensureChildArray, getApplicationName, ApplicationStatus } from '@airport/ground-control';
import { APPLICATION_COMPOSER } from '../tokens';
export class ApplicationComposer {
    async compose(jsonApplications, ddlObjectRetriever, applicationLocator, terminalStore) {
        // FIXME: investigate if references here shoud be done by applicationSignatures and not DOMAIN_NAME___APPLICATION_NAME
        // NOTE: application name contains domain name as a prefix
        const jsonApplicationMapByName = new Map();
        const allDomains = terminalStore.getDomains().slice();
        const domainNameMapByName = new Map();
        for (const domain of allDomains) {
            domainNameMapByName.set(domain.name, domain);
        }
        const allApplications = terminalStore.getApplications().slice();
        // NOTE: application name contains domain name as a prefix
        const applicationMapByName = new Map();
        for (const application of allApplications) {
            applicationMapByName.set(application.name, application);
        }
        const newLatestApplicationVersions = [];
        // NOTE: application name contains domain name as a prefix
        const newApplicationVersionMapByApplicationName = new Map();
        // NOTE: application name contains domain name as a prefix
        const newEntitiesMapByApplicationName = new Map();
        // NOTE: application name contains domain name as a prefix
        const newPropertiesMap = new Map();
        // NOTE: application name contains domain name as a prefix
        const newRelationsMap = new Map();
        // NOTE: application name contains domain name as a prefix
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
            jsonApplicationMapByName.set(getApplicationName(jsonApplication), jsonApplication);
            const domain = this.composeDomain(jsonApplication.domain, allDomains, added.domains, domainNameMapByName);
            const application = this.composeApplication(domain, jsonApplication, allApplications, added.applications, applicationMapByName);
            this.composeApplicationVersion(jsonApplication, application, newLatestApplicationVersions, added.applicationVersions, newApplicationVersionMapByApplicationName);
        }
        const { newApplicationReferenceMap, newApplicationReferences } = await this.composeApplicationReferences(jsonApplicationMapByName, newApplicationVersionMapByApplicationName, applicationLocator, terminalStore, allDdlObjects);
        added.applicationReferences = newApplicationReferences;
        for (const applicationVersion of allApplicationVersionsByIds) {
            if (applicationVersion) {
                this.addApplicationVersionObjects(applicationVersion, all);
            }
        }
        for (const jsonApplication of jsonApplications) {
            const applicationNameWithDomainNamePrefix = getApplicationName(jsonApplication);
            jsonApplicationMapByName.set(applicationNameWithDomainNamePrefix, jsonApplication);
            const domain = domainNameMapByName.get(jsonApplication.domain);
            const application = applicationMapByName.get(getApplicationName(jsonApplication));
            if (!application.index) {
                const lastIds = {
                    ...ddlObjectRetriever.lastIds
                };
                jsonApplication.lastIds = lastIds;
                application.jsonApplication = jsonApplication;
                application.index = ++ddlObjectRetriever.lastIds.applications;
            }
            if (!domain.id) {
                domain.id = ++ddlObjectRetriever.lastIds.domains;
            }
            const applicationVersion = newApplicationVersionMapByApplicationName.get(application.name);
            if (!applicationVersion.id) {
                applicationVersion.id = ++ddlObjectRetriever.lastIds.applicationVersions;
            }
            this.composeApplicationEntities(jsonApplication, applicationVersion, newEntitiesMapByApplicationName, added.entities, ddlObjectRetriever);
            this.composeApplicationProperties(jsonApplication, added.properties, newPropertiesMap, newEntitiesMapByApplicationName, ddlObjectRetriever);
            await this.composeApplicationRelations(jsonApplication, added.relations, newRelationsMap, newEntitiesMapByApplicationName, newPropertiesMap, newApplicationReferenceMap, ddlObjectRetriever, terminalStore, allDdlObjects);
            this.composeApplicationColumns(jsonApplication, added.columns, newColumnsMap, added.propertyColumns, newEntitiesMapByApplicationName, newPropertiesMap, ddlObjectRetriever);
            await this.composeApplicationRelationColumns(jsonApplication, added.relationColumns, newApplicationVersionMapByApplicationName, newApplicationReferenceMap, newRelationsMap, newColumnsMap, ddlObjectRetriever, terminalStore, allDdlObjects);
        }
        this.addObjects(allDdlObjects.added, allDdlObjects.all);
        for (const applicationVersion of allDdlObjects.all.applicationVersions) {
            allDdlObjects.allApplicationVersionsByIds[applicationVersion.id] = applicationVersion;
        }
        return allDdlObjects;
    }
    async getExistingLatestApplicationVersion(referencedApplicationName, allDdlObjects) {
        for (const latestApplicationVersion of allDdlObjects.all.latestApplicationVersions) {
            if (latestApplicationVersion.application.name == referencedApplicationName) {
                return latestApplicationVersion;
            }
        }
        throw new Error(`Cannot find application "${referencedApplicationName}".`);
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
    composeDomain(domainName, allDomains, newDomains, domainNameMapByName) {
        let domain = domainNameMapByName.get(domainName);
        if (!domain) {
            domain = {
                id: null,
                name: domainName,
                applications: []
            };
            allDomains.push(domain);
            newDomains.push(domain);
            domainNameMapByName.set(domainName, domain);
        }
        return domain;
    }
    composeApplication(domain, jsonApplication, allApplications, newApplications, applicationMapByName) {
        const applicationName = getApplicationName(jsonApplication);
        let application = applicationMapByName.get(applicationName);
        if (!application) {
            application = {
                domain,
                index: null,
                jsonApplication: null,
                name: applicationName,
                packageName: jsonApplication.name,
                scope: 'public',
                status: ApplicationStatus.CURRENT,
            };
            allApplications.push(application);
            newApplications.push(application);
            applicationMapByName.set(applicationName, application);
        }
        return application;
    }
    composeApplicationVersion(jsonApplication, application, newLatestApplicationVersions, newApplicationVersions, newApplicationVersionMapByApplicationName) {
        // Application versions are guaranteed to be new
        let newApplicationVersion;
        for (const applicationVersion of jsonApplication.versions) {
            const versionParts = applicationVersion.versionString.split('.');
            newApplicationVersion = {
                id: null,
                integerVersion: applicationVersion.integerVersion,
                versionString: applicationVersion.versionString,
                majorVersion: parseInt(versionParts[0]),
                minorVersion: parseInt(versionParts[1]),
                patchVersion: parseInt(versionParts[2]),
                application,
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
        newApplicationVersionMapByApplicationName.set(application.name, newApplicationVersion);
        return newApplicationVersion;
    }
    async composeApplicationReferences(jsonApplicationMapByName, newApplicationVersionMapByApplicationName, applicationLocator, terminalStore, allDdlObjects) {
        const newApplicationReferenceMap = new Map();
        const newApplicationReferences = [];
        for (const [applicationName, ownApplicationVersion] of newApplicationVersionMapByApplicationName) {
            const application = ownApplicationVersion.application;
            const jsonApplication = jsonApplicationMapByName.get(application.name);
            const lastJsonApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
            const applicationReferences = ensureChildArray(newApplicationReferenceMap, applicationName);
            for (const jsonReferencedApplication of lastJsonApplicationVersion.referencedApplications) {
                const referencedApplicationName = getApplicationName(jsonReferencedApplication);
                let referencedApplicationVersion = newApplicationVersionMapByApplicationName.get(referencedApplicationName);
                if (!referencedApplicationVersion) {
                    referencedApplicationVersion = await applicationLocator.locateLatestApplicationVersionByApplicationName(referencedApplicationName, terminalStore);
                    if (!referencedApplicationVersion) {
                        throw new Error(`Could not locate application:
						${referencedApplicationName}
						in either existing applications or applications being currently processed`);
                    }
                    this.addApplicationVersionObjects(referencedApplicationVersion, allDdlObjects.all);
                }
                const applicationReference = {
                    index: jsonReferencedApplication.index,
                    ownApplicationVersion,
                    referencedApplicationVersion
                };
                newApplicationReferences.push(applicationReference);
                applicationReferences.push(applicationReference);
            }
        }
        return {
            newApplicationReferenceMap,
            newApplicationReferences
        };
    }
    composeApplicationEntities(jsonApplication, applicationVersion, newEntitiesMapByApplicationName, newEntities, ddlObjectRetriever) {
        const applicationName = getApplicationName(jsonApplication);
        let index = 0;
        // TODO: verify that jsonApplication.versions is always ordered ascending
        const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const jsonEntities = currentApplicationVersion.entities;
        const newApplicationEntities = [];
        for (const jsonEntity of jsonEntities) {
            const entity = {
                id: ++ddlObjectRetriever.lastIds.entities,
                index: index++,
                applicationVersion,
                isLocal: jsonEntity.isLocal,
                isRepositoryEntity: jsonEntity.isRepositoryEntity,
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
        newEntitiesMapByApplicationName.set(applicationName, newApplicationEntities);
        applicationVersion.entities = newApplicationEntities;
    }
    composeApplicationProperties(jsonApplication, newProperties, newPropertiesMap, newEntitiesMapByApplicationName, ddlObjectRetriever) {
        const applicationName = getApplicationName(jsonApplication);
        const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const jsonEntities = currentApplicationVersion.entities;
        const entities = newEntitiesMapByApplicationName.get(applicationName);
        const propertiesByEntityIndex = ensureChildArray(newPropertiesMap, applicationName);
        jsonEntities.forEach((jsonEntity, tableIndex) => {
            const entity = entities[tableIndex];
            const propertiesForEntity = [];
            propertiesByEntityIndex[tableIndex]
                = propertiesForEntity;
            let index = 0;
            for (const jsonProperty of jsonEntity.properties) {
                const property = {
                    id: ++ddlObjectRetriever.lastIds.properties,
                    index,
                    entity,
                    name: jsonProperty.name,
                    isId: jsonProperty.isId,
                    // propertyColumns: []
                };
                // entity.properties.push(property)
                // entity.propertyMap[property.name] = property
                propertiesForEntity[index] = property;
                index++;
                newProperties.push(property);
            }
        });
    }
    async composeApplicationRelations(jsonApplication, newRelations, newRelationsMap, newEntitiesMapByApplicationName, newPropertiesMap, newApplicationReferenceMap, ddlObjectRetriever, terminalStore, allDdlObjects) {
        const applicationName = getApplicationName(jsonApplication);
        const currentApplicationVersion = jsonApplication.versions[jsonApplication.versions.length - 1];
        const jsonEntities = currentApplicationVersion.entities;
        const entitiesForApplication = newEntitiesMapByApplicationName.get(applicationName);
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
                let referencedApplicationName = applicationName;
                if (jsonRelation.relationTableApplicationIndex
                    || jsonRelation.relationTableApplicationIndex === 0) {
                    const applicationReference = referencesForApplication[jsonRelation.relationTableApplicationIndex];
                    referencedApplicationName = applicationReference.referencedApplicationVersion.application.name;
                }
                let entitiesArray = newEntitiesMapByApplicationName.get(referencedApplicationName);
                if (!entitiesArray) {
                    const applicationVersion = await this.getExistingLatestApplicationVersion(referencedApplicationName, allDdlObjects);
                    entitiesArray = applicationVersion.entities;
                }
                const relationEntity = entitiesArray[jsonRelation.relationTableIndex];
                const relation = {
                    entity,
                    id: ++ddlObjectRetriever.lastIds.relations,
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
    composeApplicationColumns(jsonApplication, newColumns, newColumnsMap, newPropertyColumns, newEntitiesMapByApplicationName, newPropertiesMap, ddlObjectRetriever) {
        const applicationName = getApplicationName(jsonApplication);
        const columnsByTable = [];
        newColumnsMap.set(applicationName, columnsByTable);
        const entitiesForApplication = newEntitiesMapByApplicationName.get(applicationName);
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
                    id: ++ddlObjectRetriever.lastIds.columns,
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
                    // propertyColumns: [],
                    // oneRelationColumns: [],
                    // manyRelationColumns: []
                };
                columnsForTable[index] = column;
                newColumns.push(column);
                // entity.columns.push(column)
                // entity.columnMap[column.name] = column
                // if (idColumndIndex || idColumndIndex === 0) {
                // 	entity.idColumns[idColumndIndex] = column
                // 	entity.idColumnMap[column.name]  = column
                // }
                jsonColumn.propertyRefs.forEach((propertyReference) => {
                    const property = propertiesForEntity[propertyReference.index];
                    const propertyColumn = {
                        column,
                        property
                    };
                    newPropertyColumns.push(propertyColumn);
                    // column.propertyColumns.push(propertyColumn)
                    // property.propertyColumns.push(propertyColumn)
                });
            });
        });
    }
    async composeApplicationRelationColumns(jsonApplication, newRelationColumns, newApplicationVersionMapByApplicationName, newApplicationReferenceMap, newRelationsMap, newColumnsMap, ddlObjectRetriever, terminalStore, allDdlObjects) {
        const applicationName = getApplicationName(jsonApplication);
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
                    if (jsonRelationColumn.oneApplicationIndex
                        || jsonRelationColumn.oneApplicationIndex === 0) {
                        const applicationReference = applicationReferencesForApplication[jsonRelationColumn.oneApplicationIndex];
                        oneRelationApplicationVersion = applicationReference.referencedApplicationVersion;
                    }
                    else {
                        oneRelationApplicationVersion = newApplicationVersionMapByApplicationName.get(applicationName);
                    }
                    const referencedApplicationName = oneRelationApplicationVersion.application.name;
                    const oneTableColumnsMapForApplication = newColumnsMap.get(referencedApplicationName);
                    let oneTableColumns;
                    let oneTableRelations;
                    if (oneTableColumnsMapForApplication) {
                        oneTableColumns = oneTableColumnsMapForApplication[jsonRelationColumn.oneTableIndex];
                        oneTableRelations = newRelationsMap.get(oneRelationApplicationVersion.application.name)[jsonRelationColumn.oneTableIndex];
                    }
                    else {
                        const applicationVersion = await this.getExistingLatestApplicationVersion(referencedApplicationName, allDdlObjects);
                        const entitiesArray = applicationVersion.entities;
                        const entity = entitiesArray[jsonRelationColumn.oneTableIndex];
                        oneTableColumns = entity.columns;
                        oneTableRelations = entity.relations;
                    }
                    const oneColumn = oneTableColumns[jsonRelationColumn.oneColumnIndex];
                    // if (!jsonRelationColumn.oneApplicationIndex
                    // 	&& !oneColumn.oneRelationColumns) {
                    // 	oneColumn.oneRelationColumns = []
                    // }
                    const oneRelation = oneTableRelations[jsonRelationColumn.oneRelationIndex];
                    // if (!jsonRelationColumn.oneApplicationIndex
                    // 	&& !oneRelation.oneRelationColumns) {
                    // 	oneRelation.oneRelationColumns = []
                    // }
                    const relationColumn = {
                        id: ++ddlObjectRetriever.lastIds.relationColumns,
                        manyColumn,
                        manyRelation,
                        oneColumn,
                        oneRelation,
                        // FIXME: figure out how to many OneToMany-only relations
                        parentRelation: manyRelation
                    };
                    // manyRelation.manyRelationColumns.push(relationColumn)
                    // if (!jsonRelationColumn.oneApplicationIndex) {
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
}
DI.set(APPLICATION_COMPOSER, ApplicationComposer);
//# sourceMappingURL=ApplicationComposer.js.map