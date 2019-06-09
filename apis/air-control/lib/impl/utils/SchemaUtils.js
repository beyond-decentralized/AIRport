"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Query_1 = require("../../lingo/query/facade/Query");
const EntityState_1 = require("../core/entity/EntityState");
class SchemaUtils {
    constructor(airportDb, utils) {
        this.airportDb = airportDb;
        this.utils = utils;
    }
    getDbEntity(schemaIndex, tableIndex) {
        return this.airportDb.schemas[schemaIndex].currentVersion.entities[tableIndex];
    }
    isRepositoryId(columnName) {
        return columnName === ground_control_1.repositoryEntity.REPOSITORY_ID;
    }
    doCascade(dbRelation, crudOperation) {
        if (dbRelation.relationType !== ground_control_1.EntityRelationType.ONE_TO_MANY) {
            return false;
        }
        if (!dbRelation.oneToManyElems) {
            return false;
        }
        const cascade = dbRelation.oneToManyElems.cascade;
        switch (crudOperation) {
            case ground_control_1.CRUDOperation.CREATE:
            case ground_control_1.CRUDOperation.UPDATE:
                return cascade === ground_control_1.CascadeType.ALL || cascade === ground_control_1.CascadeType.PERSIST;
            case ground_control_1.CRUDOperation.DELETE:
                return cascade === ground_control_1.CascadeType.ALL || cascade === ground_control_1.CascadeType.REMOVE;
            default:
                throw `Unsupported CRUDOperation '${crudOperation}' for cascade check.`;
        }
    }
    getQEntityConstructor(dbEntity) {
        return this.airportDb.qSchemas[dbEntity.schemaVersion.schema.index]
            .__qConstructors__[dbEntity.index];
    }
    getEntityConstructor(dbEntity) {
        const entityConstructor = this.airportDb.qSchemas[dbEntity.schemaVersion.schema.index]
            .__constructors__[dbEntity.name];
        return entityConstructor;
    }
    getNewEntity(dbEntity) {
        const entityConstructor = this.getEntityConstructor(dbEntity);
        return entityConstructor;
    }
    isIdEmpty(idValue) {
        return !idValue && idValue !== 0;
    }
    isEmpty(value) {
        return this.isIdEmpty(value) && value !== false && value !== '';
    }
    isRelationColumn(dbColumn) {
        return this.isManyRelationColumn(dbColumn)
            || this.isOneRelationColumn(dbColumn);
    }
    isManyRelationColumn(dbColumn) {
        return !!(dbColumn.manyRelationColumns && dbColumn.manyRelationColumns.length);
    }
    isOneRelationColumn(dbColumn) {
        return !!(dbColumn.oneRelationColumns && dbColumn.oneRelationColumns.length);
    }
    getIdKey(entityObject, dbEntity, failOnNoId = true, 
    // noIdValueCallback: {
    // 	(
    // 		relationColumn: DbColumn,
    // 		value: any,
    // 		propertyNameChains: string[][],
    // 	): boolean;
    // } = null,
    idValueCallback) {
        const keys = this.getIdKeyInfo(entityObject, dbEntity, failOnNoId, idValueCallback);
        return keys.arrayByIdColumnIndex.join('|');
    }
    getIdKeyInfo(entityObject, dbEntity, failOnNoId = true, idValueCallback) {
        if (!dbEntity.idColumns.length) {
            if (failOnNoId) {
                throw `@Id is not defined on entity '${dbEntity.name}'.`;
            }
            return null;
        }
        const idKeys = {
            arrayByIdColumnIndex: [],
            mapByIdColumnName: {}
        };
        for (const dbColumn of dbEntity.idColumns) {
            const [propertyNameChains, idValue] = this.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entityObject, true);
            idValueCallback && idValueCallback(dbColumn, idValue, propertyNameChains);
            idKeys.arrayByIdColumnIndex.push(idValue);
            idKeys.mapByIdColumnName[dbColumn.name] = idValue;
        }
        return idKeys;
    }
    getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entityObject, forIdKey = false) {
        const columnValuesAndPaths = this.getColumnValuesAndPaths(dbColumn, entityObject, [], forIdKey);
        const firstColumnValueAndPath = columnValuesAndPaths[0];
        const propertyNameChains = [firstColumnValueAndPath.path];
        const value = firstColumnValueAndPath.value;
        columnValuesAndPaths.reduce((last, current) => {
            if (!this.utils.valuesEqual(last.value, current.value, true)) {
                throw `Values differ for ${dbEntity.name}.${dbColumn.name}:
						'${last.path.join('.')}' = ${last.value}
						'${current.path.join('.')}' = ${current.value}`;
            }
            propertyNameChains.push(current.path);
            return current;
        });
        return [propertyNameChains, value];
    }
    getColumnValuesAndPaths(dbColumn, relationObject, breadCrumb, forIdKey = false) {
        if (this.isManyRelationColumn(dbColumn)) {
            let columnValuesAndPaths = [];
            // If a column is part of a relation, it would be on the Many Side
            for (const dbRelationColumn of dbColumn.manyRelationColumns) {
                const dbProperty = dbRelationColumn.manyRelation.property;
                const relationBreadCrumb = [...breadCrumb];
                const propertyName = dbProperty.name;
                relationBreadCrumb.push(propertyName);
                const value = relationObject[propertyName];
                if (!value) {
                    if (forIdKey
                    // && this.handleNoId(dbColumn, dbProperty, relationBreadCrumb, value,
                    // noIdValueCallback)
                    ) {
                        throw `Cannot retrieve composite Id value, value chain '${relationBreadCrumb.join('.')}' is : ${value}.`;
                        // return null;
                    }
                    columnValuesAndPaths.push({
                        path: relationBreadCrumb,
                        value
                    });
                }
                else {
                    const otherEntityColumn = dbRelationColumn.oneColumn;
                    const relationValuesAndPaths = this.getColumnValuesAndPaths(otherEntityColumn, value, relationBreadCrumb, forIdKey);
                    columnValuesAndPaths = columnValuesAndPaths.concat(relationValuesAndPaths);
                }
            }
            return columnValuesAndPaths;
        }
        else {
            // If a column is not a part of (a) relation(s) then it is associated
            // to only one property
            const dbProperty = dbColumn.propertyColumns[0].property;
            const propertyBreadCrumb = [...breadCrumb];
            const propertyName = dbProperty.name;
            propertyBreadCrumb.push(propertyName);
            let value = relationObject[propertyName];
            if (forIdKey && this.isIdEmpty(value)) {
                if (dbColumn.isGenerated) {
                    value = --SchemaUtils.TEMP_ID;
                    relationObject[propertyName] = value;
                }
                else {
                    // if (this.handleNoId(dbColumn, dbProperty, propertyBreadCrumb, value,
                    // noValueCallback)) { return null; }
                    throw `Cannot retrieve composite Id value, value chain '${propertyBreadCrumb.join('.')}' is : ${value}.`;
                }
            }
            return [{
                    path: propertyBreadCrumb,
                    value
                }];
        }
    }
    getColumnPaths(dbColumn, breadCrumb) {
        let columnValuesAndPaths = [];
        if (this.isManyRelationColumn(dbColumn)) {
            // If a column is part of a relation, it would be on the Many Side
            for (const dbRelationColumn of dbColumn.manyRelationColumns) {
                const dbProperty = dbRelationColumn.manyRelation.property;
                const relationBreadCrumb = [...breadCrumb];
                relationBreadCrumb.push(dbProperty.name);
                const otherEntityColumn = dbRelationColumn.oneColumn;
                const relationValuesAndPaths = this.getColumnPaths(otherEntityColumn, relationBreadCrumb);
                columnValuesAndPaths = columnValuesAndPaths.concat(relationValuesAndPaths);
            }
        }
        else {
            // If a column is not a part of (a) relation(s) then it is associated
            // to only one property
            const dbProperty = dbColumn.propertyColumns[0].property;
            const propertyBreadCrumb = [...breadCrumb];
            propertyBreadCrumb.push(dbProperty.name);
            columnValuesAndPaths.push(propertyBreadCrumb);
        }
        return columnValuesAndPaths;
    }
    addRelationToEntitySelectClause(dbRelation, selectClause, allowDefaults = false) {
        this.forEachColumnTypeOfRelation(dbRelation, (dbColumn, propertyNameChains) => {
            let convertTo = true;
            let propertySelectClause = selectClause;
            const firstPropertyNameChain = propertyNameChains[0];
            firstPropertyNameChain.forEach((propertyNameLink, index) => {
                let propertyObject = propertySelectClause[propertyNameLink];
                if (!propertyObject) {
                    propertyObject = {};
                    EntityState_1.markAsStub(propertyObject);
                    propertySelectClause[propertyNameLink] = propertyObject;
                }
                else {
                    if (index < firstPropertyNameChain.length - 1) {
                        if (!(propertyObject instanceof Object) || propertyObject instanceof Date) {
                            throw `Invalid entry: 
								...
								{
									...
									${propertyNameLink}: ${propertyObject}
								}
								in '${dbRelation.property.entity.name}.${dbRelation.property.name}',
								Property must be an Object.`;
                        }
                    }
                    else {
                        if (!allowDefaults && !Query_1.isY(propertyObject)) {
                            const reason = dbRelation.property.isId
                                ? `'${dbRelation.property.entity.name}.${dbRelation.property.name}' is an @Id property`
                                : `'${dbRelation.property.entity.name}' has no @Id - all properties are treated as @Ids`;
                            throw `Defaults are not allowed in: 
								...
								{
									...
									${propertyNameLink}: ${propertyObject}
								}
								${reason}.`;
                        }
                        convertTo = false;
                    }
                }
                propertySelectClause = propertyObject;
            });
            if (convertTo) {
                Query_1.convertToY(propertySelectClause);
            }
        });
    }
    forEachColumnOfRelation(dbRelation, entity, callback, failOnNoValue = true) {
        const dbEntity = dbRelation.property.entity;
        for (const dbRelationColumn of dbRelation.manyRelationColumns) {
            const dbColumn = dbRelationColumn.manyColumn;
            const [propertyNameChains, value] = this.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity);
            if (callback(dbColumn, value, propertyNameChains)) {
                return;
            }
        }
    }
    forEachColumnTypeOfRelation(dbRelation, callback) {
        for (const dbRelationColumn of dbRelation.manyRelationColumns) {
            const dbColumn = dbRelationColumn.manyColumn;
            const propertyNameChains = this.getColumnPaths(dbColumn, []);
            if (callback(dbColumn, propertyNameChains)) {
                return;
            }
        }
    }
    getSheetSelectFromSetClause(dbEntity, qEntity, setClause) {
        const entitySelectClause = [];
        for (const columnIndex in dbEntity.columns) {
            const dbColumn = dbEntity.columns[columnIndex];
            let dbProperty;
            const isIdColumn = dbColumn.propertyColumns.some(propertyColumn => {
                dbProperty = propertyColumn.property;
                return dbProperty.isId;
            });
            if (isIdColumn) {
                if (setClause[dbColumn.name]) {
                    throw `Cannot update @Id column '${dbColumn.name}' of property '${dbEntity.name}.${dbProperty.name}'.`;
                }
                this.addColumnToSheetSelect(dbColumn, qEntity, entitySelectClause);
            }
            else if (setClause[dbColumn.name]) {
                this.addColumnToSheetSelect(dbColumn, qEntity, entitySelectClause);
                // } else {
                // entitySelectClause[dbColumn.index] = null;
            }
        }
        return entitySelectClause;
    }
    getTableName(dbEntity) {
        return ground_control_1.getTableName(dbEntity.schemaVersion.schema, dbEntity);
    }
    addColumnToSheetSelect(dbColumn, qEntity, entitySelectClause) {
        if (this.isManyRelationColumn(dbColumn)) {
            const columnPaths = this.getColumnPaths(dbColumn, []);
            const firstColumnPath = columnPaths[0];
            let relationColumn = qEntity[firstColumnPath[0]];
            firstColumnPath.reduce((last, current) => {
                relationColumn = relationColumn[current];
                return current;
            });
            entitySelectClause[dbColumn.index] = relationColumn;
        }
        else {
            entitySelectClause[dbColumn.index] = qEntity[dbColumn.propertyColumns[0].property.name];
        }
    }
    /*
        private addColumnToEntitySelect(
            dbColumn: DbColumn,
            entitySelectClause: any,
        ) {
            const dbRelation = dbColumn.relation;
            if (dbRelation) {
                let selectClauseFragment = entitySelectClause;
                let lastSelectClauseFragment;
                let sourceColumn = dbColumn;
                let lastPropertyName;
                do {
                    lastPropertyName = sourceColumn.property.name;
                    lastSelectClauseFragment = selectClauseFragment;
                    if (!lastSelectClauseFragment[lastPropertyName]) {
                        selectClauseFragment = {};
                        lastSelectClauseFragment[lastPropertyName] = selectClauseFragment;
                    } else {
                        selectClauseFragment = lastSelectClauseFragment[lastPropertyName];
                    }
                    const relationColumn = sourceColumn.relation.relationColumns.filter(
                        relationColumn => relationColumn.ownColumn.index === sourceColumn.index)[0];
                    sourceColumn = relationColumn.relationColumn;
                } while (sourceColumn.relation);
                lastSelectClauseFragment[lastPropertyName] = null;
            } else {
                entitySelectClause[dbColumn.property.name] = null;
            }
        }
    */
    handleNoId(dbColumn, dbProperty, propertyNameChains, value, noIdValueCallback) {
        if (noIdValueCallback) {
            if (!noIdValueCallback(dbColumn, value, propertyNameChains)) {
                return true;
            }
        }
        else {
            throw `Cannot retrieve composite Id value, value chain '${propertyNameChains.join('.')}' is : ${value}.`;
        }
        return false;
    }
}
SchemaUtils.TEMP_ID = 0;
exports.SchemaUtils = SchemaUtils;
//# sourceMappingURL=SchemaUtils.js.map