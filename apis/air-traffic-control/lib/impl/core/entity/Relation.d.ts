import { AirEntityUuId } from '@airport/aviation-communication';
import { DbRelation, IAirEntity } from '@airport/ground-control';
import { IQEntityInternal, IQAirEntity } from '../../../lingo/core/entity/Entity';
import { IQAirEntityRelation } from '../../../lingo/core/entity/Relation';
import { JSONLogicalOperation } from '../../../lingo/core/operation/LogicalOperation';
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils';
import type { IRelationManager } from './RelationManager';
/**
 * Created by Papa on 4/26/2016.
 */
export declare function QRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare function QAirEntityRelation(dbRelation: DbRelation, parentQ: IQEntityInternal, applicationUtils: IApplicationUtils, relationManager: IRelationManager): void;
export declare const qAirEntityRelationMethods: {
    equals: <Entity extends IAirEntity, IQ extends IQEntityInternal>(entity: string | AirEntityUuId | IQAirEntity | Entity | IQAirEntityRelation<Entity, IQ>) => JSONLogicalOperation;
};
//# sourceMappingURL=Relation.d.ts.map