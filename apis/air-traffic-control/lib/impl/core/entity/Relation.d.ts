import { RepositoryEntityId } from '@airport/aviation-communication';
import { DbRelation, IRepositoryEntity } from '@airport/ground-control';
import { IQEntityInternal, IQRepositoryEntity } from '../../../lingo/core/entity/Entity';
import { IQRepositoryEntityRelation } from '../../../lingo/core/entity/Relation';
import { JSONLogicalOperation } from '../../../lingo/core/operation/LogicalOperation';
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils';
import type { IRelationManager } from './RelationManager';
/**
 * Created by Papa on 4/26/2016.
 */
export declare function QRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare function QRepositoryEntityRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare const qRepositoryEntityRelationMethods: {
    equals: <Entity extends IRepositoryEntity, IQ extends IQEntityInternal>(entity: string | RepositoryEntityId | IQRepositoryEntity | Entity | IQRepositoryEntityRelation<Entity, IQ>) => JSONLogicalOperation;
};
//# sourceMappingURL=Relation.d.ts.map