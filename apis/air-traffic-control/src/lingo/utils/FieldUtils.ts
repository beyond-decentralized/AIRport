import {JsonFieldQuery}   from "@airport/ground-control";
import {IEntityAliases}   from "../core/entity/Aliases";
import {IQOrderableField} from "../core/field/Field";
import {RawFieldQuery}    from "../query/facade/FieldQuery";
import {IQueryUtils}      from './QueryUtils'

export interface IFieldUtils {

	getFieldQueryJson<IQF extends IQOrderableField<IQF>>(
		fieldSubQuery: RawFieldQuery<IQF>,
		entityAliases: IEntityAliases,
		queryUtils: IQueryUtils
	): JsonFieldQuery;

}
