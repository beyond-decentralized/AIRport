var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { EntityRelationType, EntityState, SQLDataType } from '@airport/ground-control';
let StructuralEntityValidator = class StructuralEntityValidator {
    validate(records, operatedOnEntityIndicator, context, fromOneToMany = false, parentRelationProperty = null, rootRelationRecord = null, parentRelationRecord = null) {
        const missingRepositoryRecords = [];
        const dbEntity = context.dbEntity;
        if (!dbEntity.idColumns.length) {
            throw new Error(`Cannot run 'save' for entity '${dbEntity.name}' with no @Id(s).
					Please use non-entity operations (like 'insert' or 'updateWhere') instead.`);
        }
        let haveRootRelationRecord = !!rootRelationRecord;
        for (const record of records) {
            if (!haveRootRelationRecord) {
                rootRelationRecord = record;
            }
            const { isCreate, isParentId, isStub } = this.entityStateManager.getEntityStateTypeAsFlags(record, dbEntity);
            if (isParentId) {
                // No processing is needed (already covered by id check)
                continue;
            }
            const operationUniqueId = this.entityStateManager.getOperationUniqueId(record);
            const entityOperatedOn = !!operatedOnEntityIndicator[operationUniqueId];
            if (entityOperatedOn) {
                continue;
            }
            operatedOnEntityIndicator[operationUniqueId] = true;
            let newRepositoryNeeded = false;
            for (const dbProperty of dbEntity.properties) {
                let propertyValue = record[dbProperty.name];
                if (propertyValue === undefined && !isStub) {
                    propertyValue = null;
                    record[dbProperty.name] = propertyValue;
                }
                /*
                 * It is possible for the @Id's of an entity to be in
                 * a @ManyToOne, so we need to check
                 */
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    let relatedEntities = null;
                    let relationIsOneToMany = false;
                    let isRelationNullable = true;
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            // Id columns are for the parent (currently processed) entity and must be
                            // checked as part of this entity
                            if (dbProperty.isId) {
                                let isMissingRepositoryProperty = false;
                                this.applicationUtils.forEachColumnOfRelation(dbRelation, record, (dbColumn, columnValue, _propertyNameChains) => {
                                    if (dbColumn.notNull) {
                                        isRelationNullable = false;
                                    }
                                    if (this.isRepositoryColumnAndNewRepositoryNeed(dbEntity, dbProperty, dbColumn, isCreate, record, columnValue, context)) {
                                        isMissingRepositoryProperty = true;
                                    }
                                }, false);
                                if (isMissingRepositoryProperty) {
                                    if (!context.newRepository) {
                                        newRepositoryNeeded = true;
                                        missingRepositoryRecords.push({
                                            record,
                                            repositoryPropertyName: dbProperty.name
                                        });
                                    }
                                    else {
                                        record[dbProperty.name] = context.newRepository;
                                    }
                                }
                            }
                            if (fromOneToMany) {
                                const parentOneToManyElems = parentRelationProperty.relation[0].oneToManyElems;
                                const parentMappedBy = parentOneToManyElems ? parentOneToManyElems.mappedBy : null;
                                const mappedBy = dbRelation.manyToOneElems ? dbRelation.manyToOneElems.mappedBy : null;
                                // NOTE: 'actor' or the 'repository' property may be automatically populated
                                // in the entity by this.validateRelationColumn
                                if (parentMappedBy === dbProperty.name
                                    || mappedBy === parentRelationProperty.name) {
                                    // Always fix to the parent record
                                    record[dbProperty.name] = parentRelationRecord;
                                    // if (!propertyValue && !entity[dbProperty.name]) {
                                    // 	// The @ManyToOne side of the relationship is missing, add it
                                    // 	entity[dbProperty.name] = parentRelationEntity
                                    // }
                                }
                            }
                            if (propertyValue) {
                                if (propertyValue) {
                                    relatedEntities = [propertyValue];
                                }
                                else if (!isRelationNullable) {
                                    throw new Error(`Non-nullable relation ${dbEntity.name}.${dbProperty.name} does not have value assigned`);
                                }
                                else {
                                    console.warn(`Probably OK: Nullable @ManyToOne ${dbEntity.name}.${dbProperty.name} does not have anything assigned.`);
                                }
                            }
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            relationIsOneToMany = true;
                            relatedEntities = propertyValue;
                            break;
                        default:
                            throw new Error(`Unexpected relation type ${dbRelation.relationType}
for ${dbEntity.name}.${dbProperty.name}`);
                    } // switch dbRelation.relationType
                    if (relatedEntities && relatedEntities.length) {
                        const previousDbEntity = context.dbEntity;
                        context.dbEntity = dbRelation.relationEntity;
                        this.validate(relatedEntities, operatedOnEntityIndicator, context, relationIsOneToMany, dbProperty, rootRelationRecord, record);
                        context.dbEntity = previousDbEntity;
                    }
                } // if (dbProperty.relation // If is a relation property
                else {
                    const dbColumn = dbProperty.propertyColumns[0].column;
                    if (dbProperty.isId) {
                        const isIdColumnEmpty = this.applicationUtils.isIdEmpty(propertyValue);
                        this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty);
                    }
                    else {
                        if (isStub || isParentId) {
                            if (propertyValue !== undefined) {
                                throw new Error(`Unexpected non-@Id value Stub|ParentId|Deleted record.
Property: ${dbEntity.name}.${dbProperty.name}, with "${this.entityStateManager.getUniqueIdFieldName()}":  ${operationUniqueId}`);
                            }
                        }
                    }
                    this.ensureNonRelationalValue(dbProperty, dbColumn, propertyValue);
                } // else (dbProperty.relation  // If not a relation property
            } // for (const dbProperty of dbEntity.properties)
            this.ensureRepositoryValidity(record, rootRelationRecord, parentRelationRecord, dbEntity, parentRelationProperty, isCreate, fromOneToMany, newRepositoryNeeded, context);
        } // for (const record of entities)
        return missingRepositoryRecords;
    }
    ensureRepositoryValidity(record, rootRelationRecord, parentRelationRecord, dbEntity, parentRelationProperty, isCreate, fromOneToMany, newRepositoryNeeded, context) {
        if (!dbEntity.isRepositoryEntity) {
            return;
        }
        if (!parentRelationRecord) {
            const originalValues = this.entityStateManager.getOriginalValues(record);
            if (newRepositoryNeeded && originalValues && originalValues.repository
                && originalValues.actor && originalValues.actorRecordId) {
                const repositoryEntity = record;
                repositoryEntity.originalRepository = originalValues.repository;
                this.entityStateManager.markAsStub(repositoryEntity.originalRepository);
                repositoryEntity.originalActor = originalValues.actor;
                this.entityStateManager.markAsStub(repositoryEntity.originalActor);
                repositoryEntity.originalActorRecordId = originalValues.actorRecordId;
            }
            return;
        }
        if (newRepositoryNeeded) {
            throw new Error(`Error creating a new repository in a nested record:
In Entity: ${dbEntity.name}
That is a child of ${parentRelationProperty.entity.name} via ${parentRelationProperty.entity.name}.${parentRelationProperty.name}
->
When creating a new repository the top level record should be of the newly created repository.
`);
        }
        // One to many get traversed as well, if it's in the input graph/tree
        // it is assumed to be part of the same repository
        // if (fromOneToMany) {
        // 	return
        // }
        let repositoryEntity = record;
        // If the repositories of parent record and child record match
        if (rootRelationRecord.repository.id === repositoryEntity.repository.id) {
            // no further checks needed
            return;
        }
        if (isCreate) {
            throw new Error(`A newly created ${dbEntity.name} via ${dbEntity.name} record for repository id ${repositoryEntity.repository.id} (UUID: ${repositoryEntity.repository.id})
is being assigned to repository id ${repositoryEntity.repository.id} (UUID: ${repositoryEntity.repository.id})
	This is because it is being referenced via ${parentRelationProperty.entity.name}.${parentRelationProperty.name},
	from a record of repository id ${repositoryEntity.repository.id} (UUID: ${repositoryEntity.repository.id})
	
	If you are manually creating a copy of a record in another repository, there is no need,
	AIRport automatically copies all records refrenced via @ManyToOne()s into the created/modified
	repository.

	Otherwise, did you mean to set this record's repository to the same one as the referencing record?`);
        }
        // If it doesn't then it is a reference to another repository - switch
        // the record to the parent repository and set the originalRepositoryValue
        repositoryEntity.originalRepository = repositoryEntity.repository;
        repositoryEntity.repository = rootRelationRecord.repository;
        // Aslo set originalActor and originalActorRecordId to look up the original record
        repositoryEntity.originalActor = repositoryEntity.actor;
        repositoryEntity.originalActorRecordId = repositoryEntity.actorRecordId;
        // reset 'actor' and clear 'actorRecordId' to prevents unique constraint
        // violation if multiple databases flip to the same exact record (independently)
        repositoryEntity.actor = context.actor;
        delete repositoryEntity.actorRecordId;
        // Flip the state of this record to EntityState.CREATE this record now
        // has to be created in the referencing repository
        repositoryEntity[this.entityStateManager.getStateFieldName()] = EntityState.CREATE;
        // NOTE: If the child record is not provided and it's an optional
        // @ManyToOne() it will be treated as if no record is there.  That is
        // probaby the only correct way to handle it and a warning is
        // shown to the user in this case
    }
    isRepositoryColumnAndNewRepositoryNeed(dbEntity, dbProperty, dbColumn, isCreate, entity, columnValue, context) {
        if (!dbColumn.idIndex && dbColumn.idIndex !== 0) {
            return;
        }
        const isIdColumnEmpty = this.applicationUtils.isIdEmpty(columnValue);
        if (!dbEntity.isRepositoryEntity) {
            this.ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty);
            return false;
        }
        if (!isIdColumnEmpty) {
            if (isCreate) {
                if (this.applicationUtils.isActorId(dbColumn.name)) {
                    throw new Error(`Actor cannot be passed in for create Operations`);
                }
            }
            return false;
        }
        if (!isCreate) {
            throw new Error(`Ids must be populated in entities for non-Create operations`);
        }
        if (this.applicationUtils.isRepositoryId(dbColumn.name)) {
            // Repository was not provided - use context's 'newRepository'
            return true;
        }
        else if (this.applicationUtils.isActorId(dbColumn.name)) {
            // Use context's 'actor'
            entity[dbProperty.name] = context.actor;
            return false;
        }
        else if (this.applicationUtils.isActorRecordId(dbColumn.name)) {
            return false;
        }
        throw new Error(`Unexpected @Id column '${dbColumn.name}' in a Repository Entity.`);
    }
    ensureIdValue(dbEntity, dbProperty, dbColumn, isCreate, isIdColumnEmpty) {
        if (dbColumn.isGenerated) {
            if (isCreate && !isIdColumnEmpty) {
                throw new Error(`@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name},
column:  ${dbColumn.name}
must NOT have a value for entity Insert operation.`);
            }
            else if (!isCreate && isIdColumnEmpty) {
                throw new Error(`@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name} 
column:  ${dbColumn.name}
must have a value for entity non-Insert operations.`);
            }
        }
        else if (isIdColumnEmpty) {
            throw new Error(`non-@GeneratedValue() @Id() ${dbEntity.name}.${dbProperty.name},
column:  ${dbColumn.name}
must always have a value for all entity operations.`);
        }
    }
    ensureNonRelationalValue(dbProperty, dbColumn, value) {
        if (value === undefined || value === null) {
            return;
        }
        switch (dbColumn.type) {
            case SQLDataType.ANY:
                break;
            case SQLDataType.BOOLEAN:
                if (typeof value !== 'boolean') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case SQLDataType.DATE:
                if (typeof value !== 'object' || !(value instanceof Date)) {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case SQLDataType.JSON:
                if (typeof value !== 'object' || value instanceof Date) {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case SQLDataType.NUMBER:
                if (typeof value !== 'number') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
            case SQLDataType.STRING:
                if (typeof value !== 'string') {
                    this.throwUnexpectedProperty(dbProperty, dbColumn, value);
                }
                break;
        }
    }
    throwUnexpectedProperty(dbProperty, dbColumn, value) {
        throw new Error(`Unexpected property value '${value.toString()}' in property '${dbProperty.entity.name}.${dbProperty.name}'
		(column: '${dbColumn.name}').`);
    }
};
__decorate([
    Inject()
], StructuralEntityValidator.prototype, "applicationUtils", void 0);
__decorate([
    Inject()
], StructuralEntityValidator.prototype, "entityStateManager", void 0);
StructuralEntityValidator = __decorate([
    Injected()
], StructuralEntityValidator);
export { StructuralEntityValidator };
//# sourceMappingURL=StructuralEntityValidator.js.map