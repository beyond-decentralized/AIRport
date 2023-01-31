import { IEntityAliases } from "../core/entity/IAliases";
import {
	IEntityRelationFrom, IEntitySelectProperties, IFrom, IQEntity,
	IQTree
} from "../core/entity/IQEntity";
import { IQEntityDriver, IQEntityInternal } from "../core/entity/IQEntityDriver";
import { IAbstractQuery } from "../query/facade/IAbstractQuery";
import { RawEntityQuery } from "../query/facade/RawEntityQuery";
import { IReadQuery, RawReadQuery } from "../query/facade/RawReadQuery";
import { ITreeEntity, RawTreeQuery } from "../query/facade/RawTreeQuery";

export interface IEntityUtils {

	getObjectClassName(object: any): string;

	getClassName(clazz: Function): string;

	exists(object: any);

	isAppliable(object: any): boolean;

	getQuery<Q>(
		query: Q | { (...args: any[]): Q }
	): Q;

	ensureAllQEntitiesInFromClause(
		rawQuery: RawReadQuery
	): void

	ensureId<EntitySelect extends IEntitySelectProperties>(
		rawEntityQuery: RawEntityQuery<EntitySelect>
			| { (...args: any[]): RawEntityQuery<EntitySelect> }
	): RawEntityQuery<EntitySelect>

	ensureRepositoryAndActorJoin(
		qEntity: IQEntityInternal
	): {
		qActor,
		qRepository
	}

	getRawQuery(
		rawQuery: RawReadQuery | { (...args: any[]): RawReadQuery }
	): RawReadQuery;

	// Removes circular dependency at code initialization time
	getEntityQuery(
		rawGraphQuery: RawEntityQuery<any> | { (...args: any[]): RawEntityQuery<any> }
	): IAbstractQuery;

	// Removes circular dependency at code initialization time
	getTreeQuery<ITE extends ITreeEntity>(
		rawQuery: RawTreeQuery<ITE>,
		entityAliases: IEntityAliases
	): IReadQuery

	// Removes circular dependency at code initialization time
	isQEntity<IF extends IFrom>(
		qEntity: IF | IEntityRelationFrom | RawTreeQuery<any>
	): boolean

	// Removes circular dependency at code initialization time
	isQTree<IF extends IFrom>(
		qEntity: IQEntityDriver | IF | IEntityRelationFrom | RawTreeQuery<any>
	): boolean

	// Removes circular dependency at code initialization time
	getQTree(
		fromClausePosition: number[],
		subQuery: RawTreeQuery<any>
	): IQTree

	// Removes circular dependency at code initialization time
	isQField(
		qEntity: IQEntity
	): boolean

}