import { DbRelation, JSONRelation } from '@airport/ground-control';
import { IQEntityDriver, IQEntityInternal } from '../../../lingo/core/entity/Entity';
/**
 * Created by Papa on 4/26/2016.
 */
export declare function QRelation(dbRelation: DbRelation, parentQ: IQEntityInternal): void;
export declare namespace QRelation {
    var getPositionAlias: (rootEntityPrefix: string, fromClausePosition: number[]) => string;
    var getAlias: (jsonRelation: JSONRelation) => string;
    var getParentAlias: (jsonRelation: JSONRelation) => string;
    var createRelatedQEntity: <IQ extends IQEntityInternal>(joinRelation: JSONRelation) => Promise<IQ>;
    var getNextChildJoinPosition: (joinParentDriver: IQEntityDriver) => number[];
}
