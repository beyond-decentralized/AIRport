import { IQEntity } from './Entity';
import { IQRelation, IQAirEntityRelation } from './Relation';

/**
 * A concrete One-To-Many relation.
 */
export interface IQOneToManyRelation<IQ extends IQEntity>
	extends IQRelation<IQ> {
}

/**
 * A concrete One-To-Many relation on a AirEntity.
 */
export interface IQAirEntityOneToManyRelation<Entity, IQ extends IQEntity>
	extends IQAirEntityRelation<Entity, IQ> {
}
