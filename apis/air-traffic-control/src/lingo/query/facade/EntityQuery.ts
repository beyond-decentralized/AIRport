import { IEntitySelectProperties, IEntityRelationFrom } from '../../core/entity/Entity';
import { RawLimitedQuery, RawQuery } from './Query';

/**
 * Entity queries are user-defined in this format.
 */
export interface RawEntityQuery<EntitySelect>
	extends RawQuery {
	from?: IEntityRelationFrom[];
	select: EntitySelect;
}

/**
 * Entity queries with LIMIT and OFFSET clauses are serialized in this format
 */
export interface RawLimitedEntityQuery<EntitySelect>
	extends RawEntityQuery<EntitySelect>, RawLimitedQuery {
}