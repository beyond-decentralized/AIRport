import { getOperationUniqueId, isStub } from '@airport/air-control';
import { EntityRelationType } from '@airport/ground-control';
export class DependencyGraph {
    getEntitiesToPersist(entities, ctx, operatedOnEntityIndicator) {
        for (const entity of entities) {
            const operationUniqueId = getOperationUniqueId(entity);
            const entityOperatedOn = !!operatedOnEntityIndicator[operationUniqueId];
            operatedOnEntityIndicator[operationUniqueId] = true;
            if (isStub(entity)) {
            }
            for (const dbProperty of ctx.dbEntity.properties) {
                let propertyValue = entity[dbProperty.name];
                if (propertyValue === undefined) {
                    propertyValue = null;
                }
                if (dbProperty.relation && dbProperty.relation.length) {
                    const dbRelation = dbProperty.relation[0];
                    this.assertRelationValueIsAnObject(propertyValue, dbProperty);
                    switch (dbRelation.relationType) {
                        case EntityRelationType.MANY_TO_ONE:
                            this.assertManyToOneNotArray(propertyValue);
                            ctx.ioc.schemaUtils.forEachColumnOfRelation(dbRelation, entity, (dbColumn, columnValue, propertyNameChains) => {
                                if (dbProperty.isId) {
                                    if (ctx.ioc.schemaUtils.isIdEmpty(columnValue)) {
                                        throw new Error(`non-@GeneratedValue() @Id() ${ctx.dbEntity.name}.${dbProperty.name} 
											must have a value for 'create' operations.`);
                                    }
                                }
                                if (ctx.ioc.schemaUtils.isRepositoryId(dbColumn.name)) {
                                    if (ctx.ioc.schemaUtils.isEmpty(columnValue)) {
                                        throw new Error(`Repository Id must be specified on an insert`);
                                    }
                                }
                                this.columnProcessed(dbProperty, foundValues, dbColumn, columnValue);
                                if (dbColumn.isGenerated && dbProperty.isId && columnValue < 0) {
                                    // Do not insert negative integers for temporary identification
                                    // within the circular dependency management lookup
                                    return;
                                }
                                valuesFragment[columnIndexesInValues[dbColumn.index]]
                                    = columnValue === undefined ? null : columnValue;
                            }, false);
                            // Cascading on manyToOne is not currently implemented, nothing else needs
                            // to be done
                            continue;
                        case EntityRelationType.ONE_TO_MANY:
                            this.checkCascade(newValue, dbProperty, dbRelation, ctx.ioc.schemaUtils, CRUDOperation.CREATE, cascadeRecords);
                            break;
                    }
                }
            }
        }
        return [];
    }
    assertRelationValueIsAnObject(relationValue, dbProperty) {
        if (relationValue !== null && relationValue !== undefined &&
            (typeof relationValue != 'object' || relationValue instanceof Date)) {
            throw new Error(`Unexpected value in relation property: ${dbProperty.name}, 
				of entity ${dbProperty.entity.name}`);
        }
    }
    assertManyToOneNotArray(relationValue) {
        if (relationValue instanceof Array) {
            throw new Error(`@ManyToOne relation cannot be an array`);
        }
    }
    assertOneToManyIsArray(relationValue) {
        if (relationValue !== null
            && relationValue !== undefined
            && !(relationValue instanceof Array)) {
            throw new Error(`@OneToMany relation must be an array`);
        }
    }
}
//# sourceMappingURL=DependencyGraph.js.map