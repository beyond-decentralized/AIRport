import { EntityState } from '@airport/air-control';
import { DI } from '@airport/di';
import { EntityRelationType, OperationType } from '@airport/ground-control';
import { ENTITY_VALIDATOR } from './tokens';
export class EntityValidator {
    async validate(entities, operatedOnEntityIndicator, operationType, context) {
        const dbEntity = context.dbEntity;
        if (!dbEntity.idColumns.length) {
            throw new Error(`Cannot run 'save' for entity '${dbEntity.name}' with no @Id(s).
					Please use non-entity operations (like 'insert' or 'updateWhere') instead.`);
        }
        let isCreate, isDelete, isUpdate, isStub;
        for (const entity of entities) {
            const entityState = context.ioc.entityStateManager.getEntityState(entity);
            switch (entityState) {
                case EntityState.CREATE:
                    isCreate = true;
                    break;
                case EntityState.DELETE:
                    isDelete = true;
                    break;
                case EntityState.UPDATE:
                    isUpdate = true;
                    break;
                case EntityState.STUB:
                    isStub = true;
                default:
                    throw new Error(`Unexpected entity state for ${dbEntity.name}: ${entityState}`);
            }
            const operationUniqueId = context.ioc.entityStateManager.getOperationUniqueId(entity);
            const entityOperatedOn = !!operatedOnEntityIndicator[operationUniqueId];
            if (entityOperatedOn) {
                continue;
            }
            operatedOnEntityIndicator[operationUniqueId] = true;
            for (const dbProperty of dbEntity.properties) {
                let propertyValue = entity[dbProperty.name];
                if (propertyValue === undefined) {
                    propertyValue = null;
                    entity[dbProperty.name] = propertyValue;
                }
                /*
                 * A passed in graph has either entities to be saved or
                 * entity stubs that are needed structurally to get to
                 * other entities.
                 *
                 * It is possible for the @Id's of an entity to be in
                 * a @ManyToOne, so we need to check
                 */
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    this.assertRelationValueIsAnObject(propertyValue, dbProperty);
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            this.assertManyToOneNotArray(propertyValue, dbProperty);
                            context.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, columnValue, propertyNameChains) => {
                                const isIdColumnEmpty = context.ioc.schemaUtils.isIdEmpty(columnValue);
                                if (dbColumn.idIndex || dbColumn.idIndex === 0) {
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
                                    if (context.ioc.schemaUtils.isRepositoryId(dbColumn.name)) {
                                        if (context.ioc.schemaUtils.isEmpty(columnValue)) {
                                            throw new Error(`Repository Id must be specified on an insert for
							 ${dbEntity.name}.${dbProperty.name},
											column:  ${dbColumn.name}`);
                                        }
                                    }
                                }
                                else if (dbColumn.isGenerated && isCreate && !isIdColumnEmpty) {
                                    throw new Error(`@GeneratedValue column must not have a value for create for
${dbEntity.name}.${dbProperty.name},
column:  ${dbColumn.name}`);
                                }
                            }, false);
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            this.assertOneToManyIsArray(propertyValue, dbProperty);
                            validate(propertyValue, operatedOnEntityIndicator, boolean[], operationType, OperationType, context, IOperationContext < E, EntityCascadeGraph > );
                            break;
                    } // switch dbRelation.relationType
                } // if (dbProperty.relation
            } // for (const dbProperty
        } // for (const entity
    }
    assertRelationValueIsAnObject(relationValue, dbProperty) {
        if (relationValue !== null && relationValue !== undefined &&
            (typeof relationValue != 'object' || relationValue instanceof Date)) {
            throw new Error(`Unexpected value in relation property: ${dbProperty.name}, 
				of entity ${dbProperty.entity.name}`);
        }
    }
    assertManyToOneNotArray(relationValue, dbProperty) {
        if (relationValue instanceof Array) {
            throw new Error(`@ManyToOne relation cannot be an array. Relation property: ${dbProperty.name}, 
of entity ${dbProperty.entity.name}`);
        }
    }
    assertOneToManyIsArray(relationValue, dbProperty) {
        if (relationValue !== null
            && relationValue !== undefined
            && !(relationValue instanceof Array)) {
            throw new Error(`@OneToMany relation must be an array. Relation property: ${dbProperty.name}, 
of entity ${dbProperty.entity.name}\``);
        }
    }
}
DI.set(ENTITY_VALIDATOR, EntityValidator);
//# sourceMappingURL=EntityValidator.js.map