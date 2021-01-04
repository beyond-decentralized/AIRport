import { DbRelation } from "@airport/ground-control";
import { IQEntity, IQEntityInternal } from './Entity';
/**
 * A concrete ORM relation, limited to INNER and LEFT joins since
 * ORM based queries always return trees.
 */
export interface IQRelation<Entity, IQ extends IQEntity<Entity>> {
    innerJoin(): IQ;
    leftJoin(): IQ;
}
export interface IQInternalRelation<Entity, IQ extends IQEntity<Entity>> extends IQRelation<Entity, IQ> {
    dbRelation: DbRelation;
    parentQ: IQEntityInternal<any>;
}
//# sourceMappingURL=Relation.d.ts.map