import { DbRelation } from "@airport/ground-control";
import { IQEntity, IQEntityInternal } from './Entity';
/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelation<IQ extends IQEntity<any>> {
    innerJoin(): IQ;
    leftJoin(): IQ;
}
export interface IQInternalRelation<IQ extends IQEntity<any>> extends IQRelation<IQ> {
    dbRelation: DbRelation;
    parentQ: IQEntityInternal<any>;
}
//# sourceMappingURL=Relation.d.ts.map