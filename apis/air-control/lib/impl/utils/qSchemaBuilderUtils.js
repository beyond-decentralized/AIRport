"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const Entity_1 = require("../core/entity/Entity");
const OneToManyRelation_1 = require("../core/entity/OneToManyRelation");
const Relation_1 = require("../core/entity/Relation");
const BooleanField_1 = require("../core/field/BooleanField");
const DateField_1 = require("../core/field/DateField");
const NumberField_1 = require("../core/field/NumberField");
const StringField_1 = require("../core/field/StringField");
const UntypedField_1 = require("../core/field/UntypedField");
/**
 * From:
 * http://js-bits.blogspot.com/2010/08/javascript-inheritance-done-right.html
 * Via:
 * https://stackoverflow.com/questions/6617780/how-to-call-parent-constructor
 */
function extend(base, sub, methods) {
    sub.prototype = Object.create(base.prototype);
    sub.prototype.constructor = sub;
    sub.base = base.prototype;
    // Copy the methods passed in to the prototype
    for (const name in methods) {
        sub.prototype[name] = methods[name];
    }
    // so we can define the constructor inline
    return sub;
}
exports.extend = extend;
function getColumnQField(entity, property, q, utils, column = property.propertyColumns[0].column) {
    switch (column.type) {
        case ground_control_1.SQLDataType.ANY:
            return new UntypedField_1.QUntypedField(column, property, q, utils);
        case ground_control_1.SQLDataType.BOOLEAN:
            return new BooleanField_1.QBooleanField(column, property, q, utils);
        case ground_control_1.SQLDataType.DATE:
            return new DateField_1.QDateField(column, property, q, utils);
        case ground_control_1.SQLDataType.NUMBER:
            return new NumberField_1.QNumberField(column, property, q, utils);
        case ground_control_1.SQLDataType.JSON:
        case ground_control_1.SQLDataType.STRING:
            return new StringField_1.QStringField(column, property, q, utils);
    }
}
exports.getColumnQField = getColumnQField;
function getQRelation(entity, property, q, utils, allQSchemas) {
    const relation = property.relation[0];
    switch (relation.relationType) {
        case ground_control_1.EntityRelationType.MANY_TO_ONE:
            const relationEntity = relation.relationEntity;
            const relationSchema = relationEntity.schemaVersion.schema;
            const qIdRelationConstructor = allQSchemas[relationSchema.index]
                .__qIdRelationConstructors__[relationEntity.index];
            return new qIdRelationConstructor(entity, property, q, utils);
        case ground_control_1.EntityRelationType.ONE_TO_MANY:
            return new OneToManyRelation_1.QOneToManyRelation(relation, q);
        default:
            throw new Error(`Unknown EntityRelationType: ${relation.relationType}.`);
    }
}
exports.getQRelation = getQRelation;
function getQEntityConstructor(allQSchemas) {
    function ChildQEntity(entity) {
        ChildQEntity.base.constructor.call(this, entity);
        entity.properties.forEach((property) => {
            let qFieldOrRelation;
            if (property.relation && property.relation.length) {
                qFieldOrRelation = getQRelation(entity, property, this, this.utils, allQSchemas);
            }
            else {
                qFieldOrRelation = getColumnQField(entity, property, this, this.utils);
            }
            this[property.name] = qFieldOrRelation;
        });
        entity.__qConstructor__ = ChildQEntity;
    }
    extend(Entity_1.QEntity, ChildQEntity, {});
    return ChildQEntity;
}
exports.getQEntityConstructor = getQEntityConstructor;
function getQEntityIdRelationConstructor() {
    function QEntityIdRelation(entity, relation, qEntity, utils) {
        QEntityIdRelation.base.constructor.call(this, relation, qEntity);
        getQEntityIdFields(this, entity, utils);
        // (<any>entity).__qConstructor__.__qIdRelationConstructor__ = QEntityIdRelation
    }
    extend(Relation_1.QRelation, QEntityIdRelation, {});
    return QEntityIdRelation;
}
exports.getQEntityIdRelationConstructor = getQEntityIdRelationConstructor;
function getQEntityIdFields(addToObject, entity, utils, parentProperty, relationColumnMap) {
    entity.properties.forEach((property) => {
        if (!property.isId) {
            return;
        }
        let qFieldOrRelation;
        const currentProperty = parentProperty ? parentProperty : property;
        if (property.relation && property.relation.length) {
            const parentRelation = parentProperty.relation[0];
            if (!parentProperty) {
                relationColumnMap = new Map();
                const relationColumns = parentRelation.manyRelationColumns;
                for (const relationColumn of relationColumns) {
                    relationColumnMap.set(relationColumn.oneColumn, relationColumn.manyColumn);
                }
            }
            else {
                const relationColumns = parentRelation.manyRelationColumns;
                for (const relationColumn of relationColumns) {
                    const originalColumn = relationColumnMap.get(relationColumn.manyColumn);
                    relationColumnMap.delete(relationColumn.manyColumn);
                    relationColumnMap.set(relationColumn.oneColumn, originalColumn);
                }
            }
            qFieldOrRelation = getQEntityIdFields({}, parentRelation.relationEntity, utils, currentProperty, relationColumnMap);
        }
        else {
            let originalColumn = property.propertyColumns[0].column;
            if (relationColumnMap) {
                originalColumn = relationColumnMap.get(originalColumn);
            }
            qFieldOrRelation = getColumnQField(entity, currentProperty, this, utils, originalColumn);
        }
        addToObject[property.name] = qFieldOrRelation;
    });
}
exports.getQEntityIdFields = getQEntityIdFields;
function setQSchemaEntities(schema, qSchema, allQSchemas) {
    const entities = orderEntitiesByIdDependencies(schema.currentVersion.entities);
    // NOTE: only need to compute the keys of entities for Many-to-One(s)
    // Many-to-Ones must reference the table by primary key in order to
    // guarantee a single record.  Any other type of join may return multiple
    // records is is in fact a Many-to-Many
    entities.forEach((entity) => {
        // NOTE: an @Id column is guaranteed to be present in only one property
        for (const idColumn of entity.idColumns) {
            if (idColumn.manyRelationColumns
                && idColumn.manyRelationColumns.length) {
                const idRelation = idColumn.manyRelationColumns[0].oneRelation;
                const relatedEntity = idRelation.relationEntity;
                const relatedQSchema = allQSchemas[relatedEntity.schemaVersion.schema.index];
                if (!relatedQSchema) {
                    throw new Error(`QSchema not yet initialized for ID relation:
					${entity.name}.${idRelation.property.name}
					`);
                }
                const relatedQEntityConstructor = qSchema.__qConstructors__[relatedEntity.index];
                if (!relatedQEntityConstructor) {
                    throw new Error(`QEntity not yet initialized for ID relation:
					${entity.name}.${idRelation.property.name}
					`);
                }
            }
        }
    });
    entities.forEach((entity) => {
        const qIdRelationConstructor = getQEntityIdRelationConstructor();
        qSchema.__qIdRelationConstructors__[entity.index] = qIdRelationConstructor;
    });
    // TODO: compute many-to-many relations
    entities.forEach((entity) => {
        const qConstructor = getQEntityConstructor(allQSchemas);
        qSchema.__qConstructors__[entity.index] = qConstructor;
        Object.defineProperty(qSchema, entity.name, {
            get: function () {
                return new this.__qConstructors__[entity.name](entity);
            }
        });
    });
}
exports.setQSchemaEntities = setQSchemaEntities;
function orderSchemasInOrderOfPrecedence(schemas) {
    const schemaWithDepsMap = new Map();
    const schemasWithDeps = schemas.map(schema => {
        const dependencies = new Set();
        for (const schemaReference of schema.currentVersion.references) {
            dependencies.add(schemaReference.referencedSchemaVersion.schema.index);
        }
        const schemaWithDependencies = {
            schema,
            dependencies
        };
        schemaWithDepsMap.set(schema.index, schemaWithDependencies);
        return schemaWithDependencies;
    });
    schemasWithDeps.sort((orderedSchema1, orderedSchema2) => {
        if (schemaDependsOn(orderedSchema1, orderedSchema2.schema.index, schemaWithDepsMap)) {
            return 1;
        }
        else if (schemaDependsOn(orderedSchema2, orderedSchema1.schema.index, schemaWithDepsMap)) {
            return -1;
        }
        return 0;
    });
    return schemasWithDeps.map(schemaWithDeps => schemaWithDeps.schema);
}
exports.orderSchemasInOrderOfPrecedence = orderSchemasInOrderOfPrecedence;
function schemaDependsOn(dependantSchema, dependsOnSchemaIndex, schemaWithDepsMap) {
    if (dependantSchema.dependencies.has(dependsOnSchemaIndex)) {
        return true;
    }
    // for(const dependencySchemaIndex of dependantSchema.dependencies) {
    //
    // }
    return false;
}
exports.schemaDependsOn = schemaDependsOn;
function orderEntitiesByIdDependencies(entities) {
    const entityWithDepsMap = new Map();
    const entitiesWithDeps = entities.map(entity => {
        const dependencies = new Set();
        for (const relation of entity.relations) {
            switch (relation.relationType) {
                case ground_control_1.EntityRelationType.MANY_TO_ONE:
                    dependencies.add(relation.relationEntity.index);
                    break;
                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                    continue;
                default:
                    throw new Error(`Unsupported relation type: ${relation.relationType}`);
            }
        }
        const entityWithDependencies = {
            entity,
            dependencies
        };
        entityWithDepsMap.set(entity.index, entityWithDependencies);
        return entityWithDependencies;
    });
    entitiesWithDeps.sort((orderedEntity1, orderedEntity2) => {
        if (entityDependsOn(orderedEntity1, orderedEntity2.entity.index, entityWithDepsMap)) {
            return 1;
        }
        else if (entityDependsOn(orderedEntity2, orderedEntity1.entity.index, entityWithDepsMap)) {
            return -1;
        }
        return 0;
    });
    return entitiesWithDeps.map(entityWithDeps => entityWithDeps.entity);
}
exports.orderEntitiesByIdDependencies = orderEntitiesByIdDependencies;
function entityDependsOn(dependantEntity, dependsOnEntityIndex, entityWithDepsMap) {
    if (dependantEntity.dependencies.has(dependsOnEntityIndex)) {
        return true;
    }
    // for(const dependencyEntityIndex of dependantEntity.dependencies) {
    //
    // }
    return false;
}
exports.entityDependsOn = entityDependsOn;
//# sourceMappingURL=qSchemaBuilderUtils.js.map