import { AirEntityId } from '@airport/aviation-communication'
import { IDependencyInjectionToken, InversionOfControl } from '@airport/direction-indicator'
import {
	DbEntity,
	DbRelation,
	IAirEntity,
	JoinType,
} from '@airport/ground-control'
import {
	IEntityCascadeGraph,
	IEntityCreateProperties,
	IEntityIdProperties,
	IEntitySelectProperties,
	IEntityUpdateColumns,
	IEntityUpdateProperties,
	IFrom,
	IQAirEntity,
	IQEntity,
} from '../../../definition/core/entity/IQEntity'
import { IJoinFields } from '../../../definition/core/entity/IJoins'
import { QueryLogicalOperation } from '../../../definition/core/operation/ILogicalOperation'
import { IQueryUtils } from '../../../definition/utils/IQueryUtils'
import { IEntityQueryDatabaseFacade } from '../../../definition/core/IEntityQueryDatabaseFacade'
import { IQueryRelationManager } from '../../../definition/core/entity/IQueryRelationManager'
import { IQEntityDriver, IQEntityInternal } from '../../../definition/core/entity/IQEntityDriver'

/**
 * Created by Papa on 4/21/2016.
 */

export interface IQEntityInternalConstructor {

	entityConstructor: { new(...args: any[]): any };
	applicationHash: string;
	entityIndex: number;

	new <IQE extends IQEntityInternal>(...args: any[]): IQE;

}

export declare namespace QEntity {

	function db<IEntity>(
		databaseName?: string
	): IEntityQueryDatabaseFacade<IEntity, IEntitySelectProperties,
		IEntityCreateProperties, IEntityUpdateProperties,
		IEntityUpdateColumns, IEntityIdProperties,
		IEntityCascadeGraph, IQEntity>;

}

export interface QEntityConstructor<IQE extends IQEntity> {

	new(
		dbEntity: DbEntity,
		queryUtils: IQueryUtils,
		queryRelationManager: IQueryRelationManager,
		fromClausePosition?: number[],
		dbRelation?: DbRelation,
		joinType?: JoinType,
		QDriver?: { new(...args: any[]): IQEntityDriver<IQE> },
	): IQE;

}


export function QEntity<IEntity, IQE extends IQEntity>(
	dbEntity: DbEntity,
	queryUtils: IQueryUtils,
	queryRelationManager: IQueryRelationManager,
	fromClausePosition: number[] = [],
	dbRelation = null,
	joinType: JoinType = null,
	QDriver: { new(...args: any[]): IQEntityDriver<IQE> } = globalThis.QEntityDriver
) {
	this.__driver__ = new QDriver(dbEntity, queryUtils, queryRelationManager,
		fromClausePosition, dbRelation, joinType, this)
}

QEntity.prototype.FULL_JOIN = function <IF extends IFrom, IQE extends IQEntity>(right: IF): IJoinFields<IF, IQE> {
	return this.__driver__.join(right, JoinType.FULL_JOIN)
}

QEntity.prototype.INNER_JOIN = function <IF extends IFrom, IQE extends IQEntity>(right: IF): IJoinFields<IF, IQE> {
	return this.__driver__.join(right, JoinType.INNER_JOIN)
}

QEntity.prototype.LEFT_JOIN = function <IF extends IFrom, IQE extends IQEntity>(right: IF): IJoinFields<IF, IQE> {
	return this.__driver__.join(right, JoinType.LEFT_JOIN)
}

QEntity.prototype.RIGHT_JOIN = function <IF extends IFrom, IQE extends IQEntity>(right: IF): IJoinFields<IF, IQE> {
	return this.__driver__.join(right, JoinType.RIGHT_JOIN)
}

QEntity.prototype.equals = function <Entity extends IAirEntity, IQ extends IQEntityInternal>(
	entity: Entity
		| IQAirEntity
		| AirEntityId | string
): QueryLogicalOperation {
	return (globalThis.IOC as InversionOfControl)
		.getSync(globalThis.QUERY_UTILS as IDependencyInjectionToken<IQueryUtils>)
		.equals(entity, this)
}

QEntity.prototype.in = function <Entity extends IAirEntity, IQ extends IQEntityInternal>(
	entities: (Entity
		| AirEntityId | string)[]
): QueryLogicalOperation {
	return (globalThis.IOC as InversionOfControl)
		.getSync(globalThis.QUERY_UTILS as IDependencyInjectionToken<IQueryUtils>)
		.in(entities, this)
}
