"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const SSchemaBuilder_1 = require("./SSchemaBuilder");
class JsonSchemaBuilder {
    // schemaVarName = 'SCHEMA'
    constructor(config, entityMapByName, existingSchemaString) {
        this.config = config;
        this.entityMapByName = entityMapByName;
        if (existingSchemaString) {
            // const indexOfAssignment = existingSchemaString.indexOf(this.schemaVarName + ' = {')
            //
            // const errorMessage = `Could not parse existing schema, make sure file starts with with:
            // 	 "export const ${this.schemaVarName} = {"
            // 	 where "{" marks the start of the schema definition, and ends with:
            // 	 "};"
            // 	 where "}" marks the end of the schema definition.`
            //
            // if (indexOfAssignment < 0) {
            // 	throw new Error(errorMessage)
            // }
            // if (existingSchemaString.indexOf('};') !== existingSchemaString.length - 2) {
            // 	throw new Error(errorMessage)
            // }
            //
            // existingSchemaString = existingSchemaString.substring(indexOfAssignment + 9,
            // existingSchemaString.length - 1)
            this.existingSchema = JSON.parse(existingSchemaString);
        }
    }
    build(domain, schemaMapByProjectName) {
        const sSchemaBuilder = new SSchemaBuilder_1.SSchemaBuilder(this.config, this.entityMapByName);
        const sIndexedSchema = sSchemaBuilder.build(schemaMapByProjectName);
        const jsonSchema = this.convertSIndexedSchemaToJsonSchema(domain, sIndexedSchema);
        // TODO: reset table and column and relation indexes based on existing schema
        const schemaString = JSON.stringify(jsonSchema, null, '\t');
        return [schemaString, sIndexedSchema];
    }
    convertSIndexedSchemaToJsonSchema(domain, sIndexedSchema) {
        const jsonEntities = sIndexedSchema.entities.map(sIndexedEntity => {
            const sEntity = sIndexedEntity.entity;
            const columns = sIndexedEntity.columns.map(sColumn => ({
                allocationSize: sColumn.allocationSize,
                columnDefinition: sColumn.columnDefinition,
                index: sColumn.index,
                isGenerated: sColumn.isGenerated === undefined ? false : sColumn.isGenerated,
                manyRelationColumnRefs: [],
                name: sColumn.name,
                notNull: sColumn.notNull,
                propertyRefs: sColumn.propertyRefs.map(index => ({
                    index
                })),
                sinceVersion: 1,
                type: ground_control_1.getSqlDataType(sColumn.type),
            }));
            columns.sort((a, b) => a.index < b.index ? -1 : 1);
            const [properties, relations] = this.getPropertiesAndRelations(sIndexedSchema, sIndexedEntity, columns);
            return {
                columns,
                idColumnRefs: this.getIdColumnReferences(sIndexedEntity),
                index: sEntity.tableIndex,
                isLocal: sEntity.isLocal,
                isRepositoryEntity: sEntity.isRepositoryEntity,
                name: sEntity.name,
                properties: properties,
                relations: relations,
                sinceVersion: 1,
                tableConfig: sEntity.table,
            };
        });
        // FIXME: add schema versioning support
        return {
            domain,
            index: null,
            name: sIndexedSchema.schema.name,
            sinceVersion: 1,
            versions: [{
                    entities: jsonEntities,
                    integerVersion: 1,
                    referencedSchemas: sIndexedSchema.schema.referencedSchemas.map((sSchemaReference) => ({
                        domain: sSchemaReference.dbSchema.domain.name,
                        index: sSchemaReference.index,
                        name: sSchemaReference.dbSchema.name,
                        sinceVersion: 1,
                        versions: [{
                                entities: null,
                                integerVersion: 1,
                                referencedSchemas: null,
                                versionString: '1.0.0'
                            }]
                    })),
                    versionString: '1.0.0'
                }]
        };
    }
    getIdColumnReferences(sIndexedEntity) {
        return sIndexedEntity.idColumns.map(sColumn => ({
            index: sColumn.index
        }));
    }
    getPropertiesAndRelations(sIndexedSchema, sIndexedEntity, columns) {
        const relations = [];
        const properties = sIndexedEntity.entity.properties.map((sProperty, index) => {
            let columnRef;
            let relationRef;
            const sRelation = sProperty.relation;
            if (!sRelation) {
                const sColumn = sProperty.columns[0];
                columnRef = {
                    index: sColumn.index
                };
            }
            else {
                let relationTableSchemaIndex;
                let relationSchemaIndex;
                let relationTableIndex;
                let relatedIndexedEntity;
                if (sRelation.referencedSchemaIndex || sRelation.referencedSchemaIndex === 0) {
                    relationTableSchemaIndex = sRelation.referencedSchemaIndex;
                    const relatedDbSchema = sIndexedSchema.schema.referencedSchemas[sRelation.referencedSchemaIndex];
                    relationSchemaIndex = relatedDbSchema.index;
                    relatedIndexedEntity = relatedDbSchema.dbSchema
                        .currentVersion.entityMapByName[sRelation.entityName];
                    relationTableIndex = relatedIndexedEntity.index;
                }
                else {
                    relatedIndexedEntity = sIndexedSchema.entityMapByName[sRelation.entityName];
                    relationSchemaIndex = null;
                    relationTableIndex = relatedIndexedEntity.entity.tableIndex;
                }
                this.buildColumnRelations(sIndexedEntity, sRelation, relatedIndexedEntity, relationSchemaIndex, relationTableIndex, columns);
                const relation = {
                    // addToJoinFunction: sRelation.addToJoinFunction,
                    foreignKey: sRelation.foreignKey,
                    index: sRelation.index,
                    isId: sProperty.isId,
                    // isRepositoryJoin: sRelation.repositoryJoin,
                    // joinFunctionWithOperator: sRelation.joinFunctionWithOperator,
                    manyToOneElems: sRelation.manyToOne,
                    oneToManyElems: this.prepOneToManyElems(sRelation.oneToMany),
                    relationType: sRelation.relationType,
                    propertyRef: {
                        index: index
                    },
                    relationTableIndex,
                    relationTableSchemaIndex,
                    sinceVersion: 1
                };
                relations[sRelation.index] = relation;
                relationRef = {
                    index: sRelation.index
                };
            }
            return {
                columnRef,
                index,
                isId: sProperty.isId,
                name: sProperty.name,
                relationRef,
                sinceVersion: 1
            };
        });
        return [properties, relations];
    }
    buildColumnRelations(sIndexedEntity, sRelation, relatedIndexedEntity, relationSchemaIndex, relationTableIndex, columns) {
        switch (sRelation.relationType) {
            case ground_control_1.EntityRelationType.MANY_TO_ONE:
                break;
            case ground_control_1.EntityRelationType.ONE_TO_MANY:
                // Currently only need to build manyRelationColumnRefs for ManyToOne relations.
                return;
            default:
                throw new Error(`Unknown relation type: ${sRelation.relationType}.`);
        }
        sRelation.sRelationColumns.map(sRelationColumn => {
            if (!sRelationColumn.manyToOne) {
                return;
            }
            let ownColumnIndex;
            // if (sRelationColumn.ownColumnIdIndex) {
            // 	ownColumnIndex = sIndexedEntity.idColumns[sRelationColumn.ownColumnIdIndex].index
            // } else {
            ownColumnIndex = sIndexedEntity.columnMap[sRelationColumn.ownColumnReference].index;
            // }
            let relationColumnIndex;
            // if (sRelationColumn.relationColumnIdIndex
            // 	|| sRelationColumn.relationColumnIdIndex == 0) {
            // 	relationColumnIndex =
            // relatedIndexedEntity.idColumns[sRelationColumn.relationColumnIdIndex].index } else {
            relationColumnIndex = relatedIndexedEntity.columnMap[sRelationColumn.relationColumnReference].index;
            // }
            const column = columns[ownColumnIndex];
            column.manyRelationColumnRefs.push({
                manyRelationIndex: sRelation.index,
                oneSchemaIndex: relationSchemaIndex,
                oneTableIndex: relationTableIndex,
                oneRelationIndex: sRelationColumn.oneSideRelationIndex,
                oneColumnIndex: relationColumnIndex,
                sinceVersion: 1
            });
        });
    }
    prepOneToManyElems(elems) {
        if (!elems) {
            return elems;
        }
        return {
            cascade: this.deserializeCascadeType(elems.cascade),
            mappedBy: elems.mappedBy
        };
    }
    deserializeCascadeType(cascadeType) {
        if (!cascadeType) {
            return cascadeType;
        }
        switch (cascadeType) {
            case 'CascadeType.NONE':
                return ground_control_1.CascadeType.NONE;
            case 'CascadeType.ALL':
                return ground_control_1.CascadeType.ALL;
            case 'CascadeType.PERSIST':
                return ground_control_1.CascadeType.PERSIST;
            case 'CascadeType.REMOVE':
                return ground_control_1.CascadeType.REMOVE;
            default:
                throw new Error(`Unknown CascadeType: ${cascadeType}.`);
        }
    }
}
exports.JsonSchemaBuilder = JsonSchemaBuilder;
//# sourceMappingURL=JsonSchemaBuilder.js.map