import { DbRelation, JSONRelation } from "@airport/ground-control";
import { IQEntityDriver, IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { IQInternalRelation } from "../../../lingo/core/entity/Relation";
import { IUtils } from "../../../lingo/utils/Utils";
/**
 * Created by Papa on 4/26/2016.
 */
export declare abstract class QRelation<IQ extends IQEntityInternal> implements IQInternalRelation<IQ> {
    dbRelation: DbRelation;
    parentQ: IQEntityInternal;
    constructor(dbRelation: DbRelation, parentQ: IQEntityInternal);
    static getPositionAlias(rootEntityPrefix: string, fromClausePosition: number[]): string;
    static getAlias(jsonRelation: JSONRelation): string;
    static getParentAlias(jsonRelation: JSONRelation): string;
    static createRelatedQEntity<IQ extends IQEntityInternal>(utils: IUtils, joinRelation: JSONRelation): IQ;
    static getNextChildJoinPosition(joinParentDriver: IQEntityDriver): number[];
    innerJoin(): IQ;
    leftJoin(): IQ;
    private getNewQEntity;
}
