import { Observable } from "rxjs";
import { IQOrderableField } from "../../../lingo/core/field/Field";
import { IDatabaseFacade } from "../../../lingo/core/repository/DatabaseFacade";
import { INonEntitySearch } from "../../../lingo/query/api/NonEntitySearch";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { RawSheetQuery } from "../../../lingo/query/facade/SheetQuery";
import { ITreeEntity, RawTreeQuery } from "../../../lingo/query/facade/TreeQuery";
import { IUtils } from "../../../lingo/utils/Utils";
/**
 * Created by Papa on 11/12/2016.
 */
export declare class NonEntitySearch implements INonEntitySearch {
    private dbFacade;
    private utils;
    constructor(dbFacade: IDatabaseFacade, utils: IUtils);
    tree<ITE extends ITreeEntity>(rawTreeQuery: RawTreeQuery<ITE> | {
        (...args: any[]): RawTreeQuery<any>;
    }): Observable<ITE[]>;
    sheet(rawSheetQuery: RawSheetQuery | {
        (...args: any[]): RawSheetQuery;
    }): Observable<any[][]>;
    field<IQF extends IQOrderableField<IQF>>(rawFieldQuery: RawFieldQuery<IQF> | {
        (...args: any[]): RawFieldQuery<any>;
    }): Observable<any[]>;
}
