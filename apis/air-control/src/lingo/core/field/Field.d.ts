import { DbColumn, DbProperty, JSONClauseObjectType } from "@airport/ground-control";
import { IQEntityInternal } from "../entity/Entity";
import { IFieldInOrderBy } from './FieldInOrderBy';
/**
 * A concrete query field/column that can be ordered.
 */
export interface IQOrderableField<IQF extends IQOrderableField<IQF>> {
    /**
     * Order by this field in ascending IQOrderableField.
     */
    asc(): IFieldInOrderBy<IQF>;
    /**
     * Order by this field in descending IQOrderableField.
     */
    desc(): IFieldInOrderBy<IQF>;
}
export interface IQFieldInternal<IQF extends IQOrderableField<IQF>> extends IQOrderableField<IQF> {
    alias: string;
    dbColumn: DbColumn;
    dbProperty: DbProperty;
    objectType: JSONClauseObjectType;
    q: IQEntityInternal;
}
