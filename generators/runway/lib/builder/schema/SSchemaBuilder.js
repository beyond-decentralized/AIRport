"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ground_control_1 = require("@airport/ground-control");
const EntityDefinitionGenerator_1 = require("../../parser/EntityDefinitionGenerator");
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
        const originalReferencedSchemasByProjectName = {};
        const referencedSchemas = [];
        let schemaReferenceIndex = 0;
        for (let projectName in schemaMapByProjectName) {
            const sSchemaReference = {
                index: schemaReferenceIndex,
                dbSchema: schemaMapByProjectName[projectName]
            };
            referencedSchemas.push(sSchemaReference);
            referencedSchemasByProjectName[projectName] = sSchemaReference;
            originalReferencedSchemasByProjectName[projectName] = sSchemaReference;
            schemaReferenceIndex++;
        }
        const schema = {
            domain: this.config.airport.domain,
            entities: [],
            name: this.config.name,
            referencedSchemas,
        };
        const sEntityMapByName = {};
        for (const entityName in this.entityMapByName) {
            const entityCandidate = this.entityMapByName[entityName];
            const tableIndex = schema.entities.length;
            const entity = this.buildEntity(entityCandidate, tableIndex, referencedSchemasByProjectName);
            if (entity) {
                schema.entities.push(entity);
                sEntityMapByName[entityName] = entity;
            }
        }
        for (const projectName in referencedSchemasByProjectName) {
            if (!originalReferencedSchemasByProjectName[projectName]) {
                referencedSchemas.push(referencedSchemasByProjectName[projectName]);
            }
        }
        referencedSchemas.sort((a, b) => a.index - b.index);
        const indexedSchema = SSchema_1.buildIndexedSSchema(schema, referencedSchemasByProjectName);
        new SchemaRelationResolver_1.SchemaRelationResolver().resolveAllRelationLinks(indexedSchema);
        return indexedSchema;
    }
    buildEntity(entityCandidate, tableIndex, referencedSchemasByProjectName) {
        let foundEntityDecorator = false;
        let tableConfig;
        for (const decorator of entityCandidate.docEntry.decorators) {
            switch (decorator.name) {
                case ground_control_1.file.ENTITY: {
                    foundEntityDecorator = true;
                    break;
                }
                case ground_control_1.file.TABLE: {
                    tableConfig = {
                        ...decorator.values[0]
                    };
                    if (!tableConfig.indexes) {
                        tableConfig.indexes = [];
                    }
                    break;
                }
            }
        }
        if (!foundEntityDecorator) {
            return null;
        }
        if (!tableConfig) {
            tableConfig = {
                indexes: []
            };
        }
        const [isRepositoryEntity, isLocal] = entityExtendsRepositoryEntity(entityCandidate);
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
            if (entity.numIdColumns !== 3) {
                throw new Error(`Repository entity '${entity.name}' must have 3 id columns 
				and has ${entity.numIdColumns}.`);
            }
        }
        return entity;
    }
    buildColumnsWithParentEntities(entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName, referencedSchemasByProjectName, project) {
        let parentEntity = entityCandidate.parentEntity;
        let numParentProperties = 0;
        if (parentEntity) {
            let parentProject = project;
            if (parentEntity.project) {
                parentProject = parentEntity.project;
            }
            numParentProperties = this.buildColumnsWithParentEntities(parentEntity, entity, primitiveColumnMapByName, relationColumnMapByName, referencedSchemasByProjectName, parentProject);
        }
        return this.buildColumns(entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName, numParentProperties, referencedSchemasByProjectName, project);
    }
    buildColumns(entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName, numParentProperties, referencedSchemasByProjectName, project) {
        const idProperties = entityCandidate.getIdProperties();
        const primitiveIdProperties = idProperties.filter(aProperty => {
            if (!aProperty.fromProject) {
                aProperty.fromProject = project;
            }
            return aProperty.primitive;
        });
        this.processPrimitiveColumns(primitiveIdProperties, true, entity, primitiveColumnMapByName, numParentProperties);
        const nonIdProperties = entityCandidate.getNonIdProperties();
        const primitiveNonIdProperties = nonIdProperties.filter(aProperty => {
            if (!aProperty.fromProject) {
                aProperty.fromProject = project;
            }
            return aProperty.primitive;
        });
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
        // let joinFunctionWithOperator = SqlOperator.AND
        let relationType;
        for (const decorator of aProperty.decorators) {
            switch (decorator.name) {
                case ground_control_1.property.ID:
                    isId = true;
                    break;
                // case property.R_JOIN_COLUMN:
                // 	if (!entity.isRepositoryEntity) {
                // 		throw new Error(`${entity.name}.${aProperty.name} cannot be @RJoinColumn `
                // 		+ `- ${entity.name} does not extend RepositoryEntity or
                // LocalRepositoryEntity.`); } repositoryJoin = true;
                case ground_control_1.property.JOIN_COLUMN:
                    if (columnsDefined) {
                        throw new Error(`Columns are defined more than once 
						for ${entity.name}.${aProperty.name}`);
                    }
                    columnsDefined = true;
                    foreignKey = decorator.values[0].foreignKey;
                    columnRelationDefs.push(decorator.values[0]);
                    break;
                // case property.R_JOIN_COLUMNS:
                // 	if (!entity.isRepositoryEntity) {
                // 		throw new Error(`${entity.name}.${aProperty.name} cannot be @RJoinColumns `
                // 		+ `- ${entity.name} does not extend RepositoryEntity or
                // LocalRepositoryEntity.`); } repositoryJoin = true;
                case ground_control_1.property.JOIN_COLUMNS:
                    if (columnsDefined) {
                        throw new Error(`Columns are defined more than once 
						for ${entity.name}.${aProperty.name}`);
                    }
                    columnsDefined = true;
                    if (decorator.values[0] instanceof Array) {
                        columnRelationDefs = columnRelationDefs.concat(decorator.values[0].slice());
                    }
                    else {
                        throw new Error(`"${entity.name}.${aProperty.name} " is decorated with @JoinColumns decorator
						which must be provided an array of column join definitions (and currently is provided
						something other than an Array).`);
                        // columnRelationDefs = columnRelationDefs.concat(decorator.values[0].value);
                        // foreignKey = decorator.values[0].foreignKey;
                    }
                    break;
                case ground_control_1.property.MANY_TO_ONE:
                    if (relationType) {
                        throw new Error(`Cardinality (@ManyToOne,@OneToMany) is defined more than once 
							for ${entity.name}.${aProperty.name}`);
                    }
                    manyToOne = decorator.values[0];
                    relationType = ground_control_1.EntityRelationType.MANY_TO_ONE;
                    break;
                case ground_control_1.property.ONE_TO_MANY:
                    if (isId) {
                        throw new Error(`A property cannot be be both @OneToMany and @Id`);
                    }
                    if (relationType) {
                        throw new Error(`Cardinality (@ManyToOne,@OneToMany) is defined more than once 
						for ${entity.name}.${aProperty.name}`);
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
                // 				throw new Error(
                // 				`Unsupported 'joinFunctionWithOperator' ${decorator.values[1]}`);
                // 		}
                // 	}
                // 	break;
                default:
                    throw new Error(`Unsupported cardinality decorator ${decorator.name}`);
            }
        }
        if (!relationType && relationType !== 0) {
            throw new Error(`Cardinality (@ManyToOne,@OneToMany) is not defined 
				for ${entity.name}.${aProperty.name}`);
        }
        const columns = [];
        const sRelationColumns = [];
        let relationMustBeSingleIdEntity = false;
        const propertyIndex = aProperty.index + numParentProperties;
        if (columnsDefined) {
            for (const columnRelationDef of columnRelationDefs) {
                let name = columnRelationDef.name;
                let notNull = false;
                if (name) {
                    name = name.toUpperCase();
                }
                else {
                    throw new Error(`"name" is not defined in for a JoinColumn(s) configuration 
					of ${entity.name}.${aProperty.name}`);
                }
                if (columnRelationDef.nullable === false) {
                    notNull = true;
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
                        throw new Error(`Uknown EntityRelationType: ${relationType}.`);
                }
                const [sRelationColumn, sColumn] = this.processRelationColumn(ownColumnReference, relationColumnReference, isManyToOne, isIdProperty, propertyIndex, entity, relationColumnMapByName, primitiveColumnMapByName, notNull);
                sRelationColumns.push(sRelationColumn);
                if (sColumn) {
                    columns.push(sColumn);
                }
            }
        }
        else {
            switch (relationType) {
                case ground_control_1.EntityRelationType.MANY_TO_ONE: {
                    if (!entityExtendsRepositoryEntity(aProperty.entity)) {
                        throw new Error(`@JoinColumn(s) must be specified for @ManyToOne
					in ${entity.name}.${aProperty.name} (if the related entity does not extend RepositoryEntity).`);
                    }
                    const relatedTableName = this.getTableNameFromEntity(aProperty.entity);
                    const notNull = isManyToOnePropertyNotNull(aProperty);
                    const relationColumnReferences = ['REPOSITORY_ID', 'ACTOR_ID', 'ACTOR_RECORD_ID'];
                    ['_RID', '_AID', '_ARID'].forEach((suffix, index) => {
                        const [sRelationColumn, sColumn] = this.processRelationColumn(relatedTableName + suffix, relationColumnReferences[index], true, isIdProperty, propertyIndex, entity, relationColumnMapByName, primitiveColumnMapByName, notNull);
                        sRelationColumns.push(sRelationColumn);
                        if (sColumn) {
                            columns.push(sColumn);
                        }
                    });
                }
                // relationMustBeSingleIdEntity = true
                // const [sRelationColumn, sColumn] = this.processRelationColumn(
                // 	aProperty.name.toUpperCase(), 'IdColumnIndex.ONE', true,
                // 	isIdProperty, propertyIndex, entity,
                // 	relationColumnMapByName, primitiveColumnMapByName, notNull,
                // 	true)
                // sRelationColumns.push(sRelationColumn)
                // columns.push(sColumn)
                // break
                case ground_control_1.EntityRelationType.ONE_TO_MANY:
                    // Nothing to do
                    break;
                default:
                    throw new Error(`Uknown EntityRelationType: ${relationType}.`);
            }
        }
        let entityName;
        let referencedSchemaIndex;
        if (!aProperty.entity) {
            if (!aProperty.fromProject) {
                throw new Error(`Neither entity nor source project was specified 
				for ${entity.name}.${aProperty.name}`);
            }
            let schemaReference = referencedSchemasByProjectName[aProperty.fromProject];
            if (!schemaReference) {
                const dbSchema = EntityDefinitionGenerator_1.globalCandidateRegistry.getReferencedSchema(aProperty.fromProject, aProperty);
                if (!dbSchema) {
                    throw new Error(`Could not find related project '${aProperty.fromProject}' 
					for ${entity.name}.${aProperty.name}`);
                }
                schemaReference = {
                    index: Object.keys(referencedSchemasByProjectName).length,
                    dbSchema
                };
                referencedSchemasByProjectName[aProperty.fromProject] = schemaReference;
            }
            referencedSchemaIndex = schemaReference.index;
            const propertyType = aProperty.nonArrayType;
            let relatedEntity = schemaReference.dbSchema.currentVersion.entityMapByName[propertyType];
            if (!relatedEntity) {
                if (pathResolver_1.canBeInterface(propertyType)) {
                    const entityType = pathResolver_1.getImplNameFromInterfaceName(propertyType);
                    relatedEntity = schemaReference.dbSchema.currentVersion.entityMapByName[entityType];
                    if (!relatedEntity) {
                        throw new Error(`Could not find related entity '${entityType}' 
						(from interface ${propertyType}) 
						in project '${aProperty.fromProject}' 
						for ${entity.name}.${aProperty.name}`);
                    }
                }
                else {
                    throw new Error(`Could not find related entity '${propertyType}' 
					in project '${aProperty.fromProject}' 
					for ${entity.name}.${aProperty.name}`);
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
            // joinFunctionWithOperator,
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
    getTableNameFromEntity(entityCandidate) {
        const tableDecorators = entityCandidate.docEntry.decorators.filter(decorator => decorator.name === 'Table');
        if (!tableDecorators.length) {
            return entityCandidate.docEntry.name.toUpperCase();
        }
        return tableDecorators[0].values[0].name;
    }
    isManyToOnePropertyNotNull(aProperty) {
        const manyToOneDecoratorValues = aProperty.decorators.filter(decorator => decorator.name === 'ManyToOne')[0].values;
        if (!manyToOneDecoratorValues.length) {
            return false;
        }
        return manyToOneDecoratorValues[0].optional === false;
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
        let notNull = false;
        let columnDefined = false;
        for (const decorator of aProperty.decorators) {
            switch (decorator.name) {
                case ground_control_1.property.COLUMN:
                    if (columnDefined) {
                        throw new Error(`@Column is defined more than once
						 for ${entity.name}.${aProperty.name}`);
                    }
                    columnDefined = true;
                    if (decorator.values.length) {
                        const columnDecoratorDefs = decorator.values[0];
                        columnName = columnDecoratorDefs.name;
                        if (columnDecoratorDefs.nullable === false) {
                            notNull = true;
                        }
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
            throw new Error(`Could not find a columnName in "${entity.name}"`);
        }
        const existingColumn = primitiveColumnMapByName[columnName];
        if (existingColumn) {
            throw new Error(`More than one @Column({name: "${columnName}"}) 
			defined in "${entity.name}"`);
        }
        if (aProperty.isGenerated
            && aProperty.primitive !== 'number'
            && aProperty.primitive !== 'string') {
            throw new Error(`Column '${columnName}' defined in "${entity.name}" is a @GeneratedValue()
			but isn't of type "number" or "string"`);
        }
        let idIndex = undefined;
        if (isIdProperty) {
            idIndex = this.getIdColumnIndex(entity, columnName);
        }
        const column = {
            allocationSize: aProperty.allocationSize,
            columnDefinition: aProperty.columnDefinition,
            idIndex,
            index: this.getColumnIndex(entity, idIndex),
            isGenerated: aProperty.isGenerated,
            name: columnName,
            notNull,
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
    processRelationColumn(ownColumnReference, relationColumnReference, manyToOne, isIdProperty, propertyIndex, entity, relationColumnMapByName, primitiveColumnMapByName, notNull, entityCannotReferenceOtherColumns = false) {
        // const ownColumnIdIndex                 = this.getIdColumnIndex(ownColumnReference)
        // const relationColumnIdIndex            =
        // this.getIdColumnIndex(relationColumnReference)
        const sRelationColumn = {
            manyToOne,
            oneSideRelationIndex: null,
            // ownColumnIdIndex,
            ownColumnReference,
            // relationColumnIdIndex,
            relationColumnReference
        };
        // if (ownColumnIdIndex) {
        // 	if (isIdProperty) {
        // 		throw new Error(`ManyToOne/OneToMany relation cannot be @Id and reference Id
        // columns at the same time.`) }  return [ sRelationColumn, null ] }
        const existingPrimitiveColumn = primitiveColumnMapByName[ownColumnReference];
        if (existingPrimitiveColumn) {
            if (manyToOne && isIdProperty) {
                // if (entityCannotReferenceOtherColumns) {
                // throw new Error(`ManyToOne relation without (R)JoinColumn(s) cannot be named
                // as other columns.`);
                throw new Error(`@Id & @ManyToOne relation columns cannot be named as other non-relational columns.
			A column can either be defined as a non-relational column
			OR as a relation.
			Column: '${entity.name}.${ownColumnReference}'`);
            }
            if ((existingPrimitiveColumn.notNull && !notNull)
                || (!existingPrimitiveColumn.notNull && notNull)) {
                throw new Error(`Column ${existingPrimitiveColumn.name} has conflicting nullable definitions`);
            }
            return [
                sRelationColumn,
                existingPrimitiveColumn
            ];
        }
        const existingRelationColumn = relationColumnMapByName[ownColumnReference];
        if (existingRelationColumn) {
            if (manyToOne && isIdProperty) {
                // if (entityCannotReferenceOtherColumns) {
                // throw new Error(`ManyToOne relation without (R)JoinColumn(s) cannot be named
                // as other columns.`);
                throw new Error(`@Id & @ManyToOne relation columns cannot be named in multiple relations.
			A @Id column can be defined in only one relation.
			Column: '${entity.name}.${ownColumnReference}'`);
            }
            if (entityCannotReferenceOtherColumns) {
                throw new Error(`ManyToOne relation without JoinColumn(s) 
				cannot be named as other columns.`);
            }
            if ((existingRelationColumn.notNull && !notNull)
                || (!existingRelationColumn.notNull && notNull)) {
                throw new Error(`Column ${existingRelationColumn.name} has conflicting nullable definitions`);
            }
            existingRelationColumn.propertyRefs.push(propertyIndex);
            return [
                sRelationColumn,
                existingRelationColumn
            ];
        }
        let idIndex = undefined;
        if (isIdProperty) {
            idIndex = this.getIdColumnIndex(entity, ownColumnReference);
        }
        const column = {
            idIndex,
            index: this.getColumnIndex(entity, idIndex),
            name: ownColumnReference,
            notNull,
            propertyRefs: [propertyIndex],
            type: undefined
        };
        relationColumnMapByName[ownColumnReference] = column;
        return [
            sRelationColumn,
            column
        ];
    }
    getIdColumnIndex(entity, columnName) {
        if (!entity.isRepositoryEntity) {
            return entity.numIdColumns++;
        }
        entity.numIdColumns = 3;
        switch (columnName) {
            case 'REPOSITORY_ID':
                return 0;
            case 'ACTOR_ID':
                return 1;
            case 'ACTOR_RECORD_ID':
                return 2;
            default:
                throw new Error(`Repository Entity @Id columns must be 
				'REPOSITORY_ID', 'ACTOR_ID' and 'ACTOR_RECORD_ID'`);
        }
    }
    getColumnIndex(entity, idIndex) {
        if (!entity.isRepositoryEntity) {
            return entity.numColumns++;
        }
        if (!entity.numColumns) {
            entity.numColumns = 3;
        }
        if (idIndex !== undefined) {
            return idIndex;
        }
        return entity.numColumns++;
    }
}
exports.SSchemaBuilder = SSchemaBuilder;
function entityExtendsRepositoryEntity(//
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
    return entityExtendsRepositoryEntity(entityCandidate.parentEntity);
}
exports.entityExtendsRepositoryEntity = entityExtendsRepositoryEntity;
function isManyToOnePropertyNotNull(aProperty) {
    const manyToOneProperty = getManyToOneDecorator(aProperty);
    if (!manyToOneProperty) {
        throw `Not a @ManyToOne property.`;
    }
    const manyToOneDecoratorValues = manyToOneProperty.values;
    if (!manyToOneDecoratorValues.length) {
        return false;
    }
    return manyToOneDecoratorValues[0].optional === false;
}
exports.isManyToOnePropertyNotNull = isManyToOnePropertyNotNull;
function getManyToOneDecorator(aProperty) {
    const manyToOneDecorators = aProperty.decorators.filter(decorator => decorator.name === 'ManyToOne');
    if (manyToOneDecorators.length) {
        return manyToOneDecorators[0];
    }
    return null;
}
exports.getManyToOneDecorator = getManyToOneDecorator;
//# sourceMappingURL=SSchemaBuilder.js.map