import {
	QueryEntityFieldInOrderBy,
	QueryFieldInOrderBy,
	QuerySortOrder
} from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../definition/core/entity/IAliases";
import { IQOrderableField } from "../../../definition/core/field/IQFieldInternal";
import { IFieldInOrderBy } from "../../../definition/core/field/IFieldInOrderBy";
import type { QField } from "./Field";

/**
 * Created by Papa on 10/16/2016.
 */


export class FieldInOrderBy<IQF extends IQOrderableField<IQF>>
	implements IFieldInOrderBy<IQF> {

	constructor(
		public field: IQOrderableField<IQF>,
		public sortOrder: QuerySortOrder
	) {
	}

	toQueryFragment(columnAliases: IFieldColumnAliases<IQF>): QueryFieldInOrderBy {
		if (!columnAliases.hasAliasFor(this.field)) {
			throw new Error(`Field used in ORDER_BY clause is not present in SELECT clause`);
		}
		return {
			fa: columnAliases.getExistingAlias(this.field),
			so: this.sortOrder
		};
	}

	toEntityJSON(): QueryEntityFieldInOrderBy {
		let qField = <QField<IQF>>this.field;
		return {
			fa: undefined,
			ci: qField.dbColumn.index,
			pi: qField.dbProperty.index,
			ti: qField.dbProperty.entity.index,
			si: qField.dbProperty.entity.applicationVersion._localId,
			so: this.sortOrder
		};
	}

}
