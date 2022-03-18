import { DbRelation } from "@airport/ground-control";
import { DeepPartial } from "../../DeepPartial";
import { JSONLogicalOperation } from "../operation/LogicalOperation";
import { IQEntity, IQEntityInternal } from './Entity';
/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelation<Entity, IQ extends IQEntity<Entity>> {
    innerJoin(): IQ;
    leftJoin(): IQ;
}
/**
 * A concrete ORM relation on a Repository Entity
 */
export interface IQRepositoryEntityRelation<Entity, IQ extends IQEntity<Entity>> extends IQRelation<Entity, IQ> {
    equals(entity: DeepPartial<Entity> | IQRepositoryEntityRelation<Entity, IQ>): JSONLogicalOperation;
}
export interface IQInternalRelation<Entity, IQ extends IQEntity<Entity>> extends IQRelation<Entity, IQ> {
    dbRelation: DbRelation;
    parentQ: IQEntityInternal<any>;
}
//# sourceMappingURL=Relation.d.ts.map