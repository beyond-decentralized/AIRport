import { IEntityAliases } from "../core/entity/Aliases";
import { IEntityRelationFrom, IEntitySelectProperties, IFrom, IQEntity,
IQEntityInternal, IQEntityDriver, IQTree } from "../core/entity/Entity";
import { IAbstractQuery } from "../query/facade/AbstractQuery";
import { RawEntityQuery } from "../query/facade/EntityQuery";
import { IQuery, RawQuery } from "../query/facade/Query";
import { ITreeEntity, RawTreeQuery } from "../query/facade/TreeQuery";

export interface IEntityUtils {

	getObjectClassName(object: any): string;

	getClassName(clazz: Function): string;

	exists(object: any);

	isAppliable(object: any): boolean;
	getQuery<Q>(
		query: Q | { (...args: any[]): Q }
	): Q;

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
		rawQuery: RawQuery | { (...args: any[]): RawQuery }
	): RawQuery;

	// Removes circular dependency at code initialization time
	getEntityQuery(
		rawGraphQuery: RawEntityQuery<any> | { (...args: any[]): RawEntityQuery<any> }
	): IAbstractQuery;

	// Removes circular dependency at code initialization time
	getTreeQuery<ITE extends ITreeEntity>(
		rawQuery: RawTreeQuery<ITE>,
		entityAliases: IEntityAliases
	): IQuery

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