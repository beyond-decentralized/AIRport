import { JsonSheetQuery } from "@airport/ground-control";
import { IFieldUtils } from '../../../lingo/utils/FieldUtils';
import { IQueryUtils } from '../../../lingo/utils/QueryUtils';
import { IQuery } from "../../../lingo/query/facade/Query";
import { RawSheetQuery } from "../../../lingo/query/facade/SheetQuery";
import { IUtils } from "../../../lingo/utils/Utils";
import { DistinguishableQuery } from "./NonEntityQuery";
/**
 * Created by Papa on 10/23/2016.
 */
export declare class SheetQuery extends DistinguishableQuery implements IQuery {
    rawQuery: RawSheetQuery;
    private utils;
    constructor(rawQuery: RawSheetQuery, utils: IUtils);
    nonDistinctSelectClauseToJSON(rawSelect: any[]): any;
    toJSON(queryUtils: IQueryUtils, fieldUtils: IFieldUtils): JsonSheetQuery;
}
