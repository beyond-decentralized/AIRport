import { RepositoryEntityId } from '@airport/aviation-communication';
import { DbRelation } from '@airport/ground-control';
import { IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IQRepositoryEntityRelation } from '../../../lingo/core/entity/Relation';
import { JSONLogicalOperation } from '../../../lingo/core/operation/LogicalOperation';
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils';
import { IRelationManager } from './RelationManager';
/**
 * Created by Papa on 4/26/2016.
 */
export declare function QRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare function QRepositoryEntityRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare const qRepositoryEntityRelationMethods: {
    equals: <Entity, IQ extends IQEntityInternal>(entity: string | RepositoryEntityId | Entity | IQRepositoryEntityRelation<Entity, IQ>) => JSONLogicalOperation;
};
//# sourceMappingURL=Relation.d.ts.map