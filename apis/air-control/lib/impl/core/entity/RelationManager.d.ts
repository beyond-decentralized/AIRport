import { JSONRelation } from '@airport/ground-control';
import { IAirportDatabase } from '../../../lingo/AirportDatabase';
import { IQEntityDriver, IQEntityInternal } from '../../../lingo/core/entity/Entity';
import { ISchemaUtils } from '../../../lingo/utils/SchemaUtils';
export interface IRelationManager {
}
export interface IRelationManagerContext {
    ioc: {
        airDb: IAirportDatabase;
        schemaUtils: ISchemaUtils;
    };
}
export declare class RelationManager implements IRelationManager {
    getPositionAlias(rootEntityPrefix: string, fromClausePosition: number[]): string;
    getAlias(jsonRelation: JSONRelation): string;
    getParentAlias(jsonRelation: JSONRelation): string;
    createRelatedQEntity<IQ extends IQEntityInternal>(joinRelation: JSONRelation, context: IRelationManagerContext): IQ;
    getNextChildJoinPosition(joinParentDriver: IQEntityDriver): number[];
}
//# sourceMappingURL=RelationManager.d.ts.map