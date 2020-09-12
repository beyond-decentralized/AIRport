import { DbRelation } from "@airport/ground-control";
import { IQEntity, IQEntityInternal } from './Entity';
/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelation<IQ extends IQEntity> {
    innerJoin(): IQ;
    leftJoin(): IQ;
}
export interface IQInternalRelation<IQ extends IQEntity> extends IQRelation<IQ> {
    dbRelation: DbRelation;
    parentQ: IQEntityInternal;
}
//# sourceMappingURL=Relation.d.ts.map