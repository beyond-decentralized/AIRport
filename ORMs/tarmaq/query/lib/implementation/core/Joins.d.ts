import { IFrom } from '../../definition/core/entity/Entity';
import { IJoinFields, JoinOperation } from "../../definition/core/entity/Joins";
import { IQOrderableField } from "../../definition/core/field/Field";
import { RawFieldQuery } from "../../definition/query/facade/FieldQuery";
import { ITreeEntity, RawTreeQuery } from "../../definition/query/facade/TreeQuery";
/**
 * Created by Papa on 10/25/2016.
 */
export declare function tree<IME extends ITreeEntity>(query: {
    (...args: any[]): RawTreeQuery<IME>;
} | RawTreeQuery<IME>): IME & IFrom;
/**
 * Sub-queries in SELECT clause
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
//# sourceMappingURL=Joins.d.ts.map