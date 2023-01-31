import { IEntityRelationFrom } from '../../core/entity/IQEntity';
import { RawReadLimitedQuery, RawReadQuery } from './RawReadQuery';

/**
 * Entity queries are defined in this format.
 */
export interface RawEntityQuery<EntitySelect>
	extends RawReadQuery {
	FROM?: IEntityRelationFrom[];
	SELECT: EntitySelect;
}

/**
 * Entity queries with LIMIT and OFFSET clauses are serialized in this format
 */
export interface RawLimitedEntityQuery<EntitySelect>
	extends RawEntityQuery<EntitySelect>, RawReadLimitedQuery {
}