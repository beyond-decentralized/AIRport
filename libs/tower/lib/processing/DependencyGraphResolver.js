import { valuesEqual } from '@airport/air-control';
import { DI } from '@airport/di';
import { EntityRelationType } from '@airport/ground-control';
import { DEPENDENCY_GRAPH_RESOLVER } from '../tokens';
export class DependencyGraphResolver {
    getEntitiesToPersist(entities, ctx, operatedOnEntityIndicator, fromDependency) {
        const dependencyGraphNode = {
            dependsOn: fromDependency ? [fromDependency] : [],
            entities: []
        };
        for (const entity of entities) {
            const operationUniqueId = ctx.ioc.entityStateManager.getOperationUniqueId(entity);
            const entityOperatedOn = !!operatedOnEntityIndicator[operationUniqueId];
            operatedOnEntityIndicator[operationUniqueId]
                = true;
            // NOTE: Values should always be in only one place, rest should be stubs
            // with possible child objects (in case an object has to be in multiple
            // places in a graph)
            let foundValues = [];
            let entityIsStub = ctx.ioc.entityStateManager.isStub(entity);
            dependencyGraphNode.entities.push(entity);
            for (const dbProperty of ctx.dbEntity.properties) {
                let childEntities;
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
                            childEntities = [propertyValue];
                            break;
                        case EntityRelationType.ONE_TO_MANY:
                            this.assertOneToManyIsArray(propertyValue);
                            childEntities = propertyValue;
                            break;
                    }
                    if (childEntities) {
                        const dbEntity = dbRelation.relationEntity;
                        const previousDbEntity = dbEntity;
                        ctx.dbEntity = dbEntity;
                        const childDependencyGraph = this.getEntitiesToPersist(childEntities, ctx, operatedOnEntityIndicator);
                        ctx.dbEntity = previousDbEntity;
                    }
                } // if relation
            } // for properties
        } // for entities
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
    /*
     Values for the same column could be repeated in different places in the object graph.
     For example, if the same column is mapped to two different @ManyToOne relations.
     In this case, when persisting an entity we need to make sure that all values for the
     entity in question are being persisted.
     */
    columnProcessed(dbProperty, foundValues, dbColumn, value) {
        // if (value === undefined) {
        // 	throw new Error(`Values cannot be undefined, please use null.`);
        // }
        if (foundValues[dbColumn.index] === undefined) {
            foundValues[dbColumn.index] = value;
            return false;
        }
        if (!valuesEqual(foundValues[dbColumn.index], value)) {
            throw new Error(`Found value mismatch in '${dbProperty.entity.name}.${dbProperty.name}'
			(column: '${dbColumn.name}'): ${foundValues[dbColumn.index]} !== ${value}`);
        }
        return true;
    }
}
DI.set(DEPENDENCY_GRAPH_RESOLVER, DependencyGraphResolver);
//# sourceMappingURL=DependencyGraphResolver.js.map