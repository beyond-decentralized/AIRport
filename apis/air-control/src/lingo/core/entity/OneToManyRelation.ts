import { IQEntity } from './Entity';
import { IQRelation, IQRepositoryEntityRelation } from './Relation';

/**
 * A concrete One-To-Many relation.
 */
export interface IQOneToManyRelation<Entity, IQ extends IQEntity<Entity>>
	extends IQRelation<Entity, IQ> {
}

/**
 * A concrete One-To-Many relation on a RepositoryEntity.
 */
export interface IQRepositoryEntityOneToManyRelation<Entity, IQ extends IQEntity<Entity>>
	extends IQRepositoryEntityRelation<Entity, IQ> {
}
