import {
	IDatabaseFacade,
	IUtils,
	UpdateCacheType,
	Utils,
	UtilsToken
} from "@airport/air-control";
import {
	DbColumn,
	DbEntity,
	EntityRelationType,
	SQLDataType
}                         from "@airport/ground-control";
import {
	Inject,
	Service
}                         from "typedi";
import {UpdateCacheToken} from "../../InjectionTokens";

/**
 * Created by Papa on 9/8/2016.
 */
export interface EntityUpdateCache {
	[id: string]: any;
}

export interface IUpdateCache {

	dropCache(): void;

	addToCache(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void;

	dropFromCache(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void;

	getOriginalRecord(
		dbEntity: DbEntity,
		idKey: string,
	): any;

	getEntityUpdateCache(
		dbEntity: DbEntity,
		entity: any
	): any;

	getEntityUpdateDiff(
		dbEntity: DbEntity,
		entity: any,
		failOnNoOriginalRecord?: boolean,
	): any;

}

@Service(UpdateCacheToken)
export class UpdateCache
	implements IUpdateCache {

	private updateCache: EntityUpdateCache[][] = [];
	private saveRun = 0;

	constructor(
		@Inject(UtilsToken)
		private utils: IUtils,
	) {
	}

	dropCache(): void {
		this.updateCache = [];
	}

	addToCache(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void {
		this.saveRun++;
		this.saveToUpdateCacheInternal(cacheForUpdate, dbEntity, ...entities);
	}

	dropFromCache(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void {
		const entityCache = this.getEntityCache(dbEntity);
		for (const entity of entities) {
			const id = this.utils.Schema.getIdKey(entity, dbEntity);
			delete entityCache[id];

			for (const dbProperty of dbEntity.properties) {
				let value = entity[dbProperty.name];
				if (this.utils.Schema.isEmpty(value)) {
					continue;
				}
				if (!dbProperty.relation) {
					continue;
				}
				const relation = dbProperty.relation[0];
				switch (relation.relationType) {
					case EntityRelationType.ONE_TO_MANY:
						if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
							continue;
						}
						if (!(value instanceof Array)) {
							throw `Expecting @OneToMany for an array entity relation`;
						}
						value.forEach((manyObject) => {
							this.dropFromCache(cacheForUpdate, relation.relationEntity, manyObject);
						});
						break;
					case EntityRelationType.MANY_TO_ONE:
						if (!(value instanceof Object) || value instanceof Array) {
							throw `Expecting @ManyToOne for a non-array entity relation`;
						}
						if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
							continue;
						}
						this.dropFromCache(cacheForUpdate, relation.relationEntity, value);
						break;
					default:
						throw `Unknown relation type: ${relation.relationType}`;
				}
			}
		}
	}

	getEntityUpdateCache(
		dbEntity: DbEntity,
		entity: any
	): any {
		let entityCache = this.getEntityCache(dbEntity);

		let compositeId = this.utils.Schema.getIdKey(entity, dbEntity, false);

		if (!compositeId) {
			return null;
		}

		return entityCache[compositeId];
	}

	getOriginalRecord(
		dbEntity: DbEntity,
		idKey: string,
	): any {
		const entityCache = this.getEntityCache(dbEntity);

		return entityCache[idKey];
	}

	getEntityUpdateDiff(
		dbEntity: DbEntity,
		entity: any,
		failOnNoOriginalRecord = true,
	): any {
		let updateDiff = {};
		let originalRecord = this.getEntityUpdateCache(dbEntity, entity);
		let currentRecord = this.getEntityCacheEntry(UpdateCacheType.ROOT_QUERY_ENTITIES, dbEntity, entity, {});

		if (!originalRecord) {
			return entity;
		}

		for (let columnName in originalRecord) {
			let originalValue = originalRecord[columnName];
			let newValue = currentRecord[columnName];
			if (!this.utils.valuesEqual(originalValue, newValue)) {
				updateDiff[columnName] = newValue;
			}
		}

		for (let columnName in currentRecord) {
			if (updateDiff[columnName]) {
				continue;
			}
			updateDiff[columnName] = entity[columnName];
		}

		return updateDiff;
	}

	private getEntityCache(
		dbEntity: DbEntity
	): EntityUpdateCache {
		let schemaCache = this.utils.ensureChildArray(
			this.updateCache, dbEntity.schemaVersion.schema.index);

		return this.utils.ensureChildMap(schemaCache, dbEntity.index);
	}

	private saveToUpdateCacheInternal(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		...entities: any[]
	): void {
		for (const entity of entities) {
			const compositeIdValue = this.utils.Schema.getIdKey(entity, dbEntity);
			// If no id is provided for an entity, it cannot be cached
			if (!compositeIdValue) {
				throw `Cannot cache entities with no ids`;
			}
			let entityCache = this.getEntityCache(dbEntity);
			let entityCopy = entityCache[compositeIdValue];
			if (entityCopy) {
				if (entityCopy.__saveRun__ === this.saveRun) {
					return entityCopy;
				}
				entityCopy.__saveRun__ = this.saveRun;
			} else {
				entityCopy = {
					__saveRun__: this.saveRun
				};
			}
			entityCache[compositeIdValue] = entityCopy;

			this.getEntityCacheEntry(cacheForUpdate, dbEntity, entity, entityCopy);
		}
	}

	private getEntityCacheEntry(
		cacheForUpdate: UpdateCacheType,
		dbEntity: DbEntity,
		entity: any,
		entityCopy: any
	): any {
		for (const dbProperty of dbEntity.properties) {
			let value = entity[dbProperty.name];
			if (this.utils.Schema.isEmpty(value)) {
				continue;
			}
			if (dbProperty.relation) {
				const dbRelation = dbProperty.relation[0];
				switch (dbRelation.relationType) {
					case EntityRelationType.ONE_TO_MANY:
						if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
							continue;
						}
						if (!(value instanceof Array)) {
							throw `Expecting @OneToMany for an array entity relation`;
						}
						value.forEach((manyObject) => {
							this.saveToUpdateCacheInternal(cacheForUpdate, dbRelation.relationEntity, manyObject);
						});
						break;
					case EntityRelationType.MANY_TO_ONE:
						if (!(value instanceof Object) || value instanceof Array) {
							throw `Expecting @ManyToOne for a non-array entity relation`;
						}
						this.utils.Schema.forEachColumnOfRelation(
							dbRelation,
							entity,
							(
								dbColumn: DbColumn,
								value: any,
								propertyNameChains: string[][]
							) => {
								this.copyColumn(dbColumn, entityCopy, value);
							}, false);
						if (cacheForUpdate !== UpdateCacheType.ALL_QUERY_ENTITIES) {
							continue;
						}
						this.saveToUpdateCacheInternal(cacheForUpdate, dbRelation.relationEntity, value);
						break;
					default:
						throw `Unknown relation type: ${dbRelation.relationType}`;
				}
			} else {
				const dbColumn = dbProperty.propertyColumns[0].column;
				this.copyColumn(dbColumn, entityCopy, value);
			}
		}

		return entityCopy;
	}

	private copyColumn(
		dbColumn: DbColumn,
		entityCopy,
		value,
	) {
		const columnName = dbColumn.name;
		const copiedValue = entityCopy[columnName];
		if (!this.utils.Schema.isEmpty(copiedValue)
			&& this.utils.valuesEqual(copiedValue, value)) {
			throw `Values do not match for column '${dbColumn.propertyColumns[0].property.entity.name}.${dbColumn.name}'`;
		}
		switch (dbColumn.type) {
			case SQLDataType.BOOLEAN:
			case SQLDataType.NUMBER:
			case SQLDataType.ANY:
				entityCopy[columnName] = value;
				break;
			case SQLDataType.STRING:
			case SQLDataType.JSON:
				entityCopy[columnName] = value.slice(0);
				break;
			case SQLDataType.DATE:
				entityCopy[columnName] = new Date(value.getTime());
				break;
			default:
				throw `Unknown SQLDataType: ${dbColumn.type}`;
		}
	}

	private getUpdateCache(
		dbEntity: DbEntity,
		id: string
	): any {
		const entityCache = this.getEntityCache(dbEntity);
		if (this.utils.Schema.isIdEmpty(id)) {
			return null;
		}

		return entityCache[id];
	}

}