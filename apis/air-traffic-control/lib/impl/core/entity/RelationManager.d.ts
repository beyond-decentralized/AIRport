import { JSONRelation } from '@airport/ground-control';
import { IQEntityDriver, IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { IApplicationUtils } from '../../../lingo/utils/ApplicationUtils';
export interface IRelationManager {
    getPositionAlias(rootEntityPrefix: string, fromClausePosition: number[]): string;
    getAlias(jsonRelation: JSONRelation): string;
    getParentAlias(jsonRelation: JSONRelation): string;
    createRelatedQEntity<IQ extends IQEntityInternal>(joinRelation: JSONRelation, context: IRelationManagerContext): IQ;
    getNextChildJoinPosition(joinParentDriver: IQEntityDriver): number[];
}
export interface IRelationManagerContext {
}
export declare class RelationManager implements IRelationManager {
    applicationUtils: IApplicationUtils;
    getPositionAlias(rootEntityPrefix: string, fromClausePosition: number[]): string;
    getAlias(jsonRelation: JSONRelation): string;
    getParentAlias(jsonRelation: JSONRelation): string;
    createRelatedQEntity<IQ extends IQEntityInternal>(joinRelation: JSONRelation, context: IRelationManagerContext): IQ;
    getNextChildJoinPosition(joinParentDriver: IQEntityDriver): number[];
}
//# sourceMappingURL=RelationManager.d.ts.map