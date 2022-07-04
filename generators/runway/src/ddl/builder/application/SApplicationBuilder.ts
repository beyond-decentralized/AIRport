import {
	DatabaseForeignKey,
	DatabaseManyToOneElements,
	DatabaseOneToManyElements,
	DbApplication,
	EntityRelationType,
	file,
	property,
	airEntity,
} from '@airport/ground-control';
import {
	canBeInterface,
	getImplNameFromInterfaceName
} from '../../../resolve/pathResolver';
import { Configuration } from '../../options/Options';
import {
	Decorator,
	PropertyDocEntry
} from '../../parser/DocEntry';
import { EntityCandidate } from '../../parser/EntityCandidate';
import { globalCandidateRegistry } from '../../parser/EntityDefinitionGenerator';
import { ApplicationRelationResolver } from './ApplicationRelationResolver';
import { SEntity } from './SEntity';
import {
	SColumn,
	SRelation,
	SRelationColumn
} from './SProperty';
import {
	buildIndexedSApplication,
	SIndexedApplication,
	SApplication,
	SApplicationReference
} from './SApplication';

export class SApplicationBuilder {

	constructor(
		private config: Configuration,
		private entityMapByName: { [entityName: string]: EntityCandidate },
	) {
	}

	build(
		applicationMapByProjectName: { [projectName: string]: DbApplication }
	): SIndexedApplication {
		const referencedApplicationsByProjectName: {
			[projectName: string]: SApplicationReference
		} = {};
		const originalReferencedApplicationsByProjectName: {
			[projectName: string]: SApplicationReference
		} = {};
		const referencedApplications: SApplicationReference[] = [];
		let applicationReferenceIndex = 0;
		for (let projectName in applicationMapByProjectName) {
			const sApplicationReference = {
				index: applicationReferenceIndex,
				dbApplication: applicationMapByProjectName[projectName]
			};
			referencedApplications.push(sApplicationReference);
			referencedApplicationsByProjectName[projectName] = sApplicationReference;
			originalReferencedApplicationsByProjectName[projectName] = sApplicationReference;

			applicationReferenceIndex++;
		}
		const application: SApplication = {
			domain: this.config.airport.domain,
			entities: [],
			packageName: this.config.name,
			name: this.config.name,
			referencedApplications,
		};

		const sEntityMapByName: { [name: string]: SEntity } = {};
		for (const entityName in this.entityMapByName) {
			const entityCandidate: EntityCandidate = this.entityMapByName[entityName];
			const tableIndex = application.entities.length;
			const entity = this.buildEntity(entityCandidate, tableIndex, referencedApplicationsByProjectName);
			if (entity) {
				application.entities.push(entity);
				sEntityMapByName[entityName] = entity;
			}
		}

		for (const projectName in referencedApplicationsByProjectName) {
			if (!originalReferencedApplicationsByProjectName[projectName]) {
				referencedApplications.push(referencedApplicationsByProjectName[projectName]);
			}
		}

		referencedApplications.sort((
			a,
			b
		) => a.index - b.index);

		const indexedApplication = buildIndexedSApplication(application, referencedApplicationsByProjectName);

		new ApplicationRelationResolver().resolveAllRelationLinks(indexedApplication);

		return indexedApplication;
	}

	getIdColumnIndex(
		entity: SEntity,
		columnName: string
	) {
		if (!entity.isAirEntity) {
			return entity.numIdColumns++;
		}

		entity.numIdColumns = 3;

		switch (columnName) {
			case airEntity.REPOSITORY_LID:
				return 0;
			case airEntity.ACTOR_LID:
				return 1;
			case airEntity.ACTOR_RECORD_ID:
				return 2;
			default:
				throw new Error(
					`AirEntity @Id columns must be 'REPOSITORY_LID', 'ACTOR_LID' and 'ACTOR_RECORD_ID'`);
		}

	}

	getColumnIndex(
		entity: SEntity,
		idIndex: number | undefined
	) {
		if (!entity.isAirEntity) {
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

	private buildEntity(
		entityCandidate: EntityCandidate,
		tableIndex: number,
		referencedApplicationsByProjectName: { [projectName: string]: SApplicationReference },
	): SEntity {
		let foundEntityDecorator = false;
		let tableConfig;
		for (const decorator of entityCandidate.docEntry.decorators) {
			switch (decorator.name) {
				case file.ENTITY: {
					foundEntityDecorator = true;
					break;
				}
				case file.TABLE: {
					const decoratorValue = decorator.values[0];
					if (!decoratorValue) {
						throw new Error(`@Table decorator is missing property definition object:
@Entity()
@Table({ name: "YOUR_TABLE_NAME"})
class ${entityCandidate.docEntry.name}
						
`)
					}
					const tableName = decoratorValue.name
					if (!decoratorValue) {
						throw new Error(`@Table decorator is missing name property:
@Entity()
@Table({ name: "YOUR_TABLE_NAME"})
class ${entityCandidate.docEntry.name}
						
`)
					}
					if (!/^[A-Z]/.test(tableName)) {
						throw new Error(`
Table name does not start with an uppercase letter:

@Entity()
@Table({ name: "${tableName}"})
class ${entityCandidate.docEntry.name}

`)
					} else if (!/^[0-9A-Z_]+$/.test(tableName)) {
						throw new Error(`
Table name contains characters other than uppercase letters, numbers and underscores:

@Entity()
@Table({ name: "${tableName}"})
class ${entityCandidate.docEntry.name}

`)
					}
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

		const [isAirEntity, isLocal]
			= entityExtendsAirEntity(entityCandidate);

		let entity: SEntity = {
			isLocal,
			isAirEntity,
			name: entityCandidate.docEntry.name,
			numColumns: 0,
			numIdColumns: 0,
			numRelations: 0,
			properties: [],
			table: tableConfig,
			tableIndex
		};

		const primitiveColumnMapByName: { [columnName: string]: SColumn } = {};
		const relationColumnMapByName: { [columnName: string]: SColumn } = {};
		const relatedTableMap: Map<string, number> = new Map();

		this.buildColumnsWithParentEntities(
			entityCandidate, entity, primitiveColumnMapByName, relationColumnMapByName,
			relatedTableMap, referencedApplicationsByProjectName);

		entity.properties.sort((
			prop1,
			prop2
		) => {
			return prop1.index - prop2.index;
		});

		if (entity.isAirEntity) {
			if (entity.numIdColumns !== 3) {
				throw new Error(`Repository entity '${entity.name}' must have 3 id columns 
				and has ${entity.numIdColumns}.`);
			}
		}

		return entity;
	}

	private buildColumnsWithParentEntities(
		entityCandidate: EntityCandidate,
		entity: SEntity,
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		relationColumnMapByName: { [columnName: string]: SColumn },
		relatedTableMap: Map<string, number>,
		referencedApplicationsByProjectName: { [projectName: string]: SApplicationReference },
		project?: string,
	) {
		let parentEntity = entityCandidate.parentEntity;
		let numParentProperties = 0;
		if (parentEntity) {
			let parentProject = project;
			if (parentEntity.project) {
				parentProject = parentEntity.project;
			}
			numParentProperties = this.buildColumnsWithParentEntities(
				parentEntity, entity, primitiveColumnMapByName, relationColumnMapByName,
				relatedTableMap, referencedApplicationsByProjectName, parentProject);
		}
		return this.buildColumns(entityCandidate, entity,
			primitiveColumnMapByName, relationColumnMapByName, relatedTableMap,
			numParentProperties, referencedApplicationsByProjectName, project);
	}

	private buildColumns(
		entityCandidate: EntityCandidate,
		entity: SEntity,
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		relationColumnMapByName: { [columnName: string]: SColumn },
		relatedTableMap: Map<string, number>,
		numParentProperties: number,
		referencedApplicationsByProjectName: { [projectName: string]: SApplicationReference },
		project?: string,
	): number {
		const idProperties = entityCandidate.getIdProperties();
		const primitiveIdProperties = idProperties.filter(
			aProperty => {
				if (!aProperty.fromProject) {
					aProperty.fromProject = project;
				}

				return aProperty.primitive;
			});
		this.processPrimitiveColumns(primitiveIdProperties, true, entity, primitiveColumnMapByName, numParentProperties);

		const nonIdProperties = entityCandidate.getNonIdProperties();
		const primitiveNonIdProperties = nonIdProperties.filter(
			aProperty => {
				if (!aProperty.fromProject) {
					aProperty.fromProject = project;
				}

				return aProperty.primitive;
			});
		this.processPrimitiveColumns(primitiveNonIdProperties, false, entity, primitiveColumnMapByName, numParentProperties);

		const relationIdProperties = idProperties.filter(
			aProperty => !aProperty.primitive);
		for (const aProperty of relationIdProperties) {
			this.processRelationProperty(
				aProperty,
				true,
				entityCandidate,
				entity,
				relationColumnMapByName,
				primitiveColumnMapByName,
				relatedTableMap,
				numParentProperties,
				referencedApplicationsByProjectName
			);
		}

		const relationNonIdProperties = nonIdProperties.filter(
			aProperty => !aProperty.primitive);
		for (const aProperty of relationNonIdProperties) {
			this.processRelationProperty(
				aProperty,
				false,
				entityCandidate,
				entity,
				relationColumnMapByName,
				primitiveColumnMapByName,
				relatedTableMap,
				numParentProperties,
				referencedApplicationsByProjectName
			);
		}

		return numParentProperties + idProperties.length + nonIdProperties.length;
	}

	private processRelationProperty(
		aProperty: PropertyDocEntry,
		isIdProperty: boolean,
		entityCandidate: EntityCandidate,
		entity: SEntity,
		relationColumnMapByName: { [columnName: string]: SColumn },
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		relatedTableMap: Map<string, number>,
		numParentProperties: number,
		referencedApplicationsByProjectName: { [projectName: string]: SApplicationReference },
	): void {
		let columnRelationDefs = [];
		let columnsDefined = false;
		let foreignKey: DatabaseForeignKey;
		let manyToOne: DatabaseManyToOneElements = undefined;
		let oneToMany: DatabaseOneToManyElements = undefined;
		let isId = false;
		// let repositoryJoin                       = false;
		// let addToJoinFunction;
		// let joinFunctionWithOperator = SqlOperator.AND
		let relationType: EntityRelationType;
		for (const decorator of aProperty.decorators) {
			switch (decorator.name) {
				case property.ID:
					isId = true;
					break;
				// case property.R_JOIN_COLUMN:
				// 	if (!entity.isAirEntity) {
				// 		throw new Error(`${entity.name}.${aProperty.name} cannot be @RJoinColumn `
				// 		+ `- ${entity.name} does not extend AirEntity or
				// LocalAirEntity.`); } repositoryJoin = true;
				case property.JOIN_COLUMN:
					if (columnsDefined) {
						throw new Error(`Columns are defined more than once 
						for ${entity.name}.${aProperty.name}`);
					}
					columnsDefined = true;
					foreignKey = decorator.values[0].foreignKey;
					columnRelationDefs.push(decorator.values[0]);
					break;
				// case property.R_JOIN_COLUMNS:
				// 	if (!entity.isAirEntity) {
				// 		throw new Error(`${entity.name}.${aProperty.name} cannot be @RJoinColumns `
				// 		+ `- ${entity.name} does not extend AirEntity or
				// LocalAirEntity.`); } repositoryJoin = true;
				case property.JOIN_COLUMNS:
					if (columnsDefined) {
						throw new Error(`Columns are defined more than once 
						for ${entity.name}.${aProperty.name}`);
					}
					columnsDefined = true;
					if (decorator.values[0] instanceof Array) {
						columnRelationDefs = columnRelationDefs.concat(decorator.values[0].slice());
					} else {
						throw new Error(
							`"${entity.name}.${aProperty.name} " is decorated with @JoinColumns decorator
						which must be provided an array of column join definitions (and currently is provided
						something other than an Array).`);
						// columnRelationDefs = columnRelationDefs.concat(decorator.values[0].value);
						// foreignKey = decorator.values[0].foreignKey;
					}
					break;
				case property.MANY_TO_ONE:
					if (relationType) {
						throw new Error(
							`Cardinality (@ManyToOne,@OneToMany) is defined more than once 
							for ${entity.name}.${aProperty.name}`);
					}
					manyToOne = decorator.values[0];
					relationType = EntityRelationType.MANY_TO_ONE;
					break;
				case property.ONE_TO_MANY:
					if (isId) {
						throw new Error(`A property cannot be be both @OneToMany and @Id`);
					}
					if (relationType) {
						throw new Error(`Cardinality (@ManyToOne,@OneToMany) is defined more than once 
						for ${entity.name}.${aProperty.name}`);
					}
					oneToMany = decorator.values[0];
					relationType = EntityRelationType.ONE_TO_MANY;
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
		if (!relationType) {
			throw new Error(
				`Cardinality (@ManyToOne,@OneToMany) is not defined 
				for ${entity.name}.${aProperty.name}`);
		}
		const columns: SColumn[] = [];
		const sRelationColumns: SRelationColumn[] = [];
		let relationMustBeSingleIdEntity = false;
		const propertyIndex = aProperty.index + numParentProperties;
		if (columnsDefined) {
			for (const columnRelationDef of columnRelationDefs) {
				let name = columnRelationDef.name;
				let notNull = false;
				if (name) {
					name = name.toUpperCase();
				} else {
					throw new Error(`"name" is not defined in for a JoinColumn(s) configuration 
					of ${entity.name}.${aProperty.name}`);
				}
				if (columnRelationDef.nullable === false) {
					notNull = true;
				}
				let referencedColumnName = columnRelationDef.referencedColumnName;
				if (referencedColumnName) {
					referencedColumnName = referencedColumnName.toUpperCase();
				} else {
					referencedColumnName = name;
				}
				let ownColumnReference;
				let relationColumnReference;
				let isManyToOne = false;
				switch (relationType) {
					case EntityRelationType.MANY_TO_ONE:
						ownColumnReference = name;
						relationColumnReference = referencedColumnName;
						isManyToOne = true;
						break;
					case EntityRelationType.ONE_TO_MANY:
						ownColumnReference = referencedColumnName;
						relationColumnReference = name;
						break;
					default:
						throw new Error(`Uknown EntityRelationType: ${relationType}.`);
				}
				const [sRelationColumn, sColumn] = this.processRelationColumn(
					ownColumnReference, relationColumnReference, isManyToOne,
					isIdProperty, propertyIndex, entity,
					relationColumnMapByName, primitiveColumnMapByName, notNull);
				sRelationColumns.push(sRelationColumn);
				if (sColumn) {
					columns.push(sColumn);
				}
			}
		} else {
			switch (relationType) {
				case EntityRelationType.MANY_TO_ONE: {
					let extendsEntity, isLocal
					if (aProperty.entity) {
						const extendsRepoEntityResult = entityExtendsAirEntity(aProperty.entity)
						extendsEntity = extendsRepoEntityResult[0]
						isLocal = extendsRepoEntityResult[1]
					} else if (aProperty.otherApplicationDbEntity) {
						const otherAppDbEntity = aProperty.otherApplicationDbEntity
						if (otherAppDbEntity.isAirEntity) {
							extendsEntity = true
							isLocal = false
						} else if (isLocal) {
							extendsEntity = true
							isLocal = true
						} else {
							extendsEntity = false
							isLocal = false
						}
					} else {
						throw new Error(`Relation must either point to an entity in this Application
	or to an entity in another application.`)
					}
					if (!extendsEntity || isLocal) {
						throw new Error(`@JoinColumn(s) must be specified for @ManyToOne
					in ${entity.name}.${aProperty.name} for non-repository entities.  Did you forget 'extends AirEntity'?`);
					}
					let relatedTableName
					if (aProperty.entity) {
						relatedTableName = this.getTableNameFromEntity(aProperty.entity);
					} else {
						const otherAppDbEntity = aProperty.otherApplicationDbEntity
						if (otherAppDbEntity.tableConfig && otherAppDbEntity.tableConfig.name) {
							relatedTableName = otherAppDbEntity.tableConfig.name
						} else {
							relatedTableName = otherAppDbEntity.name.toUpperCase()
						}
					}

					const notNull = isManyToOnePropertyNotNull(aProperty);

					const relationColumnReferences = [
						airEntity.REPOSITORY_LID, airEntity.ACTOR_LID,
						airEntity.ACTOR_RECORD_ID];

					let numExistingReferenceToTable = relatedTableMap.get(relatedTableName)

					if (!numExistingReferenceToTable) {
						numExistingReferenceToTable = 1
					} else {
						numExistingReferenceToTable++
					}
					relatedTableMap.set(relatedTableName, numExistingReferenceToTable)

					const columnSuffixes = ['_RID_', '_AID_', '_ARID_'].map(suffix =>
						suffix + numExistingReferenceToTable)

					columnSuffixes.forEach((
						suffix,
						index
					) => {
						const [sRelationColumn, sColumn] = this.processRelationColumn(
							relatedTableName + suffix, relationColumnReferences[index], true,
							isIdProperty, propertyIndex, entity,
							relationColumnMapByName, primitiveColumnMapByName, notNull);
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
				case EntityRelationType.ONE_TO_MANY:
					// Nothing to do
					break;
				default:
					throw new Error(`Uknown EntityRelationType: ${relationType}.`);
			}
		}
		let entityName;
		let referencedApplication_Index;
		if (!aProperty.entity) {
			if (!aProperty.fromProject) {
				throw new Error(`Neither entity nor source project was specified 
				for ${entity.name}.${aProperty.name}`);
			}

			let applicationReference = referencedApplicationsByProjectName[aProperty.fromProject];

			if (!applicationReference) {
				const dbApplication = globalCandidateRegistry.getReferencedApplication(aProperty.fromProject, aProperty);
				if (!dbApplication) {
					throw new Error(`Could not find related project '${aProperty.fromProject}' 
					for ${entity.name}.${aProperty.name}`);
				}

				applicationReference = {
					index: Object.keys(referencedApplicationsByProjectName).length,
					dbApplication
				};
				referencedApplicationsByProjectName[aProperty.fromProject] = applicationReference;
			}

			referencedApplication_Index = applicationReference.index;
			const propertyType = aProperty.nonArrayType;
			let relatedEntity = applicationReference.dbApplication.currentVersion[0]
				.applicationVersion.entityMapByName[propertyType];
			if (!relatedEntity) {
				if (canBeInterface(propertyType)) {
					const entityType = getImplNameFromInterfaceName(propertyType);
					relatedEntity = applicationReference.dbApplication.currentVersion[0]
						.applicationVersion.entityMapByName[entityType];
					if (!relatedEntity) {
						throw new Error(`Could not find related entity '${entityType}' 
						(from interface ${propertyType}) 
						in project '${aProperty.fromProject}' 
						for ${entity.name}.${aProperty.name}`);
					}
				} else {
					throw new Error(`Could not find related entity '${propertyType}' 
					in project '${aProperty.fromProject}' 
					for ${entity.name}.${aProperty.name}`);
				}
			}
			entityName = relatedEntity.name;
		} else {
			entityName = aProperty.entity.type;
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
			referencedApplication_Index,
			relationMustBeSingleIdEntity,
			// repositoryJoin,
			sRelationColumns
		};

		entity.properties.push({
			columns,
			index: propertyIndex,
			isId: isIdProperty,
			name: aProperty.name,
			optional: aProperty.optional,
			relation
		});
	}

	private getTableNameFromEntity(
		entityCandidate: EntityCandidate
	) {
		const tableDecorators = entityCandidate.docEntry.decorators.filter(
			decorator =>
				decorator.name === 'Table'
		);
		if (!tableDecorators.length) {
			return entityCandidate.docEntry.name.toUpperCase();
		}

		return tableDecorators[0].values[0].name;
	}

	private isManyToOnePropertyNotNull(
		aProperty: PropertyDocEntry
	) {
		const manyToOneDecoratorValues = aProperty.decorators.filter(
			decorator =>
				decorator.name === 'ManyToOne'
		)[0].values;

		if (!manyToOneDecoratorValues.length) {
			return false;
		}

		return manyToOneDecoratorValues[0].optional === false;
	}

	private processPrimitiveColumns(
		properties: PropertyDocEntry[],
		isIdProperty: boolean,
		entity: SEntity,
		primitiveColumnMapByName: { [columnName: string]: SColumn },
		numParentProperties: number
	) {
		for (const aProperty of properties) {
			const propertyIndex = aProperty.index + numParentProperties;
			entity.properties.push({
				columns: [this.processPrimitiveColumn(
					aProperty, isIdProperty, propertyIndex, entity, primitiveColumnMapByName)],
				index: propertyIndex,
				isId: isIdProperty,
				name: aProperty.name,
				optional: aProperty.optional,
				relation: undefined
			});
		}
	}

	private processPrimitiveColumn(
		aProperty: PropertyDocEntry,
		isIdProperty: boolean,
		propertyIndex: number,
		entity: SEntity,
		primitiveColumnMapByName: { [columnName: string]: SColumn }
	): SColumn {
		let columnName;
		let notNull = false;
		let columnDefined = false;
		let precision = null;
		let scale = null;
		for (const decorator of aProperty.decorators) {
			switch (decorator.name) {
				case property.COLUMN:
					if (columnDefined) {
						throw new Error(`@Column is defined more than once
						 for ${entity.name}.${aProperty.name}`);
					}
					columnDefined = true;
					if (decorator.values.length) {
						const columnDecoratorDefs = decorator.values[0];
						columnName = columnDecoratorDefs.name;
						if (!/^[A-Z]/.test(columnName)) {
							throw new Error(`
Column name does not start with an uppercase letter:

@Entity()
class ${entity.name}

	@Column({ name: "${columnName}")
	${aProperty.name}
	
	`)
						} else if (!/^[0-9A-Z_]+$/.test(columnName)) {
							throw new Error(`
Column name contains characters other than uppercase letters, numbers and underscores:

@Entity()
class ${entity.name}

	@Column({ name: "${columnName}")
	${aProperty.name}
	
	`)
						}
						if (columnDecoratorDefs.nullable === false) {
							notNull = true;
						}
						if (columnDecoratorDefs.precision) {
							precision = columnDecoratorDefs.precision;
						}
						if (columnDecoratorDefs.scale) {
							scale = columnDecoratorDefs.scale;
						}
					} else {
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
		const column: SColumn = {
			allocationSize: aProperty.allocationSize,
			columnDefinition: aProperty.columnDefinition,
			idIndex,
			index: this.getColumnIndex(entity, idIndex),
			isGenerated: aProperty.isGenerated,
			name: columnName,
			notNull,
			precision,
			propertyRefs: [propertyIndex],
			scale,
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
		const column: SColumn = {
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

	/*
		private getIdColumnIndex(
			columnName: string | ApplicationColumn_IdIndex,
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
						throw new Error(throwIfNotFound)
					}
			}

			return idColumnIndex
		}
	*/

}

export function entityExtendsAirEntity( //
	entityCandidate: EntityCandidate //
): [boolean, boolean] {
	return entityExtendsOrIsAirEntity(entityCandidate.parentEntity)
}



export function entityExtendsOrIsAirEntity( //
	entityCandidate: EntityCandidate //
): [boolean, boolean] {
	if (!entityCandidate) {
		return [false, true];
	}
	if (entityCandidate.docEntry.name === airEntity.ENTITY_NAME) {
		return [true, false];
	}
	if (entityCandidate.docEntry.name === airEntity.LOCAL_ENTITY_NAME) {
		return [true, true];
	}
	return entityExtendsOrIsAirEntity(entityCandidate.parentEntity);
}

export function isManyToOnePropertyNotNull(
	aProperty: PropertyDocEntry
): boolean {
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

export function getManyToOneDecorator(
	aProperty: PropertyDocEntry
): Decorator {
	const manyToOneDecorators = aProperty.decorators.filter(
		decorator =>
			decorator.name === 'ManyToOne'
	);

	if (manyToOneDecorators.length) {
		return manyToOneDecorators[0];
	}

	return null;
}
