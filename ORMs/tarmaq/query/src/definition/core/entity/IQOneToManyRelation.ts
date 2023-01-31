import { IQEntity } from './IQEntity';
import { IQRelation, IQAirEntityRelation } from './IQRelation';

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
