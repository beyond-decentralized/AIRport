import {
	JSONEntityFieldInOrderBy,
	JSONFieldInOrderBy,
	SortOrder
} from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../definition/core/entity/Aliases";
import { IQOrderableField } from "../../../definition/core/field/Field";
import { IFieldInOrderBy } from "../../../definition/core/field/FieldInOrderBy";
import type { QField } from "./Field";

/**
 * Created by Papa on 10/16/2016.
 */


export class FieldInOrderBy<IQF extends IQOrderableField<IQF>>
	implements IFieldInOrderBy<IQF> {

	constructor(
		public field: IQOrderableField<IQF>,
		public sortOrder: SortOrder
	) {
	}

	toJSON(columnAliases: IFieldColumnAliases<IQF>): JSONFieldInOrderBy {
		if (!columnAliases.hasAliasFor(this.field)) {
			throw new Error(`Field used in ORDER_BY clause is not present in SELECT clause`);
		}
		return {
			fa: columnAliases.getExistingAlias(this.field),
			so: this.sortOrder
		};
	}

	toEntityJSON(): JSONEntityFieldInOrderBy {
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
