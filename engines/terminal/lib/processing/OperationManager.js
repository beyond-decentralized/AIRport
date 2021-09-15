import { and, Delete, InsertValues, or, UpdateProperties, valuesEqual } from '@airport/air-control';
import { DI } from '@airport/di';
import { EntityRelationType } from '@airport/ground-control';
import { OPERATION_MANAGER } from '../tokens';
/**
 * Created by Papa on 11/15/2016.
 */
export class OperationManager {
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    async performSave(entities, actor, transaction, context) {
        let entityGraph;
        if (context.internal) {
            if (entities instanceof Array) {
                entityGraph = entities;
            }
            else {
                entityGraph = [entities];
            }
        }
        else {
            const verifiedTree = context.ioc.cascadeGraphVerifier
                .verify(entities, context);
            entityGraph = context.ioc.entityGraphReconstructor
                .restoreEntityGraph(verifiedTree, context);
            context.ioc.structuralEntityValidator.validate(entityGraph, [], context);
        }
        const operations = context.ioc.dependencyGraphResolver
            .getOperationsInOrder(entityGraph, context);
        const rootDbEntity = context.dbEntity;
        const saveResult = {
            created: {},
            updated: {},
            deleted: {}
        };
        for (const operation of operations) {
            context.dbEntity = operation.dbEntity;
            if (operation.isCreate) {
                await this.internalCreate(operation.entities, actor, transaction, saveResult, context, true);
            }
            else if (operation.isDelete) {
                await this.internalDelete(operation.entities, actor, transaction, saveResult, context);
            }
            else {
                await this.internalUpdate(operation.entities, null, actor, transaction, saveResult, context);
            }
        }
        context.dbEntity = rootDbEntity;
        return saveResult;
    }
    async internalCreate(entities, actor, transaction, saveResult, context, ensureGeneratedValues) {
        const qEntity = context.ioc.airDb.qSchemas[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name];
        let rawInsert = {
            insertInto: qEntity,
            columns: context.ioc.metadataUtils.getAllNonGeneratedColumns(qEntity),
            values: []
        };
        let columnIndexesInValues = [];
        rawInsert.columns.forEach((qField, index) => {
            columnIndexesInValues[qField.dbColumn.index] = index;
        });
        for (const entity of entities) {
            let valuesFragment = [];
            for (const dbProperty of context.dbEntity.properties) {
                let newValue = entity[dbProperty.name];
                if (newValue === undefined) {
                    newValue = null;
                }
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, columnValue, propertyNameChains) => {
                                if (dbColumn.isGenerated) {
                                    return;
                                }
                                valuesFragment[columnIndexesInValues[dbColumn.index]]
                                    = columnValue === undefined ? null : columnValue;
                            }, false);
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                        default:
                            throw new Error(`Unknown relationType '${dbRelation.relationType}' 
						for '${context.dbEntity.name}.${dbProperty.name}'.`);
                    }
                }
                else {
                    let column = dbProperty.propertyColumns[0].column;
                    if (!column.isGenerated) {
                        valuesFragment[columnIndexesInValues[column.index]] = newValue;
                    }
                }
            }
            rawInsert.values.push(valuesFragment);
        }
        const insertValues = new InsertValues(rawInsert);
        if (rawInsert.values.length) {
            const generatedColumns = context.dbEntity.columns.filter(column => column.isGenerated);
            if (generatedColumns.length && ensureGeneratedValues) {
                const portableQuery = context.ioc.queryFacade
                    .getPortableQuery(insertValues, null, context);
                const idsAndGeneratedValues = await context.ioc.insertManager
                    .insertValuesGetIds(portableQuery, actor, transaction, context);
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    const entitySaveResult = {};
                    saveResult.created[context.ioc.entityStateManager.getOperationUniqueId(entity)] = entitySaveResult;
                    for (const generatedColumn of generatedColumns) {
                        // Return index for generated column values is: DbColumn.index
                        const generatedPropertyName = generatedColumn.propertyColumns[0].property.name;
                        const generatedPropertyValue = idsAndGeneratedValues[i][generatedColumn.index];
                        entity[generatedPropertyName] = generatedPropertyValue;
                        entitySaveResult[generatedPropertyName] = generatedPropertyValue;
                    }
                }
            }
            else {
                const portableQuery = context.ioc.queryFacade
                    .getPortableQuery(insertValues, null, context);
                await context.ioc.insertManager.insertValues(portableQuery, actor, transaction, context, ensureGeneratedValues);
                for (let i = 0; i < entities.length; i++) {
                    const entity = entities[i];
                    saveResult.created[context.ioc.entityStateManager.getOperationUniqueId(entity)] = true;
                }
            }
        }
    }
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    async internalUpdate(entities, originalEntity, actor, transaction, saveResult, context) {
        const qEntity = context.ioc.airDb.qSchemas[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name];
        const setFragment = {};
        const idWhereFragments = [];
        let runUpdate = false;
        for (const entity of entities) {
            for (const dbProperty of context.dbEntity.properties) {
                const updatedValue = entity[dbProperty.name];
                if (!dbProperty.relation || !dbProperty.relation.length) {
                    const dbColumn = dbProperty.propertyColumns[0].column;
                    const originalValue = originalEntity[dbColumn.name];
                    if (dbProperty.isId) {
                        // For an id property, the value is guaranteed to be the same (and not empty) -
                        // cannot entity-update id fields
                        idWhereFragments.push(qEntity[dbProperty.name]
                            .equals(updatedValue));
                    }
                    else if (!valuesEqual(originalValue, updatedValue)) {
                        setFragment[dbColumn.name] = updatedValue;
                        saveResult.updated[context.ioc.entityStateManager.getOperationUniqueId(entity)] = true;
                        runUpdate = true;
                    }
                }
                else {
                    const dbRelation = dbProperty.relation[0];
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, value, propertyNameChains) => {
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
                                else if (!valuesEqual(originalValue, value)) {
                                    setFragment[dbColumn.name] = value;
                                    saveResult.updated[context.ioc.entityStateManager.getOperationUniqueId(entity)] = true;
                                    runUpdate = true;
                                }
                            }, dbProperty.isId);
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                        default:
                            throw new Error(`Unknown relationType '${dbRelation.relationType}' 
						for '${context.dbEntity.name}.${dbProperty.name}'.`);
                    }
                }
            }
            if (runUpdate) {
                let whereFragment;
                if (idWhereFragments.length > 1) {
                    whereFragment = and(...idWhereFragments);
                }
                else {
                    whereFragment = idWhereFragments[0];
                }
                const rawUpdate = {
                    update: qEntity,
                    set: setFragment,
                    where: whereFragment
                };
                const update = new UpdateProperties(rawUpdate);
                const portableQuery = context.ioc.queryFacade.getPortableQuery(update, null, context);
                await context.ioc.updateManager.updateValues(portableQuery, actor, transaction, context);
            }
        }
    }
    async internalDelete(entities, actor, transaction, saveResult, context) {
        const dbEntity = context.dbEntity;
        const qEntity = context.ioc.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
        const idWhereFragments = [];
        const valuesMapByColumn = [];
        let entityIdWhereClauses = [];
        for (const entity of entities) {
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
                    if (dbProperty.isId) {
                        // For an id property, the value is guaranteed to be the same (and not empty) -
                        // cannot entity-update id fields
                        idWhereFragments.push(qEntity[propertyName].equals(deletedValue));
                    }
                }
                else {
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, dbEntity, (dbColumn, value, propertyNameChains) => {
                                if (dbProperty.isId && valuesMapByColumn[dbColumn.index] === undefined) {
                                    let idQProperty = qEntity;
                                    for (const propertyNameLink of propertyNameChains[0]) {
                                        idQProperty = idQProperty[propertyNameLink];
                                    }
                                    // For an id property, the value is guaranteed to be the same (and not
                                    // empty) - cannot entity-update id fields
                                    idWhereFragments.push(idQProperty.equals(value));
                                }
                            }, false);
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            break;
                        default:
                            throw new Error(`Unknown relationType '${dbRelation.relationType}' 
						for '${dbEntity.name}.${dbProperty.name}'.`);
                    }
                }
            }
            if (idWhereFragments.length > 1) {
                entityIdWhereClauses.push(and(...idWhereFragments));
            }
            else {
                entityIdWhereClauses.push(idWhereFragments[0]);
            }
            saveResult.deleted[context.ioc.entityStateManager.getOperationUniqueId(entity)] = true;
        }
        let where;
        if (entityIdWhereClauses.length === 1) {
            where = entityIdWhereClauses[0];
        }
        else {
            where = or(...entityIdWhereClauses);
        }
        let rawDelete = {
            deleteFrom: qEntity,
            where
        };
        let deleteWhere = new Delete(rawDelete);
        let portableQuery = context.ioc.queryFacade.getPortableQuery(deleteWhere, null, context);
        await context.ioc.deleteManager.deleteWhere(portableQuery, actor, transaction, context);
    }
}
DI.set(OPERATION_MANAGER, OperationManager);
//# sourceMappingURL=OperationManager.js.map