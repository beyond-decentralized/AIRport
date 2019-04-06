import {
	DatabaseForeignKey,
	DatabaseManyToOneElements,
	DatabaseOneToManyElements,
	DbSchema,
	EntityRelationType,
	file,
	property,
	repositoryEntity,
}                                from '@airport/ground-control'
import {Configuration}           from '../../options/Options'
import {PropertyDocEntry}        from '../../parser/DocEntry'
import {EntityCandidate}         from '../../parser/EntityCandidate'
import {globalCandidateRegistry} from '../../parser/EntityDefinitionGenerator'
import {
	canBeInterface,
	getImplNameFromInterfaceName
}                                from '../../resolve/pathResolver'
import {SchemaRelationResolver}  from './SchemaRelationResolver'
import {SEntity}                 from './SEntity'
import {
	SColumn,
	SRelation,
	SRelationColumn
}                                from './SProperty'
import {
	buildIndexedSSchema,
	SIndexedSchema,
	SSchema,
	SSchemaReference
}                                from './SSchema'

export class SSchemaBuilder {

	constructor(
		private config: Configuration,
		private entityMapByName: { [entityName: string]: EntityCandidate },
	) {
	}

	build(
		schemaMapByProjectName: { [projectName: string]: DbSchema }
	): SIndexedSchema {
		const referencedSchemasByProjectName: {
			[projectName: string]: SSchemaReference
		}                                           = {}
		const originalReferencedSchemasByProjectName: {
			[projectName: string]: SSchemaReference
		}                                           = {}
		const referencedSchemas: SSchemaReference[] = []
		let schemaReferenceIndex                    = 0
		for (let projectName in schemaMapByProjectName) {
			const sSchemaReference = {
				index: schemaReferenceIndex,
				dbSchema: schemaMapByProjectName[projectName]
			}
			referencedSchemas.push(sSchemaReference)
			referencedSchemasByProjectName[projectName]         = sSchemaReference
			originalReferencedSchemasByProjectName[projectName] = sSchemaReference

			schemaReferenceIndex++
		}
		const schema: SSchema = {
			domain: this.config.airport.domain,
			entities: [],
			name: this.config.name,
			referencedSchemas,
		}

		const sEntityMapByName: { [name: string]: SEntity } = {}
		for (const entityName in this.entityMapByName) {
			const entityCandidate: EntityCandidate = this.entityMapByName[entityName]
			const tableIndex                       = schema.entities.length
			const entity                           = this.buildEntity(entityCandidate, tableIndex, referencedSchemasByProjectName)
			if (entity) {
				schema.entities.push(entity)
				sEntityMapByName[entityName] = entity
			}
		}

		for (const projectName in referencedSchemasByProjectName) {
			if (!originalReferencedSchemasByProjectName[projectName]) {
				referencedSchemas.push(referencedSchemasByProjectName[projectName])
			}
		}

		referencedSchemas.sort((
			a,
			b
		) => a.index - b.index)

		const indexedSchema = buildIndexedSSchema(schema, referencedSchemasByProjectName)

		new SchemaRelationResolver().resolveAllRelationLinks(indexedSchema)

		return indexedSchema
	}

	private buildEntity(
		entityCandidate: EntityCandidate,
		tableIndex: number,
		referencedSchemasByProjectName: { [projectName: string]: SSchemaReference },
	): SEntity {
		let foundEntityDecorator = false
		let tableConfig
		for (const decorator of entityCandidate.docEntry.decorators) {
			switch (decorator.name) {
				case file.ENTITY: {
					foundEntityDecorator = true
					break
				}
				case file.TABLE: {
					tableConfig = {
						...decorator.values[0]
					}
					if(!tableConfig.indexes) {
						tableConfig.indexes = []
					}
					break
				}
			}
		}

		if (!foundEntityDecorator) {
			return null
		}

		if(!tableConfig) {
			tableConfig = {
				indexes: []
			}
		}

		const [isRepositoryEntity, isLocal]
			      = this.entityExtendsRepositoryEntity(entityCandidate)

		let entity: SEntity = {
			isLocal,
			isRepositoryEntity,
			name: entityCandidate.docEntry.name,
			numColumns: 0,
			numIdColumns: 0,
			numRelations: 0,
			properties: [],
			table: tableConfig,
			tableIndex
		}

		const primitiveColumnMapByName: { [columnName: string]: SColumn } = {}
		const relationColumnMapByName: { [columnName: string]: SColumn }  = {}

		this.buildColumnsWithParentEntities(
			entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName,
			referencedSchemasByProjectName)

		entity.properties.sort((
			prop1,
			prop2
		) => {
			return prop1.index - prop2.index
		})

		if (entity.isRepositoryEntity) {
			if (entity.numIdColumns !== 3) {
				throw `Repository entity '${entity.name}' must have 3 id columns and has ${entity.numIdColumns}.`
			}
		}

		return entity
	}

	private buildColumnsWithParentEntities(
		entityCandidate: EntityCandidate,
		entity: SEntity,
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		relationColumnMapByName: { [columnName: string]: SColumn },
		referencedSchemasByProjectName: { [projectName: string]: SSchemaReference },
		project?: string,
	) {
		let parentEntity        = entityCandidate.parentEntity
		let numParentProperties = 0
		if (parentEntity) {
			let parentProject = project
			if (parentEntity.project) {
				parentProject = parentEntity.project
			}
			numParentProperties = this.buildColumnsWithParentEntities(
				parentEntity, entity, primitiveColumnMapByName, relationColumnMapByName,
				referencedSchemasByProjectName, parentProject)
		}
		return this.buildColumns(entityCandidate, entity,
			primitiveColumnMapByName, relationColumnMapByName, numParentProperties,
			referencedSchemasByProjectName, project)
	}

	private buildColumns(
		entityCandidate: EntityCandidate,
		entity: SEntity,
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		relationColumnMapByName: { [columnName: string]: SColumn },
		numParentProperties: number,
		referencedSchemasByProjectName: { [projectName: string]: SSchemaReference },
		project?: string,
	): number {
		const idProperties          = entityCandidate.getIdProperties()
		const primitiveIdProperties = idProperties.filter(
			aProperty => {
				if (!aProperty.fromProject) {
					aProperty.fromProject = project
				}

				return aProperty.primitive
			})
		this.processPrimitiveColumns(primitiveIdProperties, true, entity, primitiveColumnMapByName, numParentProperties)

		const nonIdProperties          = entityCandidate.getNonIdProperties()
		const primitiveNonIdProperties = nonIdProperties.filter(
			aProperty => {
				if (!aProperty.fromProject) {
					aProperty.fromProject = project
				}

				return aProperty.primitive
			})
		this.processPrimitiveColumns(primitiveNonIdProperties, false, entity, primitiveColumnMapByName, numParentProperties)

		const relationIdProperties = idProperties.filter(
			aProperty => !aProperty.primitive)
		for (const aProperty of relationIdProperties) {
			this.processRelationProperty(
				aProperty,
				true,
				entityCandidate,
				entity,
				relationColumnMapByName,
				primitiveColumnMapByName,
				numParentProperties,
				referencedSchemasByProjectName
			)
		}

		const relationNonIdProperties = nonIdProperties.filter(
			aProperty => !aProperty.primitive)
		for (const aProperty of relationNonIdProperties) {
			this.processRelationProperty(
				aProperty,
				false,
				entityCandidate,
				entity,
				relationColumnMapByName,
				primitiveColumnMapByName,
				numParentProperties,
				referencedSchemasByProjectName
			)
		}

		return numParentProperties + idProperties.length + nonIdProperties.length
	}

	private processRelationProperty(
		aProperty: PropertyDocEntry,
		isIdProperty: boolean,
		entityCandidate: EntityCandidate,
		entity: SEntity,
		relationColumnMapByName: { [columnName: string]: SColumn },
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		numParentProperties: number,
		referencedSchemasByProjectName: { [projectName: string]: SSchemaReference },
	): void {
		let columnRelationDefs                   = []
		let columnsDefined                       = false
		let foreignKey: DatabaseForeignKey
		let manyToOne: DatabaseManyToOneElements = undefined
		let oneToMany: DatabaseOneToManyElements = undefined
		let isId                                 = false
		// let repositoryJoin                       = false;
		// let addToJoinFunction;
		// let joinFunctionWithOperator = SqlOperator.AND
		let relationType: EntityRelationType
		for (const decorator of aProperty.decorators) {
			switch (decorator.name) {
				case property.ID:
					isId = true
					break
				// case property.R_JOIN_COLUMN:
				// 	if (!entity.isRepositoryEntity) {
				// 		throw `${entity.name}.${aProperty.name} cannot be @RJoinColumn `
				// 		+ `- ${entity.name} does not extend RepositoryEntity or
				// LocalRepositoryEntity.`; } repositoryJoin = true;
				case property.JOIN_COLUMN:
					if (columnsDefined) {
						throw `Columns are defined more than once for ${entity.name}.${aProperty.name}`
					}
					columnsDefined = true
					foreignKey     = decorator.values[0].foreignKey
					columnRelationDefs.push(decorator.values[0])
					break
				// case property.R_JOIN_COLUMNS:
				// 	if (!entity.isRepositoryEntity) {
				// 		throw `${entity.name}.${aProperty.name} cannot be @RJoinColumns `
				// 		+ `- ${entity.name} does not extend RepositoryEntity or
				// LocalRepositoryEntity.`; } repositoryJoin = true;
				case property.JOIN_COLUMNS:
					if (columnsDefined) {
						throw `Columns are defined more than once for ${entity.name}.${aProperty.name}`
					}
					columnsDefined = true
					if (decorator.values[0] instanceof Array) {
						columnRelationDefs = columnRelationDefs.concat(decorator.values[0].slice())
					} else {
						throw `"${entity.name}.${aProperty.name} " is decorated with @JoinColumns decorator
						which must be provided an array of column join definitions (and currently is provided
						something other than an Array).`
						// columnRelationDefs = columnRelationDefs.concat(decorator.values[0].value);
						// foreignKey = decorator.values[0].foreignKey;
					}
					break
				case property.MANY_TO_ONE:
					if (relationType) {
						throw `Cardinality (@ManyToOne,@OneToMany) is defined more than once for ${entity.name}.${aProperty.name}`
					}
					manyToOne    = decorator.values[0]
					relationType = EntityRelationType.MANY_TO_ONE
					break
				case property.ONE_TO_MANY:
					if (isId) {
						throw `A property cannot be be both @OneToMany and @Id`
					}
					if (relationType) {
						throw `Cardinality (@ManyToOne,@OneToMany) is defined more than once for ${entity.name}.${aProperty.name}`
					}
					oneToMany    = decorator.values[0]
					relationType = EntityRelationType.ONE_TO_MANY
					break
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
					throw `Unsupported cardinality decorator ${decorator.name}`
			}
		}
		if (!relationType && relationType !== 0) {
			throw `Cardinality (@ManyToOne,@OneToMany) is not defined for ${entity.name}.${aProperty.name}`
		}
		const columns: SColumn[]                  = []
		const sRelationColumns: SRelationColumn[] = []
		let relationMustBeSingleIdEntity          = false
		const propertyIndex                       = aProperty.index + numParentProperties
		if (columnsDefined) {
			for (const columnRelationDef of columnRelationDefs) {
				let name    = columnRelationDef.name
				let notNull = false
				if (name) {
					name = name.toUpperCase()
				} else {
					throw `"name" is not defined in for a JoinColumn(s) configuration of ${entity.name}.${aProperty.name}`
				}
				if (columnRelationDef.nullable === false) {
					notNull = true
				}
				let referencedColumnName = columnRelationDef.referencedColumnName
				if (referencedColumnName) {
					referencedColumnName = referencedColumnName.toUpperCase()
				} else {
					referencedColumnName = name
				}
				let ownColumnReference
				let relationColumnReference
				let isManyToOne = false
				switch (relationType) {
					case EntityRelationType.MANY_TO_ONE:
						ownColumnReference      = name
						relationColumnReference = referencedColumnName
						isManyToOne             = true
						break
					case EntityRelationType.ONE_TO_MANY:
						ownColumnReference      = referencedColumnName
						relationColumnReference = name
						break
					default:
						throw `Uknown EntityRelationType: ${relationType}.`
				}
				const [sRelationColumn, sColumn] = this.processRelationColumn(
					ownColumnReference, relationColumnReference, isManyToOne,
					isIdProperty, propertyIndex, entity,
					relationColumnMapByName, primitiveColumnMapByName, notNull)
				sRelationColumns.push(sRelationColumn)
				if (sColumn) {
					columns.push(sColumn)
				}
			}
		} else {
			switch (relationType) {
				case EntityRelationType.MANY_TO_ONE: {
					if (!this.entityExtendsRepositoryEntity(aProperty.entity)) {
						throw new Error(`@JoinColumn(s) must be specified for @ManyToOne
					in ${entity.name}.${aProperty.name} (if the related entity does not extend RepositoryEntity).`)
					}
					const relatedTableName = this.getTableNameFromEntity(aProperty.entity)

					const notNull = this.isManyToOnePropertyNotNull(aProperty)

					const relationColumnReferences = ['REPOSITORY_ID', 'ACTOR_ID', 'ACTOR_RECORD_ID'];

					['_RID', '_AID', '_ARID'].forEach((
						suffix,
						index
					) => {
						const [sRelationColumn, sColumn] = this.processRelationColumn(
							relatedTableName + suffix, relationColumnReferences[index], true,
							isIdProperty, propertyIndex, entity,
							relationColumnMapByName, primitiveColumnMapByName, notNull)
						sRelationColumns.push(sRelationColumn)
						if (sColumn) {
							columns.push(sColumn)
						}
					})
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
				case EntityRelationType.ONE_TO_MANY:
					// Nothing to do
					break
				default:
					throw `Uknown EntityRelationType: ${relationType}.`
			}
		}
		let entityName
		let referencedSchemaIndex
		if (!aProperty.entity) {
			if (!aProperty.fromProject) {
				throw `Neither entity nor source project was specified for for ${entity.name}.${aProperty.name}`
			}

			let schemaReference = referencedSchemasByProjectName[aProperty.fromProject]

			if (!schemaReference) {
				const dbSchema = globalCandidateRegistry.getReferencedSchema(aProperty.fromProject, aProperty)
				if (!dbSchema) {
					throw `Could not find related project '${aProperty.fromProject}' for ${entity.name}.${aProperty.name}`
				}

				schemaReference                                       = {
					index: Object.keys(referencedSchemasByProjectName).length,
					dbSchema
				}
				referencedSchemasByProjectName[aProperty.fromProject] = schemaReference
			}

			referencedSchemaIndex = schemaReference.index
			const propertyType    = aProperty.nonArrayType
			let relatedEntity     = schemaReference.dbSchema.currentVersion.entityMapByName[propertyType]
			if (!relatedEntity) {
				if (canBeInterface(propertyType)) {
					const entityType = getImplNameFromInterfaceName(propertyType)
					relatedEntity    = schemaReference.dbSchema.currentVersion.entityMapByName[entityType]
					if (!relatedEntity) {
						throw `Could not find related entity '${entityType}' 
						(from interface ${propertyType}) 
						in project '${aProperty.fromProject}' 
						for ${entity.name}.${aProperty.name}`
					}
				} else {
					throw `Could not find related entity '${propertyType}' 
					in project '${aProperty.fromProject}' 
					for ${entity.name}.${aProperty.name}`
				}
			}
			entityName = relatedEntity.name
		} else {
			entityName = aProperty.entity.type
		}
		let relation: SRelation = {
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
		}

		entity.properties.push({
			columns,
			index: propertyIndex,
			isId: isIdProperty,
			name: aProperty.name,
			relation
		})
	}

	private getTableNameFromEntity(
		entityCandidate: EntityCandidate
	) {
		const tableDecorators = entityCandidate.docEntry.decorators.filter(
			decorator =>
				decorator.name === 'Table'
		)
		if (!tableDecorators.length) {
			return entityCandidate.docEntry.name.toUpperCase()
		}

		return tableDecorators[0].values[0].name
	}

	private isManyToOnePropertyNotNull(
		aProperty: PropertyDocEntry
	) {
		const manyToOneDecoratorValues = aProperty.decorators.filter(
			decorator =>
				decorator.name === 'ManyToOne'
		)[0].values

		if (!manyToOneDecoratorValues.length) {
			return false
		}

		return manyToOneDecoratorValues[0].optional === false
	}

	private entityExtendsRepositoryEntity( //
		entityCandidate: EntityCandidate //
	): [boolean, boolean] {
		const parentEntity = entityCandidate.parentEntity
		if (!parentEntity) {
			return [false, true]
		}
		if (parentEntity.docEntry.name === repositoryEntity.ENTITY_NAME) {
			return [true, false]
		}
		if (parentEntity.docEntry.name === repositoryEntity.LOCAL_ENTITY_NAME) {
			return [true, true]
		}
		return this.entityExtendsRepositoryEntity(entityCandidate.parentEntity)
	}

	private processPrimitiveColumns(
		properties: PropertyDocEntry[],
		isIdProperty: boolean,
		entity: SEntity,
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		numParentProperties: number
	) {
		for (const aProperty of properties) {
			const propertyIndex = aProperty.index + numParentProperties
			entity.properties.push({
				columns: [this.processPrimitiveColumn(
					aProperty, isIdProperty, propertyIndex, entity, primitiveColumnMapByName)],
				index: propertyIndex,
				isId: isIdProperty,
				name: aProperty.name,
				relation: undefined
			})
		}
	}

	private processPrimitiveColumn(
		aProperty: PropertyDocEntry,
		isIdProperty: boolean,
		propertyIndex: number,
		entity: SEntity,
		primitiveColumnMapByName: { [columnName: string]: SColumn }
	): SColumn {
		let columnName
		let notNull       = false
		let columnDefined = false
		for (const decorator of aProperty.decorators) {
			switch (decorator.name) {
				case property.COLUMN:
					if (columnDefined) {
						throw `@Column is defined more than once for ${entity.name}.${aProperty.name}`
					}
					columnDefined = true
					if (decorator.values.length) {
						const columnDecoratorDefs = decorator.values[0]
						columnName                = columnDecoratorDefs.name
						if (columnDecoratorDefs.nullable === false) {
							notNull = true
						}
					} else {
						columnName = aProperty.name
					}
			}
		}
		if (!columnName) {
			columnName = aProperty.name
		}
		columnName = columnName.toUpperCase()

		if (!columnName) {
			throw `Could not find a columnName in "${entity.name}"`
		}

		const existingColumn = primitiveColumnMapByName[columnName]
		if (existingColumn) {
			throw `More than one @Column({name: "${columnName}"}) defined in "${entity.name}"`
		}
		if (aProperty.isGenerated
			&& aProperty.primitive !== 'number'
			&& aProperty.primitive !== 'string') {
			throw `Column '${columnName}' defined in "${entity.name}" is a @GeneratedValue()
			but isn't of type "number" or "string"`
		}

		let idIndex = undefined
		if (isIdProperty) {
			idIndex = this.getIdColumnIndex(entity, columnName)
		}
		const column: SColumn                = {
			allocationSize: aProperty.allocationSize,
			columnDefinition: aProperty.columnDefinition,
			idIndex,
			index: this.getColumnIndex(entity, idIndex),
			isGenerated: aProperty.isGenerated,
			name: columnName,
			notNull,
			propertyRefs: [propertyIndex],
			type: aProperty.primitive
		}
		primitiveColumnMapByName[columnName] = column

		return column
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
	private processRelationColumn(
		ownColumnReference: string,
		relationColumnReference: string,
		manyToOne: boolean,
		isIdProperty: boolean,
		propertyIndex: number,
		entity: SEntity,
		relationColumnMapByName: { [columnName: string]: SColumn },
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		notNull: boolean,
		entityCannotReferenceOtherColumns: boolean = false,
	): [SRelationColumn, SColumn] {
		// const ownColumnIdIndex                 = this.getIdColumnIndex(ownColumnReference)
		// const relationColumnIdIndex            =
		// this.getIdColumnIndex(relationColumnReference)
		const sRelationColumn: SRelationColumn = {
			manyToOne,
			oneSideRelationIndex: null,
			// ownColumnIdIndex,
			ownColumnReference,
			// relationColumnIdIndex,
			relationColumnReference
		}
		// if (ownColumnIdIndex) {
		// 	if (isIdProperty) {
		// 		throw `ManyToOne/OneToMany relation cannot be @Id and reference Id columns at
		// the same time.` }  return [ sRelationColumn, null ] }

		const existingPrimitiveColumn = primitiveColumnMapByName[ownColumnReference]
		if (existingPrimitiveColumn) {
			if (manyToOne && isIdProperty) {
				// if (entityCannotReferenceOtherColumns) {
				// throw `ManyToOne relation without (R)JoinColumn(s) cannot be named as other
				// columns.`;
				throw `@Id & @ManyToOne relation columns cannot be named as other non-relational columns.
			A column can either be defined as a non-relational column
			OR as a relation.
			Column: '${entity.name}.${ownColumnReference}'`
			}
			if ((existingPrimitiveColumn.notNull && !notNull)
				|| (!existingPrimitiveColumn.notNull && notNull)) {
				throw new Error(`Column ${existingPrimitiveColumn.name} has conflicting nullable definitions`)
			}
			return [
				sRelationColumn,
				existingPrimitiveColumn
			]
		}

		const existingRelationColumn = relationColumnMapByName[ownColumnReference]
		if (existingRelationColumn) {
			if (manyToOne && isIdProperty) {
				// if (entityCannotReferenceOtherColumns) {
				// throw `ManyToOne relation without (R)JoinColumn(s) cannot be named as other
				// columns.`;
				throw `@Id & @ManyToOne relation columns cannot be named in multiple relations.
			A @Id column can be defined in only one relation.
			Column: '${entity.name}.${ownColumnReference}'`
			}
			if (entityCannotReferenceOtherColumns) {
				throw `ManyToOne relation without JoinColumn(s) cannot be named as other columns.`
			}
			if ((existingRelationColumn.notNull && !notNull)
				|| (!existingRelationColumn.notNull && notNull)) {
				throw new Error(`Column ${existingRelationColumn.name} has conflicting nullable definitions`)
			}
			existingRelationColumn.propertyRefs.push(propertyIndex)
			return [
				sRelationColumn,
				existingRelationColumn
			]
		}

		let idIndex = undefined
		if (isIdProperty) {
			idIndex = this.getIdColumnIndex(entity, ownColumnReference)
		}
		const column: SColumn                       = {
			idIndex,
			index: this.getColumnIndex(entity, idIndex),
			name: ownColumnReference,
			notNull,
			propertyRefs: [propertyIndex],
			type: undefined
		}
		relationColumnMapByName[ownColumnReference] = column

		return [
			sRelationColumn,
			column
		]
	}

	getIdColumnIndex(
		entity: SEntity,
		columnName: string
	) {
		if (!entity.isRepositoryEntity) {
			return entity.numIdColumns++
		}

		entity.numIdColumns = 3

		switch (columnName) {
			case 'REPOSITORY_ID':
				return 0
			case 'ACTOR_ID':
				return 1
			case 'ACTOR_RECORD_ID':
				return 2
			default:
				throw `Repository Entity @Id columns must be 'REPOSITORY_ID', 'ACTOR_ID' and 'ACTOR_RECORD_ID'`
		}

	}

	getColumnIndex(
		entity: SEntity,
		idIndex: number | undefined
	) {
		if (!entity.isRepositoryEntity) {
			return entity.numColumns++
		}

		if (!entity.numColumns) {
			entity.numColumns = 3
		}
		if (idIndex !== undefined) {
			return idIndex
		}

		return entity.numColumns++
	}

	/*
		private getIdColumnIndex(
			columnName: string | IdColumnOnlyIndex,
			throwIfNotFound?: string
		) {
			let idColumnIndex

			switch (columnName) {
				case 'IdColumnIndex.ONE':
				case '1':
					idColumnIndex = 0
					break
				case 'IdColumnIndex.TWO':
				case '2':
					idColumnIndex = 1
					break
				case 'IdColumnIndex.THREE':
				case '3':
					idColumnIndex = 2
					break
				case 'IdColumnIndex.FOUR':
				case '4':
					idColumnIndex = 3
					break
				case 'IdColumnIndex.FIVE':
				case '5':
					idColumnIndex = 4
					break
				default:
					if (throwIfNotFound) {
						throw throwIfNotFound
					}
			}

			return idColumnIndex
		}
	*/

}
