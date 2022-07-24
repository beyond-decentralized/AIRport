import { DbRelation } from "@airport/ground-control";
import { JSONLogicalOperation } from "../operation/LogicalOperation";
import { IQEntity, IQEntityInternal } from './Entity';
/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelation<IQ extends IQEntity> {
    INNER_JOIN(): IQ;
    LEFT_JOIN(): IQ;
}
/**
 * A concrete ORM relation on a AirEntity
 */
export interface IQAirEntityRelation<Entity, IQ extends IQEntity> extends IQRelation<IQ> {
    IS_NULL(): JSONLogicalOperation;
    IS_NOT_NULL(): JSONLogicalOperation;
}
export interface IQInternalRelation<IQ extends IQEntity> extends IQRelation<IQ> {
    dbRelation: DbRelation;
    parentQ: IQEntityInternal;
}
//# sourceMappingURL=Relation.d.ts.map