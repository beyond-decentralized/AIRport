import { IQEntity } from './Entity';
import { IQRelation } from './Relation';

/**
 * A concrete One-To-Many relation.
 */
export interface IQOneToManyRelation<IQ extends IQEntity<any>>
	extends IQRelation<IQ> {
}