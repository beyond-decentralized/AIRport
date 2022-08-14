import { IFrom, IQEntity } from '../../definition/core/entity/Entity';
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
export declare class JoinFields<IF1 extends IFrom, IQE extends IQEntity<any>> implements IJoinFields<IF1, IQE> {
    private joinFrom;
    private joinTo;
    constructor(joinFrom: IQE, joinTo: IF1);
    ON(joinOperation: JoinOperation<IF1, IQE>): IQE;
}
//# sourceMappingURL=Joins.d.ts.map