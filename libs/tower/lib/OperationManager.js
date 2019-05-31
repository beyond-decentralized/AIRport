"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const air_control_1 = require("@airport/air-control");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
const diTokens_1 = require("./diTokens");
class OperationManager {
    constructor() {
        this.higherOrderOpsYieldLength = 100;
        this.transactionInProgress = false;
        di_1.DI.get((airportDatabase, updateCache, utils) => {
            this.airDb = airportDatabase;
            this.updateCache = updateCache;
            this.utils = utils;
        }, air_control_1.AIR_DB, diTokens_1.UPDATE_CACHE, air_control_1.UTILS);
    }
    async init() {
        this.connector = await di_1.DI.getP(ground_control_1.TRANS_CONNECTOR);
        this.entity = await di_1.DI.getP(diTokens_1.QUERY_FACADE);
        await this.entity.init();
    }
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
    async performCreate(dbEntity, entity, createdEntityMap, idData, cascadeAlways = false) {
        let result = await this.internalCreate(dbEntity, [entity], createdEntityMap, !idData, cascadeAlways);
        await this.cascadeOnPersist(result.cascadeRecords, dbEntity, createdEntityMap, cascadeAlways);
        return result.numberOfAffectedRecords;
    }
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    async performBulkCreate(dbEntity, entities, createdEntityMap, checkIfProcessed = true, cascadeAlways = false, ensureGeneratedValues = true // For internal use only
    ) {
        let result = await this.internalCreate(dbEntity, entities, createdEntityMap, checkIfProcessed, cascadeAlways, ensureGeneratedValues);
        await this.cascadeOnPersist(result.cascadeRecords, dbEntity, createdEntityMap, cascadeAlways);
        return result.numberOfAffectedRecords;
    }
    async internalCreate(dbEntity, entities, createdEntityMap, checkIfProcessed, cascadeAlways = false, ensureGeneratedValues) {
        const qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        let rawInsert = {
            insertInto: qEntity,
            columns: this.utils.Metadata.getAllColumns(qEntity),
            values: []
        };
        let cascadeRecords = [];
        for (const entity of entities) {
            if (checkIfProcessed && this.isProcessed(entity, createdEntityMap, dbEntity)[0] === true) {
                return;
            }
            let foundValues = [];
            let valuesFragment = [];
            for (const dbProperty of dbEntity.properties) {
                const newValue = entity[dbProperty.name];
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    this.assertRelationValueIsAnObject(newValue, dbProperty);
                    switch (dbRelation.relationType) {
                        case ground_control_1.EntityRelationType.MANY_TO_ONE:
                            this.assertManyToOneNotArray(newValue);
                            this.utils.Schema.forEachColumnOfRelation(dbRelation, entity, (dbColumn, columnValue, propertyNameChains) => {
                                if (dbProperty.isId) {
                                    if (this.utils.Schema.isIdEmpty(columnValue)) {
                                        throw `non-@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name} must have a value for 'create' operations.`;
                                    }
                                }
                                if (this.utils.Schema.isRepositoryId(dbColumn.name)) {
                                    if (this.utils.Schema.isEmpty(columnValue)) {
                                        throw `Repository Id must be specified on an insert`;
                                    }
                                }
                                this.columnProcessed(dbProperty, foundValues, dbColumn, columnValue);
                                valuesFragment[dbColumn.index] = columnValue;
                            }, false);
                            // Cascading on manyToOne is not currently implemented, nothing else needs
                            // to be done
                            continue;
                        case ground_control_1.EntityRelationType.ONE_TO_MANY:
                            this.assertOneToManyIsArray(newValue);
                            if (!cascadeAlways && !this.utils.Schema.doCascade(dbRelation, ground_control_1.CRUDOperation.CREATE)) {
                                continue;
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
                    if (this.utils.Schema.isRepositoryId(column.name)
                        && this.utils.Schema.isEmpty(newValue)) {
                        throw `Repository Id must be specified on an insert`;
                    }
                    if (column.isGenerated && (newValue !== undefined && newValue !== null)) {
                        throw `@GeneratedValue() "${dbEntity.name}.${dbProperty.name}" cannot have a value for 'create' operations.`;
                    }
                    if (dbProperty.isId) {
                        if (!column.isGenerated && this.utils.Schema.isIdEmpty(newValue)) {
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
                const generatedIds = await this.internalInsertValuesGetIds(dbEntity, rawInsert);
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    entity[generatedProperty.name] = generatedIds[i];
                    numberOfAffectedRecords = generatedIds.length;
                }
            }
            else {
                numberOfAffectedRecords = await this.internalInsertValues(dbEntity, rawInsert, ensureGeneratedValues);
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
        if (!this.utils.valuesEqual(foundValues[dbColumn.index], value)) {
            throw `Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.index]} !== ${value}`;
        }
        return true;
    }
    async internalInsertColumnValues(dbEntity, rawInsertColumnValues) {
        const insertColumnValues = new air_control_1.InsertColumnValues(rawInsertColumnValues);
        const portableQuery = this.entity.getPortableQuery(dbEntity, insertColumnValues, null);
        return await this.connector.insertValues(portableQuery);
    }
    async internalInsertValues(dbEntity, rawInsertValues, ensureGeneratedValues) {
        const insertValues = new air_control_1.InsertValues(rawInsertValues);
        const portableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null);
        return await this.connector.insertValues(portableQuery, undefined, ensureGeneratedValues);
    }
    async internalInsertColumnValuesGenerateIds(dbEntity, rawInsertColumnValues) {
        const insertValues = new air_control_1.InsertColumnValues(rawInsertColumnValues);
        const portableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null);
        return await this.connector.insertValuesGetIds(portableQuery);
    }
    async internalInsertValuesGetIds(dbEntity, rawInsertValues) {
        const insertValues = new air_control_1.InsertValues(rawInsertValues);
        const portableQuery = this.entity.getPortableQuery(dbEntity, insertValues, null);
        return await this.connector.insertValuesGetIds(portableQuery);
    }
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    async performUpdate(dbEntity, entity, updatedEntityMap, originalValue, cascadeAlways = false) {
        if (!originalValue) {
            let [isProcessed, entityIdData] = this.isProcessed(entity, updatedEntityMap, dbEntity);
            if (isProcessed === true) {
                return 0;
            }
            if (!entityIdData.idKey) {
                throw `Cannot update ${dbEntity.name}, not all @Id(s) are set.`;
            }
            let originalValue = await this.getOriginalRecord(dbEntity, entityIdData.idKey);
            if (!originalValue) {
                throw `Cannot update ${dbEntity.name}, entity not found.`;
            }
        }
        let result = await this.internalUpdate(dbEntity, entity, originalValue, cascadeAlways);
        await this.cascadeOnPersist(result.cascadeRecords, dbEntity, updatedEntityMap, cascadeAlways);
        return result.numberOfAffectedRecords;
    }
    async cascadeOnPersist(cascadeRecords, parentDbEntity, alreadyModifiedEntityMap, cascadeAlways = false) {
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
                const [isProcessed, entityIdData] = this.isProcessed(manyEntity, alreadyModifiedEntityMap, dbEntity);
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
                const originalValues = await this.getOriginalValues(entitiesWithIds, dbEntity);
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
                        await this.performCreate(dbEntity, entityToUpdate.newValue, alreadyModifiedEntityMap, entityToUpdate.idData, cascadeAlways);
                    }
                    else {
                        await this.performUpdate(dbEntity, entityToUpdate.newValue, alreadyModifiedEntityMap, entityToUpdate.originalValue, cascadeAlways);
                    }
                }
            }
            for (let i = 0; i < entitiesWithoutIds.length; i++) {
                let entityToCreate = entitiesWithoutIds[i];
                await this.performCreate(dbEntity, entityToCreate, alreadyModifiedEntityMap, entityToCreate.idData, cascadeAlways);
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
    async internalUpdate(dbEntity, entity, originalEntity, cascadeAlways = false) {
        const qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
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
                else if (!this.utils.valuesEqual(originalValue, updatedValue)) {
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
                    this.utils.Schema.forEachColumnOfRelation(dbRelation, entity, (dbColumn, value, propertyNameChains) => {
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
                        else if (!this.utils.valuesEqual(originalValue, value)) {
                            setFragment[dbColumn.name] = value;
                            numUpdates++;
                        }
                    }, dbProperty.isId);
                    // Cascading on manyToOne is not currently implemented, nothing else needs to
                    // be done
                    continue;
                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                    this.assertOneToManyIsArray(updatedValue);
                    if (!cascadeAlways && !this.utils.Schema.doCascade(dbRelation, ground_control_1.CRUDOperation.UPDATE)) {
                        continue;
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
            let update = new air_control_1.UpdateProperties(rawUpdate, this.utils);
            numberOfAffectedRecords = await this.internalUpdateWhere(dbEntity, update);
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
    async internalUpdateColumnsWhere(dbEntity, updateColumns) {
        const portableQuery = this.entity.getPortableQuery(dbEntity, updateColumns, null);
        return await this.connector.updateValues(portableQuery);
    }
    async internalUpdateWhere(dbEntity, update) {
        const portableQuery = this.entity.getPortableQuery(dbEntity, update, null);
        return await this.connector.updateValues(portableQuery);
    }
    /**
     * Transactional context must have been started by the time this method is called.
     * @param qEntity
     * @param entity
     */
    async performDelete(dbEntity, entity) {
        return await this.internalDelete(dbEntity, entity);
    }
    isProcessed(entity, 
    // This is a per-operation map (for a single update or create or delete with cascades)
    operatedOnEntityMap, dbEntity) {
        if (air_control_1.markAsStub(entity)) {
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
        const idKey = this.utils.Schema.getIdKey(entity, dbEntity, false, (idColumn, idValue, propertyNameChains) => {
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
        const mapForSchema = this.utils.ensureChildArray(operatedOnEntityMap, dbEntity.schemaVersion.schema.index);
        const mapForEntityType = this.utils.ensureChildMap(mapForSchema, dbEntity.index);
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
    async internalDeleteWhere(dbEntity, aDelete) {
        let portableQuery = this.entity.getPortableQuery(dbEntity, aDelete, null);
        return await this.connector.deleteWhere(portableQuery);
    }
    async internalDelete(dbEntity, entity) {
        const qEntity = this.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
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
                    this.utils.Schema.forEachColumnOfRelation(dbRelation, dbEntity, (dbColumn, value, propertyNameChains) => {
                        if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
                            if (this.utils.Schema.isIdEmpty(value)) {
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
        let deleteWhere = new air_control_1.Delete(rawDelete, this.utils);
        return await this.internalDeleteWhere(dbEntity, deleteWhere);
    }
}
exports.OperationManager = OperationManager;
//# sourceMappingURL=OperationManager.js.map