import { IFrom } from "../../lingo/core/entity/Entity";
import { IJoinFields, JoinOperation } from "../../lingo/core/entity/Joins";
import { IQOrderableField } from "../../lingo/core/field/Field";
import { RawFieldQuery } from "../../lingo/query/facade/FieldQuery";
import { ITreeEntity, RawTreeQuery } from "../../lingo/query/facade/TreeQuery";
/**
 * Created by Papa on 10/25/2016.
 */
export declare function tree<IME extends ITreeEntity>(query: {
    (...args: any[]): RawTreeQuery<IME>;
} | RawTreeQuery<IME>): IME & IFrom;
/**
 * Sub-queries in select clause
 * @param query
 * @returns {IQF}
 */
export declare function field<IQF extends IQOrderableField<IQF>>(query: {
    (...args: any[]): RawFieldQuery<IQF>;
} | RawFieldQuery<IQF>): IQF;
export declare class JoinFields<IF extends IFrom> implements IJoinFields<IF> {
    private joinTo;
    constructor(joinTo: IF);
    on(joinOperation: JoinOperation<IF>): IF;
}
