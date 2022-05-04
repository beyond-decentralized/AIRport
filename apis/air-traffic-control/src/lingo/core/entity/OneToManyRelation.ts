import { IQEntity } from './Entity';
import { IQRelation, IQRepositoryEntityRelation } from './Relation';

/**
 * A concrete One-To-Many relation.
 */
export interface IQOneToManyRelation<IQ extends IQEntity>
	extends IQRelation<IQ> {
}

/**
 * A concrete One-To-Many relation on a RepositoryEntity.
 */
export interface IQRepositoryEntityOneToManyRelation<Entity, IQ extends IQEntity>
	extends IQRepositoryEntityRelation<Entity, IQ> {
}
