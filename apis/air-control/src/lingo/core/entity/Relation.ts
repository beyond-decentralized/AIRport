import {DbRelation} from "@airport/ground-control";
import {
	IQEntity,
	IQEntityInternal
}                   from './Entity';

/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelation<Entity, IQ extends IQEntity<Entity>> {
	// Inner join on this Many-To-One or One-To-Many relation
	innerJoin(): IQ;

	// Left join on this Many-To-One or One-To-Many relation
	leftJoin(): IQ;

	/*
	update a
	set b = 1
	where a.cId =
	 */
}

export interface IQInternalRelation<Entity, IQ extends IQEntity<Entity>>
	extends IQRelation<Entity, IQ> {

	dbRelation: DbRelation;
	parentQ: IQEntityInternal<any>;

}

