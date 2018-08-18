"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const pathResolver_1 = require("../../resolve/pathResolver");
const SchemaRelationResolver_1 = require("./SchemaRelationResolver");
const SSchema_1 = require("./SSchema");
class SSchemaBuilder {
    constructor(config, entityMapByName) {
        this.config = config;
        this.entityMapByName = entityMapByName;
    }
    build(schemaMapByProjectName) {
        const referencedSchemasByProjectName = {};
        const referencedSchemas = [];
        let schemaReferenceIndex = 0;
        for (let projectName in schemaMapByProjectName) {
            const sSchemaReference = {
                index: schemaReferenceIndex,
                dbSchema: schemaMapByProjectName[projectName]
            };
            referencedSchemas.push(sSchemaReference);
            referencedSchemasByProjectName[projectName] = sSchemaReference;
            schemaReferenceIndex++;
        }
        const schema = {
            domain: this.config.airport.domain,
            entities: [],
            name: this.config.name,
            referencedSchemas,
        };
        const iEntityMapByName = {};
        for (const entityName in this.entityMapByName) {
            const entityCandidate = this.entityMapByName[entityName];
            const tableIndex = schema.entities.length;
            const entity = this.buildEntity(entityCandidate, tableIndex, referencedSchemasByProjectName);
            if (entity) {
                schema.entities.push(entity);
                iEntityMapByName[entityName] = entity;
            }
        }
        const indexedSchema = SSchema_1.buildIndexedSSchema(schema, referencedSchemasByProjectName);
        new SchemaRelationResolver_1.SchemaRelationResolver().resolveAllRelationLinks(indexedSchema);
        return indexedSchema;
    }
    buildEntity(entityCandidate, tableIndex, referencedSchemasByProjectName) {
        let foundEntityDecorator = false;
        let tableConfig;
        for (const decorator of entityCandidate.docEntry.decorators) {
            switch (decorator.name) {
                case ground_control_1.file.ENTITY:
                    foundEntityDecorator = true;
                    break;
                case ground_control_1.file.TABLE:
                    tableConfig = decorator.values[0];
            }
        }
        if (!foundEntityDecorator) {
            return null;
        }
        const [isRepositoryEntity, isLocal] = this.entityExtendsRepositoryEntity(entityCandidate);
        let entity = {
            isLocal,
            isRepositoryEntity,
            name: entityCandidate.docEntry.name,
            numColumns: 0,
            numIdColumns: 0,
            numRelations: 0,
            properties: [],
            table: tableConfig,
            tableIndex
        };
        const primitiveColumnMapByName = {};
        const relationColumnMapByName = {};
        this.buildColumnsWithParentEntities(entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName, referencedSchemasByProjectName);
        entity.properties.sort((prop1, prop2) => {
            return prop1.index - prop2.index;
        });
        if (entity.isRepositoryEntity) {
            if (entity.numIdColumns < 1 || entity.numIdColumns > 5) {
                throw `Repository entity '${entity.name}' must have between 1 and 5 id columns and has ${entity.numIdColumns}.`;
            }
        }
        return entity;
    }
    buildColumnsWithParentEntities(entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName, referencedSchemasByProjectName) {
        let parentEntity = entityCandidate.parentEntity;
        let numParentProperties = 0;
        if (parentEntity) {
            numParentProperties = this.buildColumnsWithParentEntities(parentEntity, entity, primitiveColumnMapByName, relationColumnMapByName, referencedSchemasByProjectName);
        }
        return this.buildColumns(entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName, numParentProperties, referencedSchemasByProjectName);
    }
    buildColumns(entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName, numParentProperties, referencedSchemasByProjectName) {
        const idProperties = entityCandidate.getIdProperties();
        const primitiveIdProperties = idProperties.filter(aProperty => aProperty.primitive);
        this.processPrimitiveColumns(primitiveIdProperties, true, entity, primitiveColumnMapByName, numParentProperties);
        const nonIdProperties = entityCandidate.getNonIdProperties();
        const primitiveNonIdProperties = nonIdProperties.filter(aProperty => aProperty.primitive);
        this.processPrimitiveColumns(primitiveNonIdProperties, false, entity, primitiveColumnMapByName, numParentProperties);
        const relationIdProperties = idProperties.filter(aProperty => !aProperty.primitive);
        for (const aProperty of relationIdProperties) {
            this.processRelationProperty(aProperty, true, entityCandidate, entity, relationColumnMapByName, primitiveColumnMapByName, numParentProperties, referencedSchemasByProjectName);
        }
        const relationNonIdProperties = nonIdProperties.filter(aProperty => !aProperty.primitive);
        for (const aProperty of relationNonIdProperties) {
            this.processRelationProperty(aProperty, false, entityCandidate, entity, relationColumnMapByName, primitiveColumnMapByName, numParentProperties, referencedSchemasByProjectName);
        }
        return numParentProperties + idProperties.length + nonIdProperties.length;
    }
    processRelationProperty(aProperty, isIdProperty, entityCandidate, entity, relationColumnMapByName, primitiveColumnMapByName, numParentProperties, referencedSchemasByProjectName) {
        let columnRelationDefs = [];
        let columnsDefined = false;
        let foreignKey;
        let manyToOne = undefined;
        let oneToMany = undefined;
        let isId = false;
        // let repositoryJoin                       = false;
        // let addToJoinFunction;
        let joinFunctionWithOperator = ground_control_1.SqlOperator.AND;
        let relationType;
        for (const decorator of aProperty.decorators) {
            switch (decorator.name) {
                case ground_control_1.property.ID:
                    isId = true;
                    break;
                // case property.R_JOIN_COLUMN:
                // 	if (!entity.isRepositoryEntity) {
                // 		throw `${entity.name}.${aProperty.name} cannot be @RJoinColumn `
                // 		+ `- ${entity.name} does not extend RepositoryEntity or LocalRepositoryEntity.`;
                // 	}
                // 	repositoryJoin = true;
                case ground_control_1.property.JOIN_COLUMN:
                    if (columnsDefined) {
                        throw `Columns are defined more than once for ${entity.name}.${aProperty.name}`;
                    }
                    columnsDefined = true;
                    foreignKey = decorator.values[0].foreignKey;
                    columnRelationDefs.push(decorator.values[0]);
                    break;
                // case property.R_JOIN_COLUMNS:
                // 	if (!entity.isRepositoryEntity) {
                // 		throw `${entity.name}.${aProperty.name} cannot be @RJoinColumns `
                // 		+ `- ${entity.name} does not extend RepositoryEntity or LocalRepositoryEntity.`;
                // 	}
                // 	repositoryJoin = true;
                case ground_control_1.property.JOIN_COLUMNS:
                    if (columnsDefined) {
                        throw `Columns are defined more than once for ${entity.name}.${aProperty.name}`;
                    }
                    columnsDefined = true;
                    if (decorator.values[0] instanceof Array) {
                        columnRelationDefs = columnRelationDefs.concat(decorator.values[0].slice());
                    }
                    else {
                        throw `"${entity.name}.${aProperty.name} " is decorated with @JoinColumns decorator
						which must be provided an array of column join definitions (and currently is provided
						something other than an Array).`;
                        // columnRelationDefs = columnRelationDefs.concat(decorator.values[0].value);
                        // foreignKey = decorator.values[0].foreignKey;
                    }
                    break;
                case ground_control_1.property.MANY_TO_ONE:
                    if (relationType) {
                        throw `Cardinality (@ManyToOne,@OneToMany) is defined more than once for ${entity.name}.${aProperty.name}`;
                    }
                    manyToOne = decorator.values[0];
                    relationType = ground_control_1.EntityRelationType.MANY_TO_ONE;
                    break;
                case ground_control_1.property.ONE_TO_MANY:
                    if (isId) {
                        throw `A property cannot be be both @OneToMany and @Id`;
                    }
                    if (relationType) {
                        throw `Cardinality (@ManyToOne,@OneToMany) is defined more than once for ${entity.name}.${aProperty.name}`;
                    }
                    oneToMany = decorator.values[0];
                    relationType = ground_control_1.EntityRelationType.ONE_TO_MANY;
                    break;
                // case property.WHERE_JOIN_TABLE:
                // 	addToJoinFunction = decorator.values[0];
                // 	if (decorator.values.length === 2) {
                // 		switch (decorator.values[1]) {
                // 			case 'var and':
                // 				joinFunctionWithOperator = SqlOperator.AND;
                // 			case 'var or':
                // 				joinFunctionWithOperator = SqlOperator.OR;
                // 			default:
                // 				throw `Unsupported 'joinFunctionWithOperator' ${decorator.values[1]}`;
                // 		}
                // 	}
                // 	break;
                default:
                    throw `Unsupported cardinality decorator ${decorator.name}`;
            }
        }
        if (!relationType && relationType !== 0) {
            throw `Cardinality (@ManyToOne,@OneToMany) is not defined for ${entity.name}.${aProperty.name}`;
        }
        const columns = [];
        const sRelationColumns = [];
        let relationMustBeSingleIdEntity = false;
        const propertyIndex = aProperty.index + numParentProperties;
        if (columnsDefined) {
            for (const columnRelationDef of columnRelationDefs) {
                let name = columnRelationDef.name;
                if (name) {
                    name = name.toUpperCase();
                }
                else {
                    throw `"name" is not defined in for a (R)JoinColumn(s) configuration of ${entity.name}.${aProperty.name}`;
                }
                let referencedColumnName = columnRelationDef.referencedColumnName;
                if (referencedColumnName) {
                    referencedColumnName = referencedColumnName.toUpperCase();
                }
                else {
                    referencedColumnName = name;
                }
                let ownColumnReference;
                let relationColumnReference;
                let isManyToOne = false;
                switch (relationType) {
                    case ground_control_1.EntityRelationType.MANY_TO_ONE:
                        ownColumnReference = name;
                        relationColumnReference = referencedColumnName;
                        isManyToOne = true;
                        break;
                    case ground_control_1.EntityRelationType.ONE_TO_MANY:
                        ownColumnReference = referencedColumnName;
                        relationColumnReference = name;
                        break;
                    default:
                        throw `Uknown EntityRelationType: ${relationType}.`;
                }
                const [sRelationColumn, sColumn] = this.processRelationColumn(ownColumnReference, relationColumnReference, isManyToOne, isIdProperty, propertyIndex, entity, relationColumnMapByName, primitiveColumnMapByName);
                sRelationColumns.push(sRelationColumn);
                if (sColumn) {
                    columns.push(sColumn);
                }
            }
        }
        else {
            switch (relationType) {
                case ground_control_1.EntityRelationType.MANY_TO_ONE:
                    relationMustBeSingleIdEntity = true;
                    const [sRelationColumn, sColumn] = this.processRelationColumn(aProperty.name.toUpperCase(), 'IdColumnIndex.ONE', true, isIdProperty, propertyIndex, entity, relationColumnMapByName, primitiveColumnMapByName, true);
                    sRelationColumns.push(sRelationColumn);
                    columns.push(sColumn);
                    break;
                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                    // Nothing to do
                    break;
                default:
                    throw `Uknown EntityRelationType: ${relationType}.`;
            }
        }
        let entityName;
        let referencedSchemaIndex;
        if (!aProperty.entity) {
            if (!aProperty.fromProject) {
                throw `Neither entity nor source project was specified for for ${entity.name}.${aProperty.name}`;
            }
            const schemaReference = referencedSchemasByProjectName[aProperty.fromProject];
            if (!schemaReference) {
                throw `Could not find related project '${aProperty.fromProject}' for ${entity.name}.${aProperty.name}`;
            }
            referencedSchemaIndex = schemaReference.index;
            const propertyType = aProperty.nonArrayType;
            let relatedEntity = schemaReference.dbSchema.currentVersion.entityMapByName[propertyType];
            if (!relatedEntity) {
                if (pathResolver_1.canBeInterface(propertyType)) {
                    const entityType = pathResolver_1.getImplNameFromInterfaceName(propertyType);
                    relatedEntity = schemaReference.dbSchema.currentVersion.entityMapByName[entityType];
                    if (!relatedEntity) {
                        throw `Could not find related entity '${entityType}' 
						(from interface ${propertyType}) 
						in project '${aProperty.fromProject}' 
						for ${entity.name}.${aProperty.name}`;
                    }
                }
                else {
                    throw `Could not find related entity '${propertyType}' 
					in project '${aProperty.fromProject}' 
					for ${entity.name}.${aProperty.name}`;
                }
            }
            entityName = relatedEntity.name;
        }
        else {
            entityName = aProperty.entity.type;
        }
        let relation = {
            // addToJoinFunction,
            entityName,
            foreignKey,
            index: entity.numRelations++,
            joinFunctionWithOperator,
            manyToOne,
            oneToMany,
            relationType,
            referencedSchemaIndex,
            relationMustBeSingleIdEntity,
            // repositoryJoin,
            sRelationColumns
        };
        entity.properties.push({
            columns,
            index: propertyIndex,
            isId: isIdProperty,
            name: aProperty.name,
            relation
        });
    }
    entityExtendsRepositoryEntity(//
    entityCandidate //
    ) {
        const parentEntity = entityCandidate.parentEntity;
        if (!parentEntity) {
            return [false, true];
        }
        if (parentEntity.docEntry.name === ground_control_1.repositoryEntity.ENTITY_NAME) {
            return [true, false];
        }
        if (parentEntity.docEntry.name === ground_control_1.repositoryEntity.LOCAL_ENTITY_NAME) {
            return [true, true];
        }
        return this.entityExtendsRepositoryEntity(entityCandidate.parentEntity);
    }
    processPrimitiveColumns(properties, isIdProperty, entity, primitiveColumnMapByName, numParentProperties) {
        for (const aProperty of properties) {
            const propertyIndex = aProperty.index + numParentProperties;
            entity.properties.push({
                columns: [this.processPrimitiveColumn(aProperty, isIdProperty, propertyIndex, entity, primitiveColumnMapByName)],
                index: propertyIndex,
                isId: isIdProperty,
                name: aProperty.name,
                relation: undefined
            });
        }
    }
    processPrimitiveColumn(aProperty, isIdProperty, propertyIndex, entity, primitiveColumnMapByName) {
        let columnName;
        let columnDefined = false;
        for (const decorator of aProperty.decorators) {
            switch (decorator.name) {
                case ground_control_1.property.COLUMN:
                    if (columnDefined) {
                        throw `@Column is defined more than once for ${entity.name}.${aProperty.name}`;
                    }
                    columnDefined = true;
                    if (decorator.values.length) {
                        columnName = decorator.values[0].name;
                    }
                    else {
                        columnName = aProperty.name;
                    }
            }
        }
        if (!columnName) {
            columnName = aProperty.name;
        }
        columnName = columnName.toUpperCase();
        if (!columnName) {
            throw `Could not find a columnName in "${entity.name}"`;
        }
        const existingColumn = primitiveColumnMapByName[columnName];
        if (existingColumn) {
            throw `More than one @Column({name: "${columnName}"}) defined in "${entity.name}"`;
        }
        if (aProperty.isGenerated
            && aProperty.primitive !== 'number'
            && aProperty.primitive !== 'string') {
            throw `Column '${columnName}' defined in "${entity.name}" is a @GeneratedValue()
			but isn't of type "number" or "string"`;
        }
        const column = {
            allocationSize: aProperty.allocationSize,
            columnDefinition: aProperty.columnDefinition,
            idIndex: isIdProperty ? entity.numIdColumns++ : undefined,
            index: entity.numColumns++,
            isGenerated: aProperty.isGenerated,
            name: columnName,
            propertyRefs: [propertyIndex],
            type: aProperty.primitive
        };
        primitiveColumnMapByName[columnName] = column;
        return column;
    }
    /**
     * Relation column joins can be:
     *
     * Id Index     to  Id Index
     * Column Name  to  Column Name
     * Id Index     to  Column Name
     * Column Name  to  Id Index
     *
     * For Id Indexes, do not add them as references if they don't
     * yet exist.
     *
     * @param {string} ownColumnReference
     * @param {boolean} isIdProperty
     * @param {SEntity} entity
     * @param {{[p: string]: SColumn}} relationColumnMapByName
     * @param {{[p: string]: SColumn}} primitiveColumnMapByName
     * @returns {SColumn}
     */
    processRelationColumn(ownColumnReference, relationColumnReference, manyToOne, isIdProperty, propertyIndex, entity, relationColumnMapByName, primitiveColumnMapByName, entityCannotReferenceOtherColumns = false) {
        const ownColumnIdIndex = this.getIdColumnIndex(ownColumnReference);
        const relationColumnIdIndex = this.getIdColumnIndex(relationColumnReference);
        const sRelationColumn = {
            manyToOne,
            oneSideRelationIndex: null,
            ownColumnIdIndex,
            ownColumnReference,
            relationColumnIdIndex,
            relationColumnReference
        };
        if (ownColumnIdIndex) {
            if (isIdProperty) {
                throw `ManyToOne/OneToMany relation cannot be @Id and reference Id columns at the same time.`;
            }
            return [
                sRelationColumn,
                null
            ];
        }
        const existingPrimitiveColumn = primitiveColumnMapByName[ownColumnReference];
        if (existingPrimitiveColumn) {
            if (manyToOne && isIdProperty) {
                // if (entityCannotReferenceOtherColumns) {
                // throw `ManyToOne relation without (R)JoinColumn(s) cannot be named as other columns.`;
                throw `@Id & @ManyToOne relation columns cannot be named as other non-relational columns.
			A column can either be defined as a non-relational.
			Column: '${entity.name}.${ownColumnReference}'`;
            }
            return [
                sRelationColumn,
                existingPrimitiveColumn
            ];
        }
        const existingRelationColumn = relationColumnMapByName[ownColumnReference];
        if (existingRelationColumn) {
            if (entityCannotReferenceOtherColumns) {
                throw `ManyToOne relation without (R)JoinColumn(s) cannot be named as other columns.`;
            }
            existingRelationColumn.propertyRefs.push(propertyIndex);
            return [
                sRelationColumn,
                existingRelationColumn
            ];
        }
        const column = {
            idIndex: isIdProperty ? entity.numIdColumns++ : undefined,
            index: entity.numColumns++,
            name: ownColumnReference,
            propertyRefs: [propertyIndex],
            type: undefined
        };
        relationColumnMapByName[ownColumnReference] = column;
        return [
            sRelationColumn,
            column
        ];
    }
    getIdColumnIndex(columnName, throwIfNotFound) {
        let idColumnIndex;
        switch (columnName) {
            case 'IdColumnIndex.ONE':
            case '1':
                idColumnIndex = 0;
                break;
            case 'IdColumnIndex.TWO':
            case '2':
                idColumnIndex = 1;
                break;
            case 'IdColumnIndex.THREE':
            case '3':
                idColumnIndex = 2;
                break;
            case 'IdColumnIndex.FOUR':
            case '4':
                idColumnIndex = 3;
                break;
            case 'IdColumnIndex.FIVE':
            case '5':
                idColumnIndex = 4;
                break;
            default:
                if (throwIfNotFound) {
                    throw throwIfNotFound;
                }
        }
        return idColumnIndex;
    }
}
exports.SSchemaBuilder = SSchemaBuilder;
//# sourceMappingURL=SSchemaBuilder.js.map