import { DbColumn, DbProperty, JSONClauseField, JSONClauseObjectType, JSONSqlFunctionCall } from "@airport/ground-control";
import { IQFunction } from "../../../";
import { IFieldColumnAliases } from "../../../lingo/core/entity/Aliases";
import { IQEntityInternal } from "../../../lingo/core/entity/Entity";
import { IQFieldInternal, IQOrderableField } from "../../../lingo/core/field/Field";
import { IFieldInOrderBy } from "../../../lingo/core/field/FieldInOrderBy";
import { RawFieldQuery } from "../../../lingo/query/facade/FieldQuery";
import { IUtils } from "../../../lingo/utils/Utils";
import { FieldColumnAliases } from "../entity/Aliases";
import { IAppliable } from "./Appliable";
/**
 * Created by Papa on 4/21/2016.
 */
export declare abstract class QField<IQF extends IQOrderableField<IQF>> implements IQFieldInternal<IQF>, IAppliable<JSONClauseField, IQF> {
    dbColumn: DbColumn;
    dbProperty: DbProperty;
    q: IQEntityInternal;
    objectType: JSONClauseObjectType;
    protected utils: IUtils;
    alias: string;
    __appliedFunctions__: JSONSqlFunctionCall[];
    __fieldSubQuery__: RawFieldQuery<IQF>;
    constructor(dbColumn: DbColumn, dbProperty: DbProperty, q: IQEntityInternal, objectType: JSONClauseObjectType, utils: IUtils);
    /**
     protected getFieldKey() {
        let rootEntityPrefix = columnAliases.entityAliases.getExistingAlias(this.parentQ.getRootJoinEntity());
        let key = `${QRelation.getPositionAlias(rootEntityPrefix, this.parentQ.fromClausePosition)}.${this.fieldName}`;
        return key;
    }
     */
    asc(): IFieldInOrderBy<IQF>;
    desc(): IFieldInOrderBy<IQF>;
    abstract getInstance(qEntity?: IQEntityInternal): QField<IQF>;
    applySqlFunction(sqlFunctionCall: JSONSqlFunctionCall): IQF;
    addSubQuery(subQuery: RawFieldQuery<IQF>): IQF;
    toJSON(columnAliases: IFieldColumnAliases<IQF>, forSelectClause: boolean): JSONClauseField;
    operableFunctionToJson(functionObject: IQFunction<any>, columnAliases: FieldColumnAliases, forSelectClause: boolean): JSONClauseField;
    protected copyFunctions<QF extends QField<IQF>>(field: QF): QF;
    private appliedFunctionsToJson;
    private functionCallToJson;
    private valueToJSON;
}
