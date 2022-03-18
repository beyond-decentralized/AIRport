import { DbRelation, JoinType } from '@airport/ground-control';
import { IQEntity, IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IQRelation, IQRepositoryEntityRelation } from '../../../lingo/core/entity/Relation';
import { JSONLogicalOperation } from '../../../lingo/core/operation/LogicalOperation';
/**
 * Created by Papa on 4/26/2016.
 */
export declare class QRelation<Entity, IQ extends IQEntity<Entity>> implements IQRelation<Entity, IQ> {
    private dbRelation;
    private parentQ;
    constructor(dbRelation: DbRelation, parentQ: IQEntityInternal<any>);
    innerJoin(): IQ;
    leftJoin(): IQ;
    getNewQEntity(joinType: JoinType): IQ;
}
export declare class QRepositoryEntityRelation<Entity, IQ extends IQEntity<Entity>> extends QRelation<Entity, IQ> implements IQRepositoryEntityRelation<Entity, IQ> {
    equals(entity: Entity | IQRepositoryEntityRelation<Entity, IQ>): JSONLogicalOperation;
}
//# sourceMappingURL=Relation.d.ts.map