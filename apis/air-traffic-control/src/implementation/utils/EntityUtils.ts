import { Inject, Injected } from '@airport/direction-indicator'
import { Dictionary } from '@airport/ground-control'
import { EntityQuery, ENTITY_UTILS, IEntityAliases, IEntityRelationFrom, IEntitySelectProperties, IEntityUtils, IFrom, IQEntity, IQEntityDriver, IQEntityInternal, IQTree, IReadQuery, ITreeEntity, QEntity, QField, QOperableField, QTree, QTreeDriver, RawEntityQuery, RawReadQuery, RawTreeQuery, TreeQuery, Y } from '@airport/tarmaq-query'
import { IUtils } from '../../definition/utils/IUtils'

/**
 * Created by Papa on 6/14/2016.
 */
@Injected()
export class EntityUtils
	implements IEntityUtils {

	@Inject()
	dictionary: Dictionary

	@Inject()
	utils: IUtils

	getObjectClassName(object: any): string {
		if (typeof object != 'object' || object === null) {
			throw new Error(`Not an object instance`)
		}
		return this.getClassName(object.constructor)
	}

	getClassName(clazz: Function): string {
		if (typeof clazz != 'function') {
			throw new Error(`Not a constructor function`)
		}

		let className = clazz['name']
		// let className = /(\w+)\(/.exec(clazz.toString())[1];

		return className
	}

	exists(object: any) {
		return this.utils.objectExists(object)
	}

	/*
	 static isBlank(
	 object: any
	 ) {
	 for (let propertyName in object) {
	 let property = object[propertyName];
	 if (this.exists(property)) {
	 if (property instanceof Array) {
	 if (property.length > 0) {
	 return false;
	 }
	 } else {
	 return false;
	 }
	 }
	 }
	 return true;
	 }
	 */

	isAppliable(object: any): boolean {
		return object instanceof QOperableField
	}

	getQuery<Q>(
		query: Q | { (...args: any[]): Q }
	): Q {
		return <Q><any>this.getRawQuery(<any>query)
	}
	ensureId<EntitySelect extends IEntitySelectProperties>(
		rawEntityQuery: RawEntityQuery<EntitySelect>
			| { (...args: any[]): RawEntityQuery<EntitySelect> }
	): RawEntityQuery<EntitySelect> {
		let theRawEntityQuery = this.getRawQuery(rawEntityQuery) as RawEntityQuery<EntitySelect>

		this.ensureIdAtLevel(
			theRawEntityQuery.SELECT, theRawEntityQuery.FROM[0] as IQEntityInternal)

		return theRawEntityQuery
	}

	private ensureIdAtLevel<EntitySelect extends IEntitySelectProperties>(
		selectClauseFragment: any,
		qEntity: IQEntityInternal
	): void {
		for (const propertyName in selectClauseFragment) {
			const subFragment = selectClauseFragment[propertyName]
			if (subFragment instanceof Object
				&& typeof subFragment.airportSelectField !== 'boolean'
				&& !subFragment.__allFields__) {

				let matchingQEntity
				for (const childQEntity of qEntity.__driver__.childQEntities) {
					if (childQEntity.__driver__.dbRelation.property.name === propertyName) {
						matchingQEntity = childQEntity
						break
					}
				}
				if (matchingQEntity && matchingQEntity.__driver__.dbEntity.isAirEntity) {
					this.ensureIdAtLevel(subFragment, matchingQEntity)
				}
			}
		}
		if (!qEntity.__driver__.dbEntity.isAirEntity || !selectClauseFragment.id) {
			return
		}
		let repository = selectClauseFragment.repository
		if (repository) {
			if (!(repository instanceof Object)) {
				throw new Error(`id queries must include a repository object in the SELECT clause.
It must be an Object with the id property.`)
			}
			repository.GUID = Y

		}
		let actor = selectClauseFragment.actor
		if (actor) {
			if (!(actor instanceof Object)) {
				throw new Error(`id queries must include an actor object in the SELECT clause.
It must be an Object with the id property.`)
			}
			actor.GUID = Y

		}
		selectClauseFragment._actorRecordId = Y
		this.ensureRepositoryAndActorJoin(qEntity)
	}

	ensureRepositoryAndActorJoin(
		qEntity: IQEntityInternal
	): {
		qActor,
		qRepository
	} {
		let qActor, qRepository
		let repositoryJoinFound = false
		let actorJoinFound = false
		for (const childQEntity of qEntity.__driver__.childQEntities) {
			const relationEntity = childQEntity.__driver__.dbRelation.relationEntity
			if (this.dictionary.isActor(relationEntity)) {
				actorJoinFound = true
				qActor = childQEntity
			} else if (this.dictionary.isRepository(relationEntity)) {
				repositoryJoinFound = true
				qRepository = childQEntity
			}
		}

		if (!actorJoinFound) {
			qActor = (qEntity as any).actor.LEFT_JOIN()
		}
		if (!repositoryJoinFound) {
			qRepository = (qEntity as any).repository.LEFT_JOIN()
		}

		return {
			qActor,
			qRepository
		}
	}

	ensureAllQEntitiesInFromClause(
		rawQuery: RawReadQuery
	): void {
		const allQEntities: Set<IQEntity> = new Set()
		for (let fromEntry of rawQuery.FROM) {
			let qEntity = fromEntry as IQEntityInternal
			allQEntities.add(qEntity)
		}
		for (let fromEntry of rawQuery.FROM) {
			this.doEnsureAllQEntitiesInFromClause(
				fromEntry as IQEntityInternal, rawQuery.FROM, allQEntities
			)
		}
	}

	doEnsureAllQEntitiesInFromClause(
		parentQEntity: IQEntityInternal,
		fromClause: (IFrom | IEntityRelationFrom)[],
		allQEntities: Set<IQEntity>
	): void {
		if (!parentQEntity.__driver__) {
			return
		}
		if (!allQEntities.has(parentQEntity)) {
			allQEntities.add(parentQEntity)
			fromClause.push(parentQEntity)
		}
		if (!parentQEntity.__driver__.childQEntities) {
			return
		}
		for (const childQEntity of parentQEntity.__driver__.childQEntities) {
			this.doEnsureAllQEntitiesInFromClause(
				childQEntity, fromClause, allQEntities
			)
		}
	}

	// Removes circular dependency at code initialization time
	getRawQuery(
		rawQuery: RawReadQuery | { (...args: any[]): RawReadQuery }
	): RawReadQuery {
		if (rawQuery instanceof Function) {
			return rawQuery()
		} else {
			return rawQuery
		}
	}

	// Removes circular dependency at code initialization time
	getEntityQuery(
		rawGraphQuery: RawEntityQuery<any> | { (...args: any[]): RawEntityQuery<any> }
	): EntityQuery<any> {
		return new EntityQuery(this.getRawQuery(rawGraphQuery))
	}

	// Removes circular dependency at code initialization time
	getTreeQuery<ITE extends ITreeEntity>(
		rawQuery: RawTreeQuery<ITE>,
		entityAliases: IEntityAliases
	): IReadQuery {
		return new TreeQuery(rawQuery, entityAliases)
	}

	// Removes circular dependency at code initialization time
	isQEntity<IF extends IFrom>(
		qEntity: IF | IEntityRelationFrom | RawTreeQuery<any>
	): boolean {
		return qEntity instanceof QEntity
	}

	// Removes circular dependency at code initialization time
	isQTree<IF extends IFrom>(
		qEntity: IQEntityDriver | IF | IEntityRelationFrom | RawTreeQuery<any>
	): boolean {
		return qEntity instanceof QTreeDriver
	}

	// Removes circular dependency at code initialization time
	getQTree(
		fromClausePosition: number[],
		subQuery: RawTreeQuery<any>
	): IQTree {
		return new QTree(fromClausePosition, subQuery)
	}

	// Removes circular dependency at code initialization time
	isQField(
		qEntity: IQEntity
	): boolean {
		return qEntity instanceof QField
	}

}
ENTITY_UTILS.setClass(EntityUtils)
