import { and, Delete, InsertColumnValues, InsertValues, UpdateProperties, valuesEqual } from '@airport/air-control';
import { EntityRelationType } from '@airport/ground-control';
export class OperationManager {
    /**
     * Transactional context must have been started by the time this method is called.
     *
     * @param qEntity
     * @param entity
     */
    async performSave(entities, transaction, context) {
        const verifiedTree = context.ioc.cascadeGraphVerifier
            .verify(entities, context);
        const entityGraph = context.ioc.entityGraphReconstructor
            .restoreEntityGraph(verifiedTree, context);
        context.ioc.structuralEntityValidator.validate(entityGraph, [], context);
        const operations = context.ioc.dependencyGraphResolver
            .getOperationsInOrder(entityGraph, context);
        let totalNumberOfChanges = 0;
        const rootDbEntity = context.dbEntity;
        for (const operation of operations) {
            context.dbEntity = operation.dbEntity;
            if (operation.isCreate) {
                totalNumberOfChanges += await this.internalCreate(operation.entities, transaction, context);
            }
            else if (operation.isDelete) {
                // TODO: add support for multiple records
                totalNumberOfChanges += await this.internalDelete(operation.entities, transaction, context);
            }
            else {
                // TODO: re-think though how change detection will work
                // TODO: add support for multiple records
                totalNumberOfChanges += await this.internalUpdate(operation.entities, null, transaction, context);
            }
        }
        context.dbEntity = rootDbEntity;
        return totalNumberOfChanges;
    }
    async internalCreate(entities, transaction, context, ensureGeneratedValues) {
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
        let numberOfAffectedRecords = 0;
        if (rawInsert.values.length) {
            const generatedColumns = context.dbEntity.columns.filter(column => column.isGenerated);
            if (generatedColumns.length && ensureGeneratedValues) {
                const idsAndGeneratedValues = await this.internalInsertValuesGetIds(rawInsert, transaction, context);
                for (let i = 0; i < entities.length; i++) {
                    for (const generatedColumn of generatedColumns) {
                        // Return index for generated column values is: DbColumn.index
                        entities[i][generatedColumn.propertyColumns[0].property.name]
                            = idsAndGeneratedValues[i][generatedColumn.index];
                    }
                }
                numberOfAffectedRecords = idsAndGeneratedValues.length;
            }
            else {
                numberOfAffectedRecords = await this.internalInsertValues(rawInsert, transaction, context, ensureGeneratedValues);
            }
        }
        return numberOfAffectedRecords;
    }
    /**
     * On an update operation, can a nested create contain an update?
     * Via:
     *  OneToMany:
     *    Yes, if the child entity is itself in the update cache
     *  ManyToOne:
     *    Cascades do not travel across ManyToOne
     */
    async internalUpdate(entity, originalEntity, transaction, context) {
        const qEntity = context.ioc.airDb.qSchemas[context.dbEntity.schemaVersion.schema.index][context.dbEntity.name];
        const setFragment = {};
        const idWhereFragments = [];
        let numUpdates = 0;
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
                    numUpdates++;
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
                                numUpdates++;
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
        let numberOfAffectedRecords = 0;
        if (numUpdates) {
            let whereFragment;
            if (idWhereFragments.length > 1) {
                whereFragment = and(...idWhereFragments);
            }
            else {
                whereFragment = idWhereFragments[0];
            }
            let rawUpdate = {
                update: qEntity,
                set: setFragment,
                where: whereFragment
            };
            let update = new UpdateProperties(rawUpdate);
            numberOfAffectedRecords = await this.internalUpdateWhere(update, transaction, context);
        }
        return numberOfAffectedRecords;
    }
    async internalDelete(entity, transaction, context) {
        const dbEntity = context.dbEntity;
        const qEntity = context.ioc.airDb.qSchemas[dbEntity.schemaVersion.schema.index][dbEntity.name];
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
        let idWhereClause;
        if (idWhereFragments.length > 1) {
            idWhereClause = and(...idWhereFragments);
        }
        else {
            idWhereClause = idWhereFragments[0];
        }
        let rawDelete = {
            deleteFrom: qEntity,
            where: idWhereClause
        };
        let deleteWhere = new Delete(rawDelete);
        return await this.internalDeleteWhere(deleteWhere, transaction, context);
    }
    async internalInsertColumnValues(rawInsertColumnValues, transaction, context) {
        const insertColumnValues = new InsertColumnValues(rawInsertColumnValues);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(insertColumnValues, null, context);
        return await context.ioc.transactionalServer.insertValues(portableQuery, transaction, context);
    }
    async internalInsertValues(rawInsertValues, transaction, context, ensureGeneratedValues) {
        const insertValues = new InsertValues(rawInsertValues);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(insertValues, null, context);
        return await context.ioc.transactionalServer.insertValues(portableQuery, transaction, context, ensureGeneratedValues);
    }
    async internalInsertColumnValuesGenerateIds(rawInsertColumnValues, transaction, context) {
        const insertValues = new InsertColumnValues(rawInsertColumnValues);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(insertValues, null, context);
        return await context.ioc.transactionalServer.insertValuesGetIds(portableQuery, transaction, context);
    }
    async internalInsertValuesGetIds(rawInsertValues, transaction, context) {
        const insertValues = new InsertValues(rawInsertValues);
        const portableQuery = context.ioc.queryFacade.getPortableQuery(insertValues, null, context);
        return await context.ioc.transactionalServer.insertValuesGetIds(portableQuery, transaction, context);
    }
    async internalUpdateColumnsWhere(updateColumns, transaction, context) {
        const portableQuery = context.ioc.queryFacade.getPortableQuery(updateColumns, null, context);
        return await context.ioc.transactionalServer.updateValues(portableQuery, transaction, context);
    }
    async internalUpdateWhere(update, transaction, context) {
        const portableQuery = context.ioc.queryFacade.getPortableQuery(update, null, context);
        return await context.ioc.transactionalServer.updateValues(portableQuery, transaction, context);
    }
    async internalDeleteWhere(aDelete, transaction, context) {
        let portableQuery = context.ioc.queryFacade.getPortableQuery(aDelete, null, context);
        return await context.ioc.transactionalServer.deleteWhere(portableQuery, transaction, context);
    }
}
//# sourceMappingURL=OperationManager.js.map