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
function getColumnQField(entity, property, q, column) {
    switch (column.type) {
        case ground_control_1.SQLDataType.ANY:
            return new UntypedField_1.QUntypedField(column, property, q);
        case ground_control_1.SQLDataType.BOOLEAN:
            return new BooleanField_1.QBooleanField(column, property, q);
        case ground_control_1.SQLDataType.DATE:
            return new DateField_1.QDateField(column, property, q);
        case ground_control_1.SQLDataType.NUMBER:
            return new NumberField_1.QNumberField(column, property, q);
        case ground_control_1.SQLDataType.JSON:
        case ground_control_1.SQLDataType.STRING:
            return new StringField_1.QStringField(column, property, q);
    }
}
exports.getColumnQField = getColumnQField;
function getQRelation(entity, property, q, allQSchemas) {
    const relation = property.relation[0];
    switch (relation.relationType) {
        case ground_control_1.EntityRelationType.MANY_TO_ONE:
            const relationEntity = relation.relationEntity;
            const relationSchema = relationEntity.schemaVersion.schema;
            const qIdRelationConstructor = allQSchemas[relationSchema.index]
                .__qIdRelationConstructors__[relationEntity.index];
            // return new qIdRelationConstructor(relationEntity, property, q)
            return new qIdRelationConstructor(relation, q);
        case ground_control_1.EntityRelationType.ONE_TO_MANY:
            return new OneToManyRelation_1.QOneToManyRelation(relation, q);
        default:
            throw new Error(`Unknown EntityRelationType: ${relation.relationType}.`);
    }
}
exports.getQRelation = getQRelation;
function getQEntityConstructor(allQSchemas) {
    // ChildQEntity refers to the constructor
    var ChildQEntity = function (entity) {
        ChildQEntity.base.constructor.call(this, entity);
        entity.properties.forEach((property) => {
            let qFieldOrRelation;
            if (property.relation && property.relation.length) {
                qFieldOrRelation = getQRelation(entity, property, this, allQSchemas);
                for (const propertyColumn of property.propertyColumns) {
                    addColumnQField(entity, property, this, propertyColumn.column);
                }
            }
            else {
                qFieldOrRelation = addColumnQField(entity, property, this, property.propertyColumns[0].column);
            }
            this[property.name] = qFieldOrRelation;
        });
        entity.__qConstructor__ = ChildQEntity;
    };
    extend(Entity_1.QEntity, ChildQEntity, {});
    return ChildQEntity;
}
exports.getQEntityConstructor = getQEntityConstructor;
function addColumnQField(entity, property, q, column) {
    const qFieldOrRelation = getColumnQField(entity, property, q, column);
    q.__driver__.allColumns[column.index]
        = qFieldOrRelation;
    if (column.idIndex || column.idIndex === 0) {
        q.__driver__.idColumns[column.idIndex]
            = qFieldOrRelation;
    }
    return qFieldOrRelation;
}
exports.addColumnQField = addColumnQField;
function getQEntityIdRelationConstructor() {
    function QEntityIdRelation(entity, relation, qEntity) {
        QEntityIdRelation.base.constructor.call(this, relation, qEntity);
        getQEntityIdFields(this, entity);
        // (<any>entity).__qConstructor__.__qIdRelationConstructor__ = QEntityIdRelation
    }
    extend(Relation_1.QRelation, QEntityIdRelation, {});
    return QEntityIdRelation;
}
exports.getQEntityIdRelationConstructor = getQEntityIdRelationConstructor;
/**
 * Set all fields behind an id relation.  For example
 *
 * QA.id
 *
 * or
 *
 * QA.rel1.id
 *
 * or
 *
 * QA.rel2.otherRel.id
 * QA.rel2.id
 *
 * @param addToObject  Object to add to (Ex: QA | QA.rel1 | QA.rel2.otherRel
 * @param entity  Entity to which the fields belong (Ex: QA, QRel1, QRel2, QOtherRel)
 * @param utils
 * @param parentProperty  The parent property from which the current property was
 *    navigated to
 * @param relationColumnMap  DbColumn map for the current path of properties
 *  (QA.rel2.otherRel), keyed by the column from the One side of the relation
 */
function getQEntityIdFields(addToObject, entity, parentProperty, relationColumnMap) {
    entity.properties.forEach((property) => {
        if (!property.isId) {
            return;
        }
        let qFieldOrRelation;
        const currentProperty = parentProperty ? parentProperty : property;
        // If it's a relation property (and therefore has backing columns)
        if (property.relation && property.relation.length) {
            const parentRelation = currentProperty.relation[0];
            const relationColumns = parentRelation.manyRelationColumns;
            if (!parentProperty) {
                relationColumnMap = new Map();
                for (const relationColumn of relationColumns) {
                    relationColumnMap.set(relationColumn.oneColumn, relationColumn.manyColumn);
                }
            }
            // If it's a nested relation
            else {
                for (const relationColumn of relationColumns) {
                    const originalColumn = relationColumnMap.get(relationColumn.manyColumn);
                    // Remove the mapping of the parent relation
                    relationColumnMap.delete(relationColumn.manyColumn);
                    // And replace it with the nested relation
                    relationColumnMap.set(relationColumn.oneColumn, originalColumn);
                }
            }
            qFieldOrRelation = getQEntityIdFields({}, parentRelation.relationEntity, currentProperty, relationColumnMap);
        }
        else {
            let originalColumn = property.propertyColumns[0].column;
            if (relationColumnMap) {
                originalColumn = relationColumnMap.get(originalColumn);
            }
            qFieldOrRelation = getColumnQField(entity, currentProperty, this, originalColumn);
        }
        addToObject[property.name] = qFieldOrRelation;
    });
    return addToObject;
}
exports.getQEntityIdFields = getQEntityIdFields;
function setQSchemaEntities(schema, qSchema, allQSchemas) {
    // const entities = orderEntitiesByIdDependencies(schema.currentVersion.entities,
    // schema)
    qSchema.__qIdRelationConstructors__ = [];
    qSchema.__qConstructors__ = {};
    // let haveMissingDependencies
    // do {
    // 	haveMissingDependencies = false
    // NOTE: only need to compute the keys of entities for Many-to-One(s)
    // Many-to-Ones must reference the table by primary key in order to
    // guarantee a single record.  Any other type of join may return multiple
    // records and is in fact a Many-to-Many
    schema.currentVersion.entities.forEach((
    // entities.forEach((
    entity) => {
        // NOTE: an @Id column is guaranteed to be present in only one property
        for (const idColumn of entity.idColumns) {
            if (idColumn.manyRelationColumns
                && idColumn.manyRelationColumns.length) {
                const oneColumn = idColumn.manyRelationColumns[0].oneColumn;
                const relatedEntity = oneColumn.entity;
                const relatedQSchema = allQSchemas[relatedEntity.schemaVersion.schema.index];
                if (!relatedQSchema) {
                    throw new Error(`QSchema not yet initialized for ID relation:
					${entity.name}.${oneColumn.name}
					`);
                }
                const manyColumn = idColumn.manyRelationColumns[0].manyColumn;
                // if (relatedEntity.id === manyColumn.entity.id
                // 	&& relatedEntity.schemaVersion.schema.index
                // 	=== manyColumn.entity.schemaVersion.schema.index) {
                // 	continue
                // }
                // const relatedQEntityConstructor =
                // qSchema.__qConstructors__[relatedEntity.index] if (!relatedQEntityConstructor)
                // { throw new Error(`QEntity not yet initialized for ID relation:
                // ${entity.name}.${manyColumn.name} `) haveMissingDependencies = true }
            }
        }
        const qIdRelationConstructor = getQEntityIdRelationConstructor();
        qSchema.__qIdRelationConstructors__[entity.index] = qIdRelationConstructor;
        // TODO: compute many-to-many relations
        const qConstructor = getQEntityConstructor(allQSchemas);
        qSchema.__qConstructors__[entity.index] = qConstructor;
        Object.defineProperty(qSchema, entity.name, {
            get: function () {
                return new this.__qConstructors__[entity.index](entity);
            }
        });
    });
    // } while (haveMissingDependencies)
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
//# sourceMappingURL=qSchemaBuilderUtils.js.map