import {
	QueryEntityFieldInOrderBy,
	QueryFieldInOrderBy,
	QuerySortOrder
} from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../definition/core/entity/IAliases";
import { IQOrderableField } from "../../../definition/core/field/IQFieldInternal";
import { IFieldInOrderBy } from "../../../definition/core/field/IFieldInOrderBy";
import type { QField } from "./QField";

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
			fieldAlias: columnAliases.getExistingAlias(this.field),
			sortOrder: this.sortOrder
		};
	}

	toEntityJSON(): QueryEntityFieldInOrderBy {
		let qField = <QField<IQF>>this.field;
		return {
			fieldAlias: undefined,
			columnIndex: qField.dbColumn.index,
			propertyIndex: qField.dbProperty.index,
			entityIndex: qField.dbProperty.entity.index,
			applicationIndex: qField.dbProperty.entity.applicationVersion._localId,
			sortOrder: this.sortOrder
		};
	}

}
