var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApplicationUtils_1;
import { CRUDOperation, EntityRelationType, airEntity } from '@airport/ground-control';
import { Inject, Injected } from '@airport/direction-indicator';
import { convertToY, isY } from '@airport/tarmaq-query';
let ApplicationUtils = ApplicationUtils_1 = class ApplicationUtils {
    getDbEntity(applicationIndex, tableIndex) {
        return this.airportDatabase.applications[applicationIndex].currentVersion[0]
            .applicationVersion.entities[tableIndex];
    }
    isActorId(columnName) {
        return columnName === airEntity.ACTOR_LID;
    }
    isActorRecordId(columnName) {
        return columnName === airEntity.ACTOR_RECORD_ID;
    }
    isRepositoryId(columnName) {
        return columnName === airEntity.REPOSITORY_LID;
    }
    doCascade(dbRelation, crudOperation) {
        if (dbRelation.relationType !== EntityRelationType.ONE_TO_MANY) {
            return false;
        }
        if (!dbRelation.oneToManyElems) {
            return false;
        }
        switch (crudOperation) {
            case CRUDOperation.CREATE:
            case CRUDOperation.UPDATE:
            case CRUDOperation.DELETE:
                return true;
            default:
                throw new Error(`Unsupported CRUDOperation '${crudOperation}' for cascade check.`);
        }
    }
    getQEntityConstructor(dbEntity) {
        return this.airportDatabase.qApplications[dbEntity.applicationVersion.application.index]
            .__qConstructors__[dbEntity.index];
    }
    getEntityConstructor(dbEntity) {
        const entityConstructor = this.airportDatabase.qApplications[dbEntity.applicationVersion.application.index]
            .__constructors__[dbEntity.name];
        return entityConstructor;
    }
    getNewEntity(dbEntity) {
        const entityConstructor = this.getEntityConstructor(dbEntity);
        if (!entityConstructor) {
            return {};
        }
        return new entityConstructor();
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
                throw new Error(`@Id is not defined on entity '${dbEntity.name}'.`);
            }
            return null;
        }
        const idKeys = {
            arrayByIdColumnIndex: [],
            mapByIdColumnName: {}
        };
        for (const dbColumn of dbEntity.idColumns) {
            const [propertyNameChains, idValue] = this.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entityObject, true, failOnNoId);
            idValueCallback && idValueCallback(dbColumn, idValue, propertyNameChains);
            idKeys.arrayByIdColumnIndex.push(idValue);
            idKeys.mapByIdColumnName[dbColumn.name] = idValue;
        }
        return idKeys;
    }
    getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entityObject, forIdKey = false, generateNegativeIdsForMissing = true) {
        const columnValuesAndPaths = this.getColumnValuesAndPaths(dbColumn, entityObject, [], forIdKey, generateNegativeIdsForMissing);
        const firstColumnValueAndPath = columnValuesAndPaths[0];
        const propertyNameChains = [firstColumnValueAndPath.path];
        const value = firstColumnValueAndPath.value;
        columnValuesAndPaths.reduce((last, current) => {
            if (!this.utils.valuesEqual(last.value, current.value, true)) {
                throw new Error(`Values differ for ${dbEntity.name}.${dbColumn.name}:
						'${last.path.join('.')}' = ${last.value}
						'${current.path.join('.')}' = ${current.value}`);
            }
            propertyNameChains.push(current.path);
            return current;
        });
        return [propertyNameChains, value];
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
                    this.entityStateManager.markAsStub(propertyObject);
                    propertySelectClause[propertyNameLink] = propertyObject;
                }
                else {
                    if (index < firstPropertyNameChain.length - 1) {
                        if (!(propertyObject instanceof Object) || propertyObject instanceof Date) {
                            throw new Error(`Invalid entry:
								...
								{
									...
									${propertyNameLink}: ${propertyObject}
								}
								in '${dbRelation.property.entity.name}.${dbRelation.property.name}',
								Property must be an Object.`);
                        }
                    }
                    else {
                        if (!allowDefaults && !isY(propertyObject)) {
                            const reason = dbRelation.property.isId
                                ? `'${dbRelation.property.entity.name}.${dbRelation.property.name}' is an @Id property`
                                : `'${dbRelation.property.entity.name}' has no @Id - all properties are treated as @Ids`;
                            throw new Error(`Defaults are not allowed in:
								...
								{
									...
									${propertyNameLink}: ${propertyObject}
								}
								${reason}.`);
                        }
                        convertTo = false;
                    }
                }
                propertySelectClause = propertyObject;
            });
            if (convertTo) {
                convertToY(propertySelectClause);
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
    getSheetSelectFromSetClause(dbEntity, qEntity, setClause, errorPrefix) {
        const selectClause = [];
        let actorIdColumnIndex;
        let actorRecordIdColumnIndex;
        let repositoryIdColumnIndex;
        let systemWideOperationIdColumn;
        for (const columnIndex in dbEntity.columns) {
            const dbColumn = dbEntity.columns[columnIndex];
            let dbProperty;
            const isIdColumn = dbColumn.propertyColumns.some(propertyColumn => {
                dbProperty = propertyColumn.property;
                return dbProperty.isId;
            });
            let nonIdColumnSet = false;
            if (isIdColumn) {
                if (setClause[dbColumn.name]) {
                    throw new Error(errorPrefix + `Cannot update @Id column '${dbColumn.name}' 
of property '${dbEntity.name}.${dbProperty.name}'.`);
                }
                this.addColumnToSheetSelect(dbColumn, qEntity, selectClause);
            }
            else if (setClause[dbColumn.name]) {
                nonIdColumnSet = true;
                this.addColumnToSheetSelect(dbColumn, qEntity, selectClause);
                // } else {
                // entitySelectClause[dbColumn.index] = null;
            }
            const inQueryColumnIndex = selectClause.length - 1;
            switch (dbColumn.name) {
                case airEntity.ACTOR_LID:
                    actorIdColumnIndex = inQueryColumnIndex;
                    break;
                case airEntity.ACTOR_RECORD_ID:
                    actorRecordIdColumnIndex = inQueryColumnIndex;
                    break;
                case airEntity.REPOSITORY_LID:
                    repositoryIdColumnIndex = inQueryColumnIndex;
                    break;
                case airEntity.SYSTEM_WIDE_OPERATION_ID:
                    if (nonIdColumnSet) {
                        throw new Error(errorPrefix +
                            `Cannot update 'systemWideOperationId' of Repository Entities.`);
                    }
                    systemWideOperationIdColumn = dbColumn;
                    break;
            }
        }
        return {
            actorIdColumnIndex,
            actorRecordIdColumnIndex,
            repositoryIdColumnIndex,
            selectClause,
            systemWideOperationIdColumn
        };
    }
    getColumnValuesAndPaths(dbColumn, relationObject, breadCrumb, forIdKey = false, generateNegativeIdsForMissing = true
    // noIdValueCallback: {
    // 	(
    // 		relationColumn: DbColumn,
    // 		value: any,
    // 		propertyNameChains: string[][],
    // 	): void;
    // }
    ) {
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
                        throw new Error(`Cannot retrieve composite Id value, value chain '${relationBreadCrumb.join('.')}' is : ${value}.`);
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
                    if (generateNegativeIdsForMissing) {
                        value = --ApplicationUtils_1.TEMP_ID;
                    }
                    else {
                        value = null;
                    }
                    relationObject[propertyName] = value;
                }
                else {
                    // if (this.handleNoId(dbColumn, dbProperty, propertyBreadCrumb, value,
                    // noValueCallback)) { return null; }
                    throw new Error(`Cannot retrieve composite Id value, value chain '${propertyBreadCrumb.join('.')}' is : ${value}.`);
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
    addColumnToSheetSelect(dbColumn, qEntity, entitySelectClause) {
        if (this.isManyRelationColumn(dbColumn)) {
            const columnPaths = this.getColumnPaths(dbColumn, []);
            const firstColumnPath = columnPaths[0];
            let relationColumn = qEntity[firstColumnPath[0]];
            firstColumnPath.reduce((last, current) => {
                relationColumn = relationColumn[current];
                return current;
            });
            entitySelectClause.push(relationColumn);
        }
        else {
            entitySelectClause.push(qEntity[dbColumn.propertyColumns[0].property.name]);
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
            throw new Error(`Cannot retrieve composite Id value, value chain '${propertyNameChains.join('.')}' is : ${value}.`);
        }
        return false;
    }
};
ApplicationUtils.TEMP_ID = 0;
__decorate([
    Inject()
], ApplicationUtils.prototype, "airportDatabase", void 0);
__decorate([
    Inject()
], ApplicationUtils.prototype, "entityStateManager", void 0);
__decorate([
    Inject()
], ApplicationUtils.prototype, "utils", void 0);
ApplicationUtils = ApplicationUtils_1 = __decorate([
    Injected()
], ApplicationUtils);
export { ApplicationUtils };
//# sourceMappingURL=ApplicationUtils.js.map