import {
	DbColumn,
	DbProperty,
	QueryClauseObjectType
} from "@airport/ground-control";
import { IQEntityInternal } from "../entity/IQEntityDriver";
import { IFieldInOrderBy } from './IFieldInOrderBy';

/**
 * A concrete query field/column that can be ordered.
 */
export interface IQOrderableField<IQF extends IQOrderableField<IQF>> {

	/**
	 * Order by this field in ascending IQOrderableField.
	 */
	ASC(): IFieldInOrderBy<IQF>;

	/**
	 * Order by this field in descending IQOrderableField.
	 */
	DESC(): IFieldInOrderBy<IQF>;
}

export interface IQFieldInternal<IQF extends IQOrderableField<IQF>>
	extends IQOrderableField<IQF> {

	alias: string;
	dbColumn: DbColumn;
	dbProperty: DbProperty;
	objectType: QueryClauseObjectType;
	q: IQEntityInternal;

}