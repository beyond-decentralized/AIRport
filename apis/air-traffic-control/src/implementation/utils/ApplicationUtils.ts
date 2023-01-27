import {
	CRUDOperation,
	DbColumn,
	DbEntity,
	DbProperty,
	DbRelation,
	Dictionary,
	EntityRelationType,
	Application_Index,
	ApplicationEntity_TableIndex,
	IEntityStateManager,
	IApplicationUtils
} from '@airport/ground-control'
import {
	Inject,
	Injected
} from '@airport/direction-indicator'
import {
	convertToY,
	isY,
} from '@airport/tarmaq-query'
import {
	IAirportDatabase,
} from '../../definition/AirportDatabase'
import { IUtils } from '../../definition/utils/Utils'

interface ColumnValueForPath {
	value: any,
	path: string[]
}

@Injected()
export class ApplicationUtils
	implements IApplicationUtils {

	static TEMP_ID: number = 0

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	dictionary: Dictionary

	@Inject()
	entityStateManager: IEntityStateManager

	@Inject()
	utils: IUtils

	getDbEntity(
		applicationIndex: Application_Index,
		tableIndex: ApplicationEntity_TableIndex
	): DbEntity {
		return this.airportDatabase.applications[applicationIndex].currentVersion[0]
			.applicationVersion.entities[tableIndex]
	}

	isActorId(
		columnName: string
	): boolean {
		return columnName === this.dictionary.AirEntity.columns.ACTOR_LID
	}

	isActorRecordId(
		columnName: string
	): boolean {
		return columnName === this.dictionary.AirEntity.columns.ACTOR_RECORD_ID
	}

	isRepositoryId(
		columnName: string
	): boolean {
		return columnName === this.dictionary.AirEntity.columns.REPOSITORY_LID
	}

	doCascade(
		dbRelation: DbRelation,
		crudOperation: CRUDOperation
	): boolean {
		if (dbRelation.relationType !== EntityRelationType.ONE_TO_MANY) {
			return false
		}

		if (!dbRelation.oneToManyElems) {
			return false
		}

		switch (crudOperation) {
			case CRUDOperation.CREATE:
			case CRUDOperation.UPDATE:
			case CRUDOperation.DELETE:
				return true
			default:
				throw new Error(`Unsupported CRUDOperation '${crudOperation}' for cascade check.`)
		}
	}

	getEntityConstructor(
		dbEntity: DbEntity
	): any {
		const entityConstructor = this.airportDatabase.qApplications[dbEntity.applicationVersion.application.index]
			.__constructors__[dbEntity.name]
		return entityConstructor
	}

	getNewEntity(
		dbEntity: DbEntity
	): any {
		const entityConstructor = this.getEntityConstructor(dbEntity)
		if (!entityConstructor) {
			return {}
		}
		return new entityConstructor()
	}

	isIdEmpty(idValue: any): boolean {
		return !idValue && idValue !== 0
	}

	isEmpty(value: any): boolean {
		return this.isIdEmpty(value) && value !== false && value !== ''
	}

	isRelationColumn(
		dbColumn: DbColumn
	): boolean {
		return this.isManyRelationColumn(dbColumn)
			|| this.isOneRelationColumn(dbColumn)
	}

	isManyRelationColumn(
		dbColumn: DbColumn
	): boolean {
		return !!(dbColumn.manyRelationColumns && dbColumn.manyRelationColumns.length)
	}

	isOneRelationColumn(
		dbColumn: DbColumn
	): boolean {
		return !!(dbColumn.oneRelationColumns && dbColumn.oneRelationColumns.length)
	}

	getOneSideEntityOfManyRelationColumn(
		dbColumn: DbColumn
	): DbEntity {
		return dbColumn.manyRelationColumns[0].oneColumn.entity
	}

	getColumnPropertyNameChainsAndValue(
		dbEntity: DbEntity,
		dbColumn: DbColumn,
		entityObject: any,
		forIdKey = false,
		generateNegativeIdsForMissing = true
	): [string[][], any] {
		const columnValuesAndPaths = this.getColumnValuesAndPaths(
			dbColumn, entityObject, [], forIdKey, generateNegativeIdsForMissing)
		const firstColumnValueAndPath = columnValuesAndPaths[0]
		const propertyNameChains: string[][] = [firstColumnValueAndPath.path]
		const value = firstColumnValueAndPath.value
		columnValuesAndPaths.reduce((
			last,
			current
		) => {
			if (!this.utils.valuesEqual(last.value, current.value, true)) {
				throw new Error(`Values differ for ${dbEntity.name}.${dbColumn.name}:
						'${last.path.join('.')}' = ${last.value}
						'${current.path.join('.')}' = ${current.value}`)
			}
			propertyNameChains.push(current.path)

			return current
		})

		return [propertyNameChains, value]
	}

	addRelationToEntitySelectClause(
		dbRelation: DbRelation,
		selectClause: any,
		allowDefaults: boolean = false,
	): void {
		this.forEachColumnTypeOfRelation(
			dbRelation,
			(
				dbColumn: DbColumn,
				propertyNameChains: string[][]
			) => {
				let convertTo = true
				let propertySelectClause = selectClause
				const firstPropertyNameChain = propertyNameChains[0]
				firstPropertyNameChain.forEach((
					propertyNameLink,
					index
				) => {
					let propertyObject = propertySelectClause[propertyNameLink]
					if (!propertyObject) {
						propertyObject = {}
						this.entityStateManager.markAsStub(propertyObject)
						propertySelectClause[propertyNameLink] = propertyObject
					} else {
						if (index < firstPropertyNameChain.length - 1) {
							if (!(propertyObject instanceof Object) || propertyObject instanceof Date) {
								throw new Error(`Invalid entry:
								...
								{
									...
									${propertyNameLink}: ${propertyObject}
								}
								in '${dbRelation.property.entity.name}.${dbRelation.property.name}',
								Property must be an Object.`)
							}
						} else {
							if (!allowDefaults && !isY(propertyObject)) {
								const reason = dbRelation.property.isId
									? `'${dbRelation.property.entity.name}.${dbRelation.property.name}' is an @Id property`
									: `'${dbRelation.property.entity.name}' has no @Id - all properties are treated as @Ids`
								throw new Error(`Defaults are not allowed in:
								...
								{
									...
									${propertyNameLink}: ${propertyObject}
								}
								${reason}.`)
							}
							convertTo = false
						}
					}
					propertySelectClause = propertyObject
				})
				if (convertTo) {
					convertToY(propertySelectClause)
				}
			})
	}

	forEachColumnOfRelation(
		dbRelation: DbRelation,
		entity: any,
		callback: {
			(
				dbColumn: DbColumn,
				value: any,
				propertyNameChains: string[][],
			): void | boolean
		},
		failOnNoValue: boolean = true
	): void {
		const dbEntity = dbRelation.property.entity
		for (const dbRelationColumn of dbRelation.manyRelationColumns) {
			const dbColumn = dbRelationColumn.manyColumn
			const [propertyNameChains, value] = this.getColumnPropertyNameChainsAndValue(dbEntity, dbColumn, entity)
			if (callback(dbColumn, value, propertyNameChains)) {
				return
			}
		}
	}

	forEachColumnTypeOfRelation(
		dbRelation: DbRelation,
		callback: {
			(
				dbColumn: DbColumn,
				propertyNameChains: string[][],
			): void | boolean
		}
	): void {
		for (const dbRelationColumn of dbRelation.manyRelationColumns) {
			const dbColumn = dbRelationColumn.manyColumn
			const propertyNameChains = this.getColumnPaths(dbColumn, [])
			if (callback(dbColumn, propertyNameChains)) {
				return
			}
		}
	}

	private getColumnValuesAndPaths(
		dbColumn: DbColumn,
		relationObject: any,
		breadCrumb: string[],
		forIdKey: boolean = false,
		generateNegativeIdsForMissing: boolean = true
		// noIdValueCallback: {
		// 	(
		// 		relationColumn: DbColumn,
		// 		value: any,
		// 		propertyNameChains: string[][],
		// 	): void;
		// }
	): ColumnValueForPath[] {
		if (this.isManyRelationColumn(dbColumn)) {
			let columnValuesAndPaths = []
			// If a column is part of a relation, it would be on the Many Side
			for (const dbRelationColumn of dbColumn.manyRelationColumns) {
				const dbProperty = dbRelationColumn.manyRelation.property
				const relationBreadCrumb = [...breadCrumb]
				const propertyName = dbProperty.name
				relationBreadCrumb.push(propertyName)
				const value = relationObject[propertyName]
				if (!value) {
					if (forIdKey
						// && this.handleNoId(dbColumn, dbProperty, relationBreadCrumb, value,
						// noIdValueCallback)
					) {
						throw new Error(`Cannot retrieve composite Id value, value chain '${relationBreadCrumb.join('.')}' is : ${value}.`)
						// return null;
					}
					columnValuesAndPaths.push({
						path: relationBreadCrumb,
						value
					})
				} else {
					const otherEntityColumn = dbRelationColumn.oneColumn
					const relationValuesAndPaths = this.getColumnValuesAndPaths(otherEntityColumn, value, relationBreadCrumb, forIdKey)
					columnValuesAndPaths = columnValuesAndPaths.concat(relationValuesAndPaths)
				}
			}
			return columnValuesAndPaths
		} else {
			// If a column is not a part of (a) relation(s) then it is associated
			// to only one property
			const dbProperty = dbColumn.propertyColumns[0].property
			const propertyBreadCrumb = [...breadCrumb]
			const propertyName = dbProperty.name
			propertyBreadCrumb.push(propertyName)
			let value = relationObject[propertyName]
			if (forIdKey && this.isIdEmpty(value)) {
				if (dbColumn.isGenerated) {
					if (generateNegativeIdsForMissing) {
						value = --ApplicationUtils.TEMP_ID
					} else {
						value = null
					}
					relationObject[propertyName] = value
				} else {
					// if (this.handleNoId(dbColumn, dbProperty, propertyBreadCrumb, value,
					// noValueCallback)) { return null; }
					throw new Error(`Cannot retrieve composite Id value, value chain '${propertyBreadCrumb.join('.')}' is : ${value}.`)
				}
			}
			return [{
				path: propertyBreadCrumb,
				value
			}]
		}
	}

	getColumnPaths(
		dbColumn: DbColumn,
		breadCrumb: string[],
	): string[][] {
		let columnValuesAndPaths = []

		if (this.isManyRelationColumn(dbColumn)) {
			// If a column is part of a relation, it would be on the Many Side
			for (const dbRelationColumn of dbColumn.manyRelationColumns) {
				const dbProperty = dbRelationColumn.manyRelation.property
				const relationBreadCrumb = [...breadCrumb]
				relationBreadCrumb.push(dbProperty.name)
				const otherEntityColumn = dbRelationColumn.oneColumn
				const relationValuesAndPaths = this.getColumnPaths(otherEntityColumn, relationBreadCrumb)
				columnValuesAndPaths = columnValuesAndPaths.concat(relationValuesAndPaths)
			}
		} else {
			// If a column is not a part of (a) relation(s) then it is associated
			// to only one property
			const dbProperty = dbColumn.propertyColumns[0].property
			const propertyBreadCrumb = [...breadCrumb]
			propertyBreadCrumb.push(dbProperty.name)
			columnValuesAndPaths.push(propertyBreadCrumb)
		}

		return columnValuesAndPaths
	}

	private handleNoId(
		dbColumn: DbColumn,
		dbProperty: DbProperty,
		propertyNameChains: string[][],
		value,
		noIdValueCallback: {
			(
				relationColumn: DbColumn,
				value: any,
				propertyNameChains: string[][],
			): boolean;
		},
	): boolean {
		if (noIdValueCallback) {
			if (!noIdValueCallback(dbColumn, value, propertyNameChains)) {
				return true
			}
		} else {
			throw new Error(`Cannot retrieve composite Id value, value chain '${propertyNameChains.join('.')}' is : ${value}.`)
		}
		return false
	}

}
