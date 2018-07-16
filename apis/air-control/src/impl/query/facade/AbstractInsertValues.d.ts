import { IQEntity } from "../../../lingo/core/entity/Entity";
import { AbstractRawInsertValues } from "../../../lingo/query/facade/InsertValues";
import { AbstractQuery } from "./AbstractQuery";
/**
 * Created by Papa on 11/17/2016.
 */
export declare abstract class AbstractInsertValues<IQE extends IQEntity, ARIV extends AbstractRawInsertValues<IQE>> extends AbstractQuery {
    rawInsertValues: ARIV;
    columnIndexes?: number[];
    constructor(rawInsertValues: ARIV, columnIndexes?: number[]);
    protected valuesToJSON(valueSets: any[][]): any[][];
}
