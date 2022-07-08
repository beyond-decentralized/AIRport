import { DbRelation } from '@airport/ground-control';
import { IQEntityInternal } from '../../../definition/core/entity/Entity';
import { IRelationManager } from '../../../definition/core/entity/IRelationManager';
import { JSONLogicalOperation } from '../../../definition/core/operation/LogicalOperation';
import { IApplicationUtils } from '../../../definition/utils/IApplicationUtils';
/**
 * Created by Papa on 4/26/2016.
 */
export declare function QRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare function QAirEntityRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare const qAirEntityRelationMethods: {
    isNull(): JSONLogicalOperation;
    isNotNull(): JSONLogicalOperation;
};
//# sourceMappingURL=Relation.d.ts.map