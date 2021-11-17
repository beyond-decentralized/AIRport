import { DI } from '@airport/di';
import { ensureChildArray, getSchemaName, SchemaStatus } from '@airport/ground-control';
import { SCHEMA_COMPOSER } from '../tokens';
export class SchemaComposer {
    async compose(jsonSchemas, ddlObjectRetriever, schemaLocator, terminalStore) {
        // FIXME: investigate if references here shoud be done by schemaSignatures and not DOMAIN_NAME___SCHEMA_NAME
        // NOTE: schema name contains domain name as a prefix
        const jsonSchemaMapByName = new Map();
        const allDomains = terminalStore.getDomains().slice();
        const domainNameMapByName = new Map();
        for (const domain of allDomains) {
            domainNameMapByName.set(domain.name, domain);
        }
        const allSchemas = terminalStore.getSchemas().slice();
        // NOTE: schema name contains domain name as a prefix
        const schemaMapByName = new Map();
        for (const schema of allSchemas) {
            schemaMapByName.set(schema.name, schema);
        }
        const newLatestSchemaVersions = [];
        // NOTE: schema name contains domain name as a prefix
        const newSchemaVersionMapBySchemaName = new Map();
        // NOTE: schema name contains domain name as a prefix
        const newEntitiesMapBySchemaName = new Map();
        // NOTE: schema name contains domain name as a prefix
        const newPropertiesMap = new Map();
        // NOTE: schema name contains domain name as a prefix
        const newRelationsMap = new Map();
        // NOTE: schema name contains domain name as a prefix
        const newColumnsMap = new Map();
        const added = {
            columns: [],
            domains: [],
            entities: [],
            latestSchemaVersions: [],
            properties: [],
            propertyColumns: [],
            relationColumns: [],
            relations: [],
            schemaReferences: [],
            schemas: [],
            schemaVersions: []
        };
        const allSchemaVersionsByIds = [...terminalStore.getAllSchemaVersionsByIds()];
        const all = {
            columns: [],
            domains: [],
            entities: [],
            latestSchemaVersions: [],
            properties: [],
            propertyColumns: [],
            relationColumns: [],
            relations: [],
            schemaReferences: [],
            schemas: [],
            schemaVersions: [] //
        };
        const allDdlObjects = {
            all,
            allSchemaVersionsByIds,
            added
        };
        for (const jsonSchema of jsonSchemas) {
            jsonSchemaMapByName.set(getSchemaName(jsonSchema), jsonSchema);
            const domain = this.composeDomain(jsonSchema.domain, allDomains, added.domains, domainNameMapByName);
            const schema = this.composeSchema(domain, jsonSchema, allSchemas, added.schemas, schemaMapByName);
            this.composeSchemaVersion(jsonSchema, schema, newLatestSchemaVersions, added.schemaVersions, newSchemaVersionMapBySchemaName);
        }
        const { newSchemaReferenceMap, newSchemaReferences } = await this.composeSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, schemaLocator, terminalStore, allDdlObjects);
        added.schemaReferences = newSchemaReferences;
        for (const schemaVersion of allSchemaVersionsByIds) {
            if (schemaVersion) {
                this.addSchemaVersionObjects(schemaVersion, all);
            }
        }
        for (const jsonSchema of jsonSchemas) {
            const schemaNameWithDomainNamePrefix = getSchemaName(jsonSchema);
            jsonSchemaMapByName.set(schemaNameWithDomainNamePrefix, jsonSchema);
            const domain = domainNameMapByName.get(jsonSchema.domain);
            const schema = schemaMapByName.get(getSchemaName(jsonSchema));
            if (!schema.index) {
                const lastIds = {
                    ...ddlObjectRetriever.lastIds
                };
                jsonSchema.lastIds = lastIds;
                schema.jsonSchema = jsonSchema;
                schema.index = ++ddlObjectRetriever.lastIds.schemas;
            }
            if (!domain.id) {
                domain.id = ++ddlObjectRetriever.lastIds.domains;
            }
            const schemaVersion = newSchemaVersionMapBySchemaName.get(schema.name);
            if (!schemaVersion.id) {
                schemaVersion.id = ++ddlObjectRetriever.lastIds.schemaVersions;
            }
            this.composeSchemaEntities(jsonSchema, schemaVersion, newEntitiesMapBySchemaName, added.entities, ddlObjectRetriever);
            this.composeSchemaProperties(jsonSchema, added.properties, newPropertiesMap, newEntitiesMapBySchemaName, ddlObjectRetriever);
            await this.composeSchemaRelations(jsonSchema, added.relations, newRelationsMap, newEntitiesMapBySchemaName, newPropertiesMap, newSchemaReferenceMap, ddlObjectRetriever, terminalStore, allDdlObjects);
            this.composeSchemaColumns(jsonSchema, added.columns, newColumnsMap, added.propertyColumns, newEntitiesMapBySchemaName, newPropertiesMap, ddlObjectRetriever);
            await this.composeSchemaRelationColumns(jsonSchema, added.relationColumns, newSchemaVersionMapBySchemaName, newSchemaReferenceMap, newRelationsMap, newColumnsMap, ddlObjectRetriever, terminalStore, allDdlObjects);
        }
        this.addObjects(allDdlObjects.added, allDdlObjects.all);
        for (const schemaVersion of allDdlObjects.all.schemaVersions) {
            allDdlObjects.allSchemaVersionsByIds[schemaVersion.id] = schemaVersion;
        }
        return allDdlObjects;
    }
    async getExistingLatestSchemaVersion(referencedSchemaName, allDdlObjects) {
        for (const latestSchemaVersion of allDdlObjects.all.latestSchemaVersions) {
            if (latestSchemaVersion.schema.name == referencedSchemaName) {
                return latestSchemaVersion;
            }
        }
        throw new Error(`Cannot find schema "${referencedSchemaName}".`);
    }
    addSchemaVersionObjects(schemaVersion, ddlObjects) {
        let foundDomain = false;
        for (const domain of ddlObjects.domains) {
            if (domain.name === schemaVersion.schema.domain.name) {
                foundDomain = true;
                break;
            }
        }
        if (!foundDomain) {
            ddlObjects.domains.push(schemaVersion.schema.domain);
        }
        let foundSchema = false;
        for (const schema of ddlObjects.schemas) {
            if (schema.domain === schemaVersion.schema.domain
                && schema.name === schemaVersion.schema.name) {
                foundSchema = true;
                break;
            }
        }
        if (!foundSchema) {
            ddlObjects.schemas.push(schemaVersion.schema);
        }
        ddlObjects.schemaVersions.push(schemaVersion);
        ddlObjects.latestSchemaVersions.push(schemaVersion);
        ddlObjects.schemaReferences = ddlObjects.schemaReferences
            .concat(schemaVersion.references);
        ddlObjects.entities = ddlObjects.entities.concat(schemaVersion.entities);
        for (const entity of schemaVersion.entities) {
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
        toObjects.latestSchemaVersions = toObjects.latestSchemaVersions
            .concat(fromObjects.latestSchemaVersions);
        toObjects.properties = toObjects.properties.concat(fromObjects.properties);
        toObjects.propertyColumns = toObjects.propertyColumns
            .concat(fromObjects.propertyColumns);
        toObjects.relationColumns = toObjects.relationColumns
            .concat(fromObjects.relationColumns);
        toObjects.relations = toObjects.relations.concat(fromObjects.relations);
        for (const fromSchema of fromObjects.schemas) {
            let foundSchema = false;
            for (const toSchema of toObjects.schemas) {
                if (toSchema.domain === fromSchema.domain
                    && toSchema.name === fromSchema.name) {
                    foundSchema = true;
                    break;
                }
            }
            if (!foundSchema) {
                toObjects.schemas.push(fromSchema);
            }
        }
        toObjects.schemaReferences = toObjects.schemaReferences
            .concat(fromObjects.schemaReferences);
        toObjects.schemaVersions = toObjects.schemaVersions
            .concat(fromObjects.schemaVersions);
    }
    composeDomain(domainName, allDomains, newDomains, domainNameMapByName) {
        let domain = domainNameMapByName.get(domainName);
        if (!domain) {
            domain = {
                id: null,
                name: domainName,
                schemas: []
            };
            allDomains.push(domain);
            newDomains.push(domain);
            domainNameMapByName.set(domainName, domain);
        }
        return domain;
    }
    composeSchema(domain, jsonSchema, allSchemas, newSchemas, schemaMapByName) {
        const schemaName = getSchemaName(jsonSchema);
        let schema = schemaMapByName.get(schemaName);
        if (!schema) {
            schema = {
                domain,
                index: null,
                jsonSchema: null,
                name: schemaName,
                packageName: jsonSchema.name,
                scope: 'public',
                status: SchemaStatus.CURRENT,
            };
            allSchemas.push(schema);
            newSchemas.push(schema);
            schemaMapByName.set(schemaName, schema);
        }
        return schema;
    }
    composeSchemaVersion(jsonSchema, schema, newLatestSchemaVersions, newSchemaVersions, newSchemaVersionMapBySchemaName) {
        // Schema versions are guaranteed to be new
        let newSchemaVersion;
        for (const schemaVersion of jsonSchema.versions) {
            const versionParts = schemaVersion.versionString.split('.');
            newSchemaVersion = {
                id: null,
                integerVersion: schemaVersion.integerVersion,
                versionString: schemaVersion.versionString,
                majorVersion: parseInt(versionParts[0]),
                minorVersion: parseInt(versionParts[1]),
                patchVersion: parseInt(versionParts[2]),
                schema,
                entities: [],
                references: [],
                referencedBy: [],
                entityMapByName: {},
                referencesMapByName: {},
                referencedByMapByName: {},
            };
            if (schema.versions) {
                schema.versions.push(newSchemaVersion);
            }
            else {
                schema.versions = [newSchemaVersion];
            }
            newSchemaVersions.push(newSchemaVersion);
        }
        let newSchemaCurrentVersion = {
            schema,
            schemaVersion: newSchemaVersion
        };
        // needed for normalOperation only
        schema.currentVersion = [newSchemaCurrentVersion];
        newLatestSchemaVersions.push(newSchemaVersion);
        newSchemaVersionMapBySchemaName.set(schema.name, newSchemaVersion);
        return newSchemaVersion;
    }
    async composeSchemaReferences(jsonSchemaMapByName, newSchemaVersionMapBySchemaName, schemaLocator, terminalStore, allDdlObjects) {
        const newSchemaReferenceMap = new Map();
        const newSchemaReferences = [];
        for (const [schemaName, ownSchemaVersion] of newSchemaVersionMapBySchemaName) {
            const schema = ownSchemaVersion.schema;
            const jsonSchema = jsonSchemaMapByName.get(schema.name);
            const lastJsonSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
            const schemaReferences = ensureChildArray(newSchemaReferenceMap, schemaName);
            for (const jsonReferencedSchema of lastJsonSchemaVersion.referencedSchemas) {
                const referencedSchemaName = getSchemaName(jsonReferencedSchema);
                let referencedSchemaVersion = newSchemaVersionMapBySchemaName.get(referencedSchemaName);
                if (!referencedSchemaVersion) {
                    referencedSchemaVersion = await schemaLocator.locateLatestSchemaVersionBySchemaName(referencedSchemaName, terminalStore);
                    if (!referencedSchemaVersion) {
                        throw new Error(`Could not locate schema:
						${referencedSchemaName}
						in either existing schemas or schemas being currently processed`);
                    }
                    this.addSchemaVersionObjects(referencedSchemaVersion, allDdlObjects.all);
                }
                const schemaReference = {
                    index: jsonReferencedSchema.index,
                    ownSchemaVersion,
                    referencedSchemaVersion
                };
                newSchemaReferences.push(schemaReference);
                schemaReferences.push(schemaReference);
            }
        }
        return {
            newSchemaReferenceMap,
            newSchemaReferences
        };
    }
    composeSchemaEntities(jsonSchema, schemaVersion, newEntitiesMapBySchemaName, newEntities, ddlObjectRetriever) {
        const schemaName = getSchemaName(jsonSchema);
        let index = 0;
        // TODO: verify that jsonSchema.versions is always ordered ascending
        const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
        const jsonEntities = currentSchemaVersion.entities;
        const newSchemaEntities = [];
        for (const jsonEntity of jsonEntities) {
            const entity = {
                id: ++ddlObjectRetriever.lastIds.entities,
                index: index++,
                schemaVersion,
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
            // schemaVersion.entities.push(entity)
            newSchemaEntities.push(entity);
            newEntities.push(entity);
        }
        newEntitiesMapBySchemaName.set(schemaName, newSchemaEntities);
        schemaVersion.entities = newSchemaEntities;
    }
    composeSchemaProperties(jsonSchema, newProperties, newPropertiesMap, newEntitiesMapBySchemaName, ddlObjectRetriever) {
        const schemaName = getSchemaName(jsonSchema);
        const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
        const jsonEntities = currentSchemaVersion.entities;
        const entities = newEntitiesMapBySchemaName.get(schemaName);
        const propertiesByEntityIndex = ensureChildArray(newPropertiesMap, schemaName);
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
    async composeSchemaRelations(jsonSchema, newRelations, newRelationsMap, newEntitiesMapBySchemaName, newPropertiesMap, newSchemaReferenceMap, ddlObjectRetriever, terminalStore, allDdlObjects) {
        const schemaName = getSchemaName(jsonSchema);
        const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
        const jsonEntities = currentSchemaVersion.entities;
        const entitiesForSchema = newEntitiesMapBySchemaName.get(schemaName);
        const propertiesByEntityIndex = newPropertiesMap.get(schemaName);
        const relationsByEntityIndex = ensureChildArray(newRelationsMap, schemaName);
        const referencesForSchema = newSchemaReferenceMap.get(schemaName);
        for (let tableIndex = 0; tableIndex < jsonEntities.length; tableIndex++) {
            const jsonEntity = jsonEntities[tableIndex];
            const propertiesForEntity = propertiesByEntityIndex[tableIndex];
            const relationsForEntity = [];
            relationsByEntityIndex[tableIndex]
                = relationsForEntity;
            const entity = entitiesForSchema[tableIndex];
            let index = 0;
            const relations = [];
            for (const jsonRelation of jsonEntity.relations) {
                const property = propertiesForEntity[jsonRelation.propertyRef.index];
                let referencedSchemaName = schemaName;
                if (jsonRelation.relationTableSchemaIndex
                    || jsonRelation.relationTableSchemaIndex === 0) {
                    const schemaReference = referencesForSchema[jsonRelation.relationTableSchemaIndex];
                    referencedSchemaName = schemaReference.referencedSchemaVersion.schema.name;
                }
                let entitiesArray = newEntitiesMapBySchemaName.get(referencedSchemaName);
                if (!entitiesArray) {
                    const schemaVersion = await this.getExistingLatestSchemaVersion(referencedSchemaName, allDdlObjects);
                    entitiesArray = schemaVersion.entities;
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
    composeSchemaColumns(jsonSchema, newColumns, newColumnsMap, newPropertyColumns, newEntitiesMapBySchemaName, newPropertiesMap, ddlObjectRetriever) {
        const schemaName = getSchemaName(jsonSchema);
        const columnsByTable = [];
        newColumnsMap.set(schemaName, columnsByTable);
        const entitiesForSchema = newEntitiesMapBySchemaName.get(schemaName);
        const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
        const jsonEntities = currentSchemaVersion.entities;
        const propertiesForSchema = newPropertiesMap.get(schemaName);
        jsonEntities.forEach((jsonEntity, tableIndex) => {
            const entity = entitiesForSchema[tableIndex];
            const columnsForTable = [];
            columnsByTable[tableIndex] = columnsForTable;
            const idColumnIndexes = [];
            jsonEntity.idColumnRefs.forEach((idColumnRef, idColumnIndex) => {
                idColumnIndexes[idColumnRef.index] = idColumnIndex;
            });
            const propertiesForEntity = propertiesForSchema[tableIndex];
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
    async composeSchemaRelationColumns(jsonSchema, newRelationColumns, newSchemaVersionMapBySchemaName, newSchemaReferenceMap, newRelationsMap, newColumnsMap, ddlObjectRetriever, terminalStore, allDdlObjects) {
        const schemaName = getSchemaName(jsonSchema);
        const currentSchemaVersion = jsonSchema.versions[jsonSchema.versions.length - 1];
        const jsonEntities = currentSchemaVersion.entities;
        const columnsForSchema = newColumnsMap.get(schemaName);
        const relationsForSchema = newRelationsMap.get(schemaName);
        const schemaReferencesForSchema = newSchemaReferenceMap.get(schemaName);
        for (let tableIndex = 0; tableIndex < jsonEntities.length; tableIndex++) {
            const jsonEntity = jsonEntities[tableIndex];
            const columnsForEntity = columnsForSchema[tableIndex];
            const relationsForEntity = relationsForSchema[tableIndex];
            for (let index = 0; index < jsonEntity.columns.length; index++) {
                const jsonColumn = jsonEntity.columns[index];
                const manyColumn = columnsForEntity[index];
                const relationColumns = [];
                for (const jsonRelationColumn of jsonColumn.manyRelationColumnRefs) {
                    const manyRelation = relationsForEntity[jsonRelationColumn.manyRelationIndex];
                    // if (!manyRelation.manyRelationColumns) {
                    // 	manyRelation.manyRelationColumns = []
                    // }
                    let oneRelationSchemaVersion;
                    if (jsonRelationColumn.oneSchemaIndex
                        || jsonRelationColumn.oneSchemaIndex === 0) {
                        const schemaReference = schemaReferencesForSchema[jsonRelationColumn.oneSchemaIndex];
                        oneRelationSchemaVersion = schemaReference.referencedSchemaVersion;
                    }
                    else {
                        oneRelationSchemaVersion = newSchemaVersionMapBySchemaName.get(schemaName);
                    }
                    const referencedSchemaName = oneRelationSchemaVersion.schema.name;
                    const oneTableColumnsMapForSchema = newColumnsMap.get(referencedSchemaName);
                    let oneTableColumns;
                    let oneTableRelations;
                    if (oneTableColumnsMapForSchema) {
                        oneTableColumns = oneTableColumnsMapForSchema[jsonRelationColumn.oneTableIndex];
                        oneTableRelations = newRelationsMap.get(oneRelationSchemaVersion.schema.name)[jsonRelationColumn.oneTableIndex];
                    }
                    else {
                        const schemaVersion = await this.getExistingLatestSchemaVersion(referencedSchemaName, allDdlObjects);
                        const entitiesArray = schemaVersion.entities;
                        const entity = entitiesArray[jsonRelationColumn.oneTableIndex];
                        oneTableColumns = entity.columns;
                        oneTableRelations = entity.relations;
                    }
                    const oneColumn = oneTableColumns[jsonRelationColumn.oneColumnIndex];
                    // if (!jsonRelationColumn.oneSchemaIndex
                    // 	&& !oneColumn.oneRelationColumns) {
                    // 	oneColumn.oneRelationColumns = []
                    // }
                    const oneRelation = oneTableRelations[jsonRelationColumn.oneRelationIndex];
                    // if (!jsonRelationColumn.oneSchemaIndex
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
                    // if (!jsonRelationColumn.oneSchemaIndex) {
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
DI.set(SCHEMA_COMPOSER, SchemaComposer);
//# sourceMappingURL=SchemaComposer.js.map