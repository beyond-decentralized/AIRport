"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
class OperationManager {
    // higherOrderOpsYieldLength: number = 100
    // transactionInProgress: boolean    = false
    throwUnexpectedProperty(dbProperty, dbColumn, value) {
        throw `Unexpected property value '${value.toString()}' in property '${dbProperty.entity.name}.${dbProperty.name}'
		(column: '${dbColumn.name}').`;
    }
    warn(message) {
        console.log(message);
    }
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    async performCreate(dbEntity, entity, createdEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, idData, cascadeOverwrite = ground_control_1.CascadeOverwrite.DEFAULT) {
        let result = await this.internalCreate(dbEntity, [entity], createdEntityMap, !idData, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, cascadeOverwrite);
        await this.cascadeOnPersist(result.cascadeRecords, dbEntity, createdEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, cascadeOverwrite);
        return result.numberOfAffectedRecords;
    }
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    async performBulkCreate(dbEntity, entities, createdEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, checkIfProcessed = true, cascadeOverwrite = ground_control_1.CascadeOverwrite.DEFAULT, ensureGeneratedValues = true // For internal use only
    ) {
        let result = await this.internalCreate(dbEntity, entities, createdEntityMap, checkIfProcessed, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, cascadeOverwrite, ensureGeneratedValues);
        await this.cascadeOnPersist(result.cascadeRecords, dbEntity, createdEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, cascadeOverwrite);
        return result.numberOfAffectedRecords;
    }
    async internalCreate(dbEntity, entities, createdEntityMap, checkIfProcessed, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, cascadeOverwrite, ensureGeneratedValues) {
        const qEntity = airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        let rawInsert = {
            insertInto: qEntity,
            columns: metadataUtils.getAllColumns(qEntity),
            values: []
        };
        let cascadeRecords = [];
        for (const entity of entities) {
            if (checkIfProcessed && this.isProcessed(entity, createdEntityMap, dbEntity, schemaUtils)[0] === true) {
                continue;
            }
            let foundValues = [];
            let valuesFragment = [];
            for (const dbProperty of dbEntity.properties) {
                let newValue = entity[dbProperty.name];
                if (newValue === undefined) {
                    newValue = null;
                }
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    this.assertRelationValueIsAnObject(newValue, dbProperty);
                    switch (dbRelation.relationType) {
                        case ground_control_1.EntityRelationType.MANY_TO_ONE:
                            this.assertManyToOneNotArray(newValue);
                            schemaUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, columnValue, propertyNameChains) => {
                                if (dbProperty.isId) {
                                    if (schemaUtils.isIdEmpty(columnValue)) {
                                        throw `non-@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name} must have a value for 'create' operations.`;
                                    }
                                }
                                if (schemaUtils.isRepositoryId(dbColumn.name)) {
                                    if (schemaUtils.isEmpty(columnValue)) {
                                        throw `Repository Id must be specified on an insert`;
                                    }
                                }
                                this.columnProcessed(dbProperty, foundValues, dbColumn, columnValue);
                                valuesFragment[dbColumn.index] = columnValue === undefined ? null : columnValue;
                            }, false);
                            // Cascading on manyToOne is not currently implemented, nothing else needs
                            // to be done
                            continue;
                        case ground_control_1.EntityRelationType.ONE_TO_MANY:
                            this.assertOneToManyIsArray(newValue);
                            switch (cascadeOverwrite) {
                                case ground_control_1.CascadeOverwrite.NEVER:
                                    continue;
                                case ground_control_1.CascadeOverwrite.DEFAULT:
                                    if (!schemaUtils.doCascade(dbRelation, ground_control_1.CRUDOperation.CREATE)) {
                                        continue;
                                    }
                                    break;
                            }
                            cascadeRecords.push({
                                relation: dbRelation,
                                manyEntities: newValue,
                            });
                            break;
                    }
                }
                else {
                    let column = dbProperty.propertyColumns[0].column;
                    this.ensureNonRelationalValue(dbProperty, column, newValue);
                    if (schemaUtils.isRepositoryId(column.name)
                        && schemaUtils.isEmpty(newValue)) {
                        throw `Repository Id must be specified on an insert`;
                    }
                    if (column.isGenerated && (newValue !== undefined && newValue !== null)) {
                        // Allowing negative integers for temporary identification
                        // within the circular dependency management lookup
                        if (!dbProperty.isId || newValue >= 0) {
                            throw `@GeneratedValue() "${dbEntity.name}.${dbProperty.name}" cannot have a value for 'create' operations.`;
                        }
                    }
                    if (dbProperty.isId) {
                        if (!column.isGenerated && schemaUtils.isIdEmpty(newValue)) {
                            throw `non-@GeneratedValue() @Id() "${dbEntity.name}.${dbProperty.name}" must have a value for 'create' operations.`;
                        }
                    }
                    this.columnProcessed(dbProperty, foundValues, column, newValue);
                    valuesFragment[column.index] = newValue;
                }
            }
            rawInsert.values.push(valuesFragment);
        }
        let numberOfAffectedRecords = 0;
        if (rawInsert.values.length) {
            const generatedProperty = this.getGeneratedProperty(dbEntity);
            if (generatedProperty && ensureGeneratedValues) {
                const generatedIds = await this.internalInsertValuesGetIds(dbEntity, rawInsert, fieldUtils, queryFacade, queryUtils, transConnector);
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity[generatedProperty.name] = generatedIds[i];
                    numberOfAffectedRecords = generatedIds.length;
                }
            }
            else {
                numberOfAffectedRecords = await this.internalInsertValues(dbEntity, rawInsert, queryUtils, fieldUtils, ensureGeneratedValues);
            }
        }
        return {
            cascadeRecords: cascadeRecords,
            numberOfAffectedRecords: numberOfAffectedRecords,
        };
    }
    getGeneratedProperty(dbEntity) {
        const generatedColumns = dbEntity.idColumns.filter(dbColumn => dbColumn.isGenerated);
        switch (generatedColumns.length) {
            case 0:
                return null;
            case 1:
                return generatedColumns[0].propertyColumns[0].property;
            default:
                throw `Multiple @GeneratedValue() columns are not supported,
				entity: ${dbEntity.schemaVersion.schema.name}.${dbEntity.name}
				(schema version: ${dbEntity.schemaVersion.versionString}`;
        }
    }
    /*
     Values for the same column could be repeated in different places in the object graph.
     For example, if the same column is mapped to two different @ManyToOne relations.
     In this case, when persisting an entity we need to make sure that all values for the
     entity in question are being persisted.
     */
    columnProcessed(dbProperty, foundValues, dbColumn, value) {
        // if (value === undefined) {
        // 	throw `Values cannot be undefined, please use null.`;
        // }
        if (foundValues[dbColumn.index] === undefined) {
            foundValues[dbColumn.index] = value;
            return false;
        }
        if (!air_control_1.valuesEqual(foundValues[dbColumn.index], value)) {
            throw `Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.index]} !== ${value}`;
        }
        return true;
    }
    async internalInsertColumnValues(dbEntity, rawInsertColumnValues, queryUtils, fieldUtils) {
        const [transConnector, queryFacade] = await di_1.DI.get(ground_control_1.TRANS_CONNECTOR, air_control_1.QUERY_FACADE);
        const insertColumnValues = new air_control_1.InsertColumnValues(rawInsertColumnValues);
        const portableQuery = queryFacade.getPortableQuery(dbEntity, insertColumnValues, null, queryUtils, fieldUtils);
        return await transConnector.insertValues(portableQuery);
    }
    async internalInsertValues(dbEntity, rawInsertValues, queryUtils, fieldUtils, ensureGeneratedValues) {
        const [transConnector, queryFacade] = await di_1.DI.get(ground_control_1.TRANS_CONNECTOR, air_control_1.QUERY_FACADE);
        const insertValues = new air_control_1.InsertValues(rawInsertValues);
        const portableQuery = queryFacade.getPortableQuery(dbEntity, insertValues, null, queryUtils, fieldUtils);
        return await transConnector.insertValues(portableQuery, undefined, ensureGeneratedValues);
    }
    async internalInsertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues, queryUtils, fieldUtils) {
        const [transConnector, queryFacade] = await di_1.DI.get(ground_control_1.TRANS_CONNECTOR, air_control_1.QUERY_FACADE);
        const insertValues = new air_control_1.InsertColumnValues(rawInsertColumnValues);
        const portableQuery = queryFacade.getPortableQuery(dbEntity, insertValues, null, queryUtils, fieldUtils);
        return await transConnector.insertValuesGetIds(portableQuery);
    }
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    async performUpdate(dbEntity, entity, updatedEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, originalValue, cascadeOverwrite = ground_control_1.CascadeOverwrite.DEFAULT) {
        if (!originalValue) {
            let [isProcessed, entityIdData] = this.isProcessed(entity, updatedEntityMap, dbEntity, schemaUtils);
            if (isProcessed === true) {
                return 0;
            }
            if (!entityIdData.idKey) {
                throw `Cannot update ${dbEntity.name}, not all @Id(s) are set.`;
            }
            originalValue = await this.getOriginalRecord(dbEntity, entityIdData.idKey, updateCache);
            // if (!originalValue) {
            // 	throw `Cannot update ${dbEntity.name}, entity not found.`
            // }
        }
        let result = await this.internalUpdate(dbEntity, entity, originalValue, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, cascadeOverwrite);
        await this.cascadeOnPersist(result.cascadeRecords, dbEntity, updatedEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, cascadeOverwrite);
        return result.numberOfAffectedRecords;
    }
    async internalInsertValuesGetIds(dbEntity, rawInsertValues, fieldUtils, queryFacade, queryUtils, transConnector) {
        const insertValues = new air_control_1.InsertValues(rawInsertValues);
        const portableQuery = queryFacade.getPortableQuery(dbEntity, insertValues, null, queryUtils, fieldUtils);
        return await transConnector.insertValuesGetIds(portableQuery);
    }
    async cascadeOnPersist(cascadeRecords, parentDbEntity, alreadyModifiedEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, cascadeOverwrite = ground_control_1.CascadeOverwrite.DEFAULT) {
        if (!cascadeRecords.length) {
            return;
        }
        for (const cascadeRecord of cascadeRecords) {
            if (!cascadeRecord.relation.oneToManyElems) {
                continue;
            }
            switch (cascadeRecord.relation.oneToManyElems.cascade) {
                case ground_control_1.CascadeType.ALL:
                case ground_control_1.CascadeType.PERSIST:
                    break;
                // Do not cascade if its for REMOVE only
                default:
                    continue;
            }
            const entitiesWithIds = [];
            const entitiesWithIdMap = {};
            const entitiesWithoutIds = [];
            const dbEntity = cascadeRecord.relation.relationEntity;
            for (const manyEntity of cascadeRecord.manyEntities) {
                const [isProcessed, entityIdData] = this.isProcessed(manyEntity, alreadyModifiedEntityMap, dbEntity, schemaUtils);
                if (isProcessed === true) {
                    return;
                }
                const record = {
                    newValue: manyEntity,
                    originalValue: null,
                    idData: entityIdData
                };
                if (entityIdData.idKey) {
                    entitiesWithIds.push(record);
                    entitiesWithIdMap[entityIdData.idKey] = record;
                }
                else {
                    entitiesWithoutIds.push(record);
                }
            }
            if (entitiesWithIds.length) {
                const originalValues = await this.getOriginalValues(entitiesWithIds, dbEntity, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache);
                for (const idKey in originalValues.dataMap) {
                    entitiesWithIdMap[idKey].originalValue = originalValues.dataMap[idKey];
                }
                for (let i = 0; i < entitiesWithIds.length; i++) {
                    let entityToUpdate = entitiesWithIds[i];
                    if (!entityToUpdate.originalValue) {
                        if (entityToUpdate.idData.idColumnValueData.length == 1) {
                            // Entity with a single Id always has the @Id generated
                            // hence, it must have since been deleted, skip it
                            return;
                        }
                        // Don't know if the entity has been deleted or is a brand new one, create it
                        // TODO: figure out if the entity has been deleted and if it has, throw an
                        // exception?
                        await this.performCreate(dbEntity, entityToUpdate.newValue, alreadyModifiedEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, entityToUpdate.idData, cascadeOverwrite);
                    }
                    else {
                        await this.performUpdate(dbEntity, entityToUpdate.newValue, alreadyModifiedEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, entityToUpdate.originalValue, cascadeOverwrite);
                    }
                }
            }
            for (let i = 0; i < entitiesWithoutIds.length; i++) {
                let entityToCreate = entitiesWithoutIds[i];
                await this.performCreate(dbEntity, entityToCreate, alreadyModifiedEntityMap, airDb, fieldUtils, metadataUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, entityToCreate.idData, cascadeOverwrite);
            }
        }
    }
    getIdsWhereClause(entitiesToUpdate, qEntity) {
        let idsWhereClause;
        if (entitiesToUpdate[0].idData.idColumnValueData.length > 1) {
            let idsWhereClauseFragments = entitiesToUpdate.map((entityToUpdate) => {
                let singleIdWhereClauseFragments = entityToUpdate.idData.idColumnValueData.map((referencedData) => {
                    let currentQObject = qEntity;
                    for (const propertyName of referencedData.propertyNameChains[0]) {
                        currentQObject = currentQObject[propertyName];
                    }
                    return currentQObject.equals(referencedData.idValue);
                });
                return air_control_1.and(...singleIdWhereClauseFragments);
            });
            if (entitiesToUpdate.length > 1) {
                idsWhereClause = air_control_1.or(...idsWhereClauseFragments);
            }
            else {
                return idsWhereClauseFragments[0];
            }
        }
        else {
            let idsWhereClauseFragments = entitiesToUpdate.map((entityToUpdate) => {
                return entityToUpdate.idData.idColumnValueData[0].idValue;
            });
            let currentQObject = qEntity;
            for (const propertyName of entitiesToUpdate[0].idData.idColumnValueData[0].propertyNameChains[0]) {
                currentQObject = currentQObject[propertyName];
            }
            if (entitiesToUpdate.length > 1) {
                idsWhereClause = currentQObject.in(...idsWhereClauseFragments);
            }
            else {
                idsWhereClause = currentQObject.equals(idsWhereClauseFragments[0]);
            }
        }
        return idsWhereClause;
    }
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    async internalUpdate(dbEntity, entity, originalEntity, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector, updateCache, cascadeOverwrite) {
        const qEntity = airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        const cascadeRecords = [];
        const setFragment = {};
        const idWhereFragments = [];
        let numUpdates = 0;
        const valuesMapByColumn = [];
        for (const dbProperty of dbEntity.properties) {
            const updatedValue = entity[dbProperty.name];
            if (!dbProperty.relation || !dbProperty.relation.length) {
                const dbColumn = dbProperty.propertyColumns[0].column;
                this.ensureNonRelationalValue(dbProperty, dbColumn, updatedValue);
                if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, updatedValue)) {
                    continue;
                }
                const originalValue = originalEntity[dbColumn.name];
                if (dbProperty.isId) {
                    // For an id property, the value is guaranteed to be the same (and not empty) -
                    // cannot entity-update id fields
                    idWhereFragments.push(qEntity[dbProperty.name].equals(updatedValue));
                }
                else if (!air_control_1.valuesEqual(originalValue, updatedValue)) {
                    setFragment[dbColumn.name] = updatedValue;
                    numUpdates++;
                }
                continue;
            }
            // It's a relation property
            this.assertRelationValueIsAnObject(updatedValue, dbProperty);
            const dbRelation = dbProperty.relation[0];
            switch (dbRelation.relationType) {
                case ground_control_1.EntityRelationType.MANY_TO_ONE:
                    this.assertManyToOneNotArray(updatedValue);
                    schemaUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, value, propertyNameChains) => {
                        if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, value)) {
                            return;
                        }
                        let originalValue = originalEntity[dbColumn.name];
                        if (dbProperty.isId) {
                            let idQProperty = qEntity;
                            for (const propertyNameLink of propertyNameChains[0]) {
                                idQProperty = idQProperty[propertyNameLink];
                            }
                            // For an id property, the value is guaranteed to be the same (and not
                            // empty) - cannot entity-update id fields
                            idWhereFragments.push(idQProperty.equals(value));
                        }
                        else if (!air_control_1.valuesEqual(originalValue, value)) {
                            setFragment[dbColumn.name] = value;
                            numUpdates++;
                        }
                    }, dbProperty.isId);
                    // Cascading on manyToOne is not currently implemented, nothing else needs to
                    // be done
                    continue;
                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                    this.assertOneToManyIsArray(updatedValue);
                    switch (cascadeOverwrite) {
                        case ground_control_1.CascadeOverwrite.NEVER:
                            continue;
                        case ground_control_1.CascadeOverwrite.DEFAULT:
                            if (!schemaUtils.doCascade(dbRelation, ground_control_1.CRUDOperation.UPDATE)) {
                                continue;
                            }
                            break;
                    }
                    cascadeRecords.push({
                        relation: dbRelation,
                        manyEntities: updatedValue,
                    });
                    break;
            }
        }
        let numberOfAffectedRecords = 0;
        if (numUpdates) {
            let whereFragment;
            if (idWhereFragments.length > 1) {
                whereFragment = air_control_1.and(...idWhereFragments);
            }
            else {
                whereFragment = idWhereFragments[0];
            }
            let rawUpdate = {
                update: qEntity,
                set: setFragment,
                where: whereFragment
            };
            let update = new air_control_1.UpdateProperties(rawUpdate);
            numberOfAffectedRecords = await this.internalUpdateWhere(dbEntity, update, fieldUtils, queryFacade, queryUtils, transConnector);
        }
        return {
            recordChanged: !!numUpdates,
            numberOfAffectedRecords: numberOfAffectedRecords,
            cascadeRecords: cascadeRecords
        };
    }
    ensureNonRelationalValue(dbProperty, dbColumn, value) {
        if (value === undefined || value === null) {
            return;
        }
        switch (dbColumn.type) {
            case ground_control_1.SQLDataType.ANY:
                break;
            case ground_control_1.SQLDataType.BOOLEAN:
                if (typeof value !== 'boolean') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case ground_control_1.SQLDataType.DATE:
                if (typeof value !== 'object' || !(value instanceof Date)) {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case ground_control_1.SQLDataType.JSON:
                if (typeof value !== 'object' || value instanceof Date) {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case ground_control_1.SQLDataType.NUMBER:
                if (typeof value !== 'number') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case ground_control_1.SQLDataType.STRING:
                if (typeof value !== 'string') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
        }
    }
    assertRelationValueIsAnObject(relationValue, dbProperty) {
        if (relationValue !== null && relationValue !== undefined &&
            (typeof relationValue != 'object' || relationValue instanceof Date)) {
            throw `Unexpected value in relation property: ${dbProperty.name}, of entity ${dbProperty.entity.name}`;
        }
    }
    assertManyToOneNotArray(relationValue) {
        if (relationValue instanceof Array) {
            throw `@ManyToOne relation cannot be an array`;
        }
    }
    assertOneToManyIsArray(relationValue) {
        if (relationValue !== null
            && relationValue !== undefined
            && !(relationValue instanceof Array)) {
            throw `@OneToMany relation must be an array`;
        }
    }
    async internalUpdateColumnsWhere(dbEntity, updateColumns, fieldUtils, queryFacade, queryUtils, transConnector) {
        const portableQuery = queryFacade.getPortableQuery(dbEntity, updateColumns, null, queryUtils, fieldUtils);
        return await transConnector.updateValues(portableQuery);
    }
    async internalUpdateWhere(dbEntity, update, fieldUtils, queryFacade, queryUtils, transConnector) {
        const portableQuery = queryFacade.getPortableQuery(dbEntity, update, null, queryUtils, fieldUtils);
        return await transConnector.updateValues(portableQuery);
    }
    /**
     * Transactional context must have been started by the time this method is called.
     * @param qEntity
     * @param entity
     */
    async performDelete(dbEntity, entity, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector) {
        return await this.internalDelete(dbEntity, entity, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector);
    }
    isProcessed(entity, 
    // This is a per-operation map (for a single update or create or delete with cascades)
    operatedOnEntityMap, dbEntity, schemaUtils) {
        if (air_control_1.isStub(entity)) {
            return [true, null];
        }
        if (!dbEntity.idColumns.length) {
            throw `Cannot run 'create'|'bulkCreate'|'update' for entity '${dbEntity.name}' with no @Id(s).
			Please use 'insert'|'updateWhere' instead.`;
        }
        const entityIdData = {
            idColumnValueData: [],
            idKey: null
        };
        // Attempt to get the id, allowing for non-ided entities,
        // fail if (part of) an id is empty.
        const idKey = schemaUtils.getIdKey(entity, dbEntity, false, (idColumn, idValue, propertyNameChains) => {
            entityIdData.idColumnValueData.push({
                idColumn,
                idValue,
                propertyNameChains,
            });
        });
        entityIdData.idKey = idKey;
        if (!idKey) {
            return [false, entityIdData];
        }
        const mapForSchema = ground_control_1.ensureChildArray(operatedOnEntityMap, dbEntity.schemaVersion.schema.index);
        const mapForEntityType = ground_control_1.ensureChildMap(mapForSchema, dbEntity.index);
        const alreadyOperatedOnEntity = mapForEntityType[idKey];
        if (!alreadyOperatedOnEntity) {
            mapForEntityType[idKey] = entity;
            return [false, entityIdData];
        }
        if (alreadyOperatedOnEntity === entity) {
            // The Update operation for this entity was already recorded, nothing to do
            return [true, null];
        }
        // If it's new entity, not in cache
        let hasNonIdProperties = false;
        for (let propertyName in entity) {
            if (!dbEntity.idColumnMap[propertyName]
                && entity.hasOwnProperty(propertyName)) {
                hasNonIdProperties = true;
                break;
            }
        }
        // If there is at least one non-id property set, then it's not an id-stub
        if (hasNonIdProperties) {
            throw `More than one non-id-stub instance of '${dbEntity.name}' with @Id(s) value '${entityIdData.idKey}' during mutation operation`;
        }
        // The Update operation for this entity was already recorded, nothing to do
        return [true, null];
    }
    async internalDeleteWhere(dbEntity, aDelete, fieldUtils, queryFacade, queryUtils, transConnector) {
        let portableQuery = queryFacade.getPortableQuery(dbEntity, aDelete, null, queryUtils, fieldUtils);
        return await transConnector.deleteWhere(portableQuery);
    }
    async internalDelete(dbEntity, entity, airDb, fieldUtils, queryFacade, queryUtils, schemaUtils, transConnector) {
        const qEntity = airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        const idWhereFragments = [];
        const valuesMapByColumn = [];
        for (let propertyName in entity) {
            if (!entity.hasOwnProperty(propertyName)) {
                continue;
            }
            const dbProperty = dbEntity.propertyMap[propertyName];
            // Skip transient fields
            if (!dbProperty) {
                continue;
            }
            const deletedValue = entity[propertyName];
            let dbRelation;
            if (dbProperty.relation && dbProperty.relation.length) {
                dbRelation = dbProperty.relation[0];
            }
            if (!dbRelation) {
                // If the property is not a transient field and not a relation
                const dbColumn = dbProperty.propertyColumns[0].column;
                this.ensureNonRelationalValue(dbProperty, dbColumn, deletedValue);
                if (this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, deletedValue)) {
                    continue;
                }
                if (dbProperty.isId) {
                    // For an id property, the value is guaranteed to be the same (and not empty) -
                    // cannot entity-update id fields
                    idWhereFragments.push(qEntity[propertyName].equals(deletedValue));
                }
                continue;
            }
            this.assertRelationValueIsAnObject(deletedValue, dbProperty);
            switch (dbRelation.relationType) {
                case ground_control_1.EntityRelationType.MANY_TO_ONE:
                    this.assertManyToOneNotArray(deletedValue);
                    schemaUtils.forEachColumnOfRelation(dbRelation, dbEntity, (dbColumn, value, propertyNameChains) => {
                        if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
                            if (schemaUtils.isIdEmpty(value)) {
                                throw `Required Id value is missing in:
								'${dbEntity.name}.${propertyNameChains.join('.')}'`;
                            }
                            let idQProperty = qEntity;
                            for (const propertyNameLink of propertyNameChains[0]) {
                                idQProperty = idQProperty[propertyNameLink];
                            }
                            // For an id property, the value is guaranteed to be the same (and not
                            // empty) - cannot entity-update id fields
                            idWhereFragments.push(idQProperty.equals(value));
                        }
                        this.columnProcessed(dbProperty, valuesMapByColumn, dbColumn, value);
                    }, false);
                    // Cascading on manyToOne is not currently implemented, nothing else needs to
                    // be done
                    break;
                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                    // One-to-Manys do not contain values for the object being deleted
                    break;
                default:
                    throw `Unknown relationType '${dbRelation.relationType}' for '${dbEntity.name}.${dbProperty.name}'.`;
            }
        }
        let idWhereClause;
        if (idWhereFragments.length > 1) {
            idWhereClause = air_control_1.and(...idWhereFragments);
        }
        else {
            idWhereClause = idWhereFragments[0];
        }
        let rawDelete = {
            deleteFrom: qEntity,
            where: idWhereClause
        };
        let deleteWhere = new air_control_1.Delete(rawDelete);
        return await this.internalDeleteWhere(dbEntity, deleteWhere, fieldUtils, queryFacade, queryUtils, transConnector);
    }
}
exports.OperationManager = OperationManager;
//# sourceMappingURL=OperationManager.js.map