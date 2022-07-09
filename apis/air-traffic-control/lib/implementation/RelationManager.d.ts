import { JSONRelation } from '@airport/ground-control';
import { IApplicationUtils, IQEntityDriver, IQEntityInternal, IRelationManager, IRelationManagerContext } from '@airport/tarmaq-query';
export declare class RelationManager implements IRelationManager {
    applicationUtils: IApplicationUtils;
    getPositionAlias(rootEntityPrefix: string, fromClausePosition: number[]): string;
    getAlias(jsonRelation: JSONRelation): string;
    getParentAlias(jsonRelation: JSONRelation): string;
    createRelatedQEntity<IQ extends IQEntityInternal>(joinRelation: JSONRelation, context: IRelationManagerContext): IQ;
    getNextChildJoinPosition(joinParentDriver: IQEntityDriver): number[];
}
//# sourceMappingURL=RelationManager.d.ts.map