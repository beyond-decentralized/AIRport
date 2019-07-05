import {
	ISchemaUtils,
	IUpdateCache,
	UPDATE_CACHE,
	UpdateCacheType,
	valuesEqual
}           from '@airport/air-control'
import {DI} from '@airport/di'
import {
	DbColumn,
	DbEntity,
	EntityRelationType,
	SQLDataType
}           from '@airport/ground-control'

/**
 * Created by Papa on 9/8/2016.
 */
export interface EntityUpdateCache {
	[id: string]: any;
}

export class UpdateCache
	implements IUpdateCache {

	// private updateCache: EntityUpdateCache[][] = []
	// private saveRun                            = 0

	// dropCache(): void {
	// 	this.updateCache = []
	// }

	/**
	 * Start Context for an UpdateProperties Operation.  All entity update operations must
	 * be performed on cached entities.
	 *
	 * This starts recording all queries and allows the update to diff recorded
	 * query results with the updated object to get the actual changed fields.
	 *
	 * @param {Entity} entities
	 */
	addToCache(
		schemaUtils: ISchemaUtils,
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void {
		if (!entities || !entities.length
			|| cacheForUpdate === UpdateCacheType.NONE) {
			return
		}
		this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate,
			dbEntity, ...entities)
	}

	getEntityUpdateCache(
		entity: any
	): any {
		return entity.__updateCache__
	}

	getEntityUpdateDiff(
		schemaUtils: ISchemaUtils,
		dbEntity: DbEntity,
		entity: any,
		failOnNoOriginalRecord = true,
	): any {
		let updateDiff     = {}
		let originalRecord = this.getEntityUpdateCache(entity)
		let currentRecord  = this.getEntityCacheEntry(
			schemaUtils, UpdateCacheType.ROOT_QUERY_ENTITIES,
			dbEntity, entity, {})

		if (!originalRecord) {
			return entity
		}

		for (let columnName in originalRecord) {
			let originalValue = originalRecord[columnName]
			let newValue      = currentRecord[columnName]
			if (!valuesEqual(originalValue, newValue)) {
				updateDiff[columnName] = newValue
			}
		}

		for (let columnName in currentRecord) {
			if (updateDiff[columnName]) {
				continue
			}
			updateDiff[columnName] = entity[columnName]
		}

		return updateDiff
	}

	private saveToUpdateCacheInternal(
		schemaUtils: ISchemaUtils,
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void {
		for (const entity of entities) {
			entity.__updateCache__ = {}
			this.getEntityCacheEntry(schemaUtils, cacheForUpdate, dbEntity,
				entity, entity.__updateCache__)
		}
	}

	private getEntityCacheEntry(
		schemaUtils: ISchemaUtils,
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		entity: any,
		entityCopy: any
	): any {
		for (const dbProperty of dbEntity.properties) {
			let value = entity[dbProperty.name]
			if (schemaUtils.isEmpty(value)) {
				continue
			}
			if (dbProperty.relation) {
				const dbRelation = dbProperty.relation[0]
				switch (dbRelation.relationType) {
					case EntityRelationType.ONE_TO_MANY:
						if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
							continue
						}
						if (!(value instanceof Array)) {
							throw new Error(
								`Expecting @OneToMany for an array entity relation`)
						}
						value.forEach((manyObject) => {
							this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate,
								dbRelation.relationEntity, manyObject)
						})
						break
					case EntityRelationType.MANY_TO_ONE:
						if (!(value instanceof Object) || value instanceof Array) {
							throw new Error(
								`Expecting @ManyToOne for a non-array entity relation`)
						}
						schemaUtils.forEachColumnOfRelation(
							dbRelation,
							entity,
							(
								dbColumn: DbColumn,
								value: any,
								propertyNameChains: string[][]
							) => {
								this.copyColumn(schemaUtils, dbColumn, entityCopy, value)
							}, false)
						if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
							continue
						}
						this.saveToUpdateCacheInternal(schemaUtils, cacheForUpdate,
							dbRelation.relationEntity, value)
						break
					default:
						throw new Error(
							`Unknown relation type: ${dbRelation.relationType}`)
				}
			} else {
				const dbColumn = dbProperty.propertyColumns[0].column
				this.copyColumn(schemaUtils, dbColumn, entityCopy, value)
			}
		}

		return entityCopy
	}

	private copyColumn(
		schemaUtils: ISchemaUtils,
		dbColumn: DbColumn,
		entityCopy,
		value,
	) {
		const columnName  = dbColumn.name
		const copiedValue = entityCopy[columnName]
		// if (!schemaUtils.isEmpty(copiedValue)
		// 	&& valuesEqual(copiedValue, value)) {
		// 	throw new Error(`Values do not match for column
		// '${dbColumn.propertyColumns[0].property.entity.name}.${dbColumn.name}'`) }
		switch (dbColumn.type) {
			case SQLDataType.BOOLEAN:
			case SQLDataType.NUMBER:
			case SQLDataType.ANY:
				entityCopy[columnName] = value
				break
			case SQLDataType.STRING:
			case SQLDataType.JSON:
				entityCopy[columnName] = value.slice(0)
				break
			case SQLDataType.DATE:
				entityCopy[columnName] = new Date(value.getTime())
				break
			default:
				throw new Error(`Unknown SQLDataType: ${dbColumn.type}`)
		}
	}

	/*
		private getUpdateCache(
			schemaUtils: ISchemaUtils,
			dbEntity: DbEntity,
			id: string
		): any {
			const entityCache = this.getEntityCache(dbEntity)
			if (schemaUtils.isIdEmpty(id)) {
				return null
			}

			return entityCache[id]
		}
	*/

}

DI.set(UPDATE_CACHE, UpdateCache)
