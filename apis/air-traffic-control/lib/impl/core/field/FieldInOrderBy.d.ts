import { JSONEntityFieldInOrderBy, JSONFieldInOrderBy, SortOrder } from "@airport/ground-control";
import { IFieldColumnAliases } from "../../../lingo/core/entity/Aliases";
import { IQOrderableField } from "../../../lingo/core/field/Field";
import { IFieldInOrderBy } from "../../../lingo/core/field/FieldInOrderBy";
/**
 * Created by Papa on 10/16/2016.
 */
export declare class FieldInOrderBy<IQF extends IQOrderableField<IQF>> implements IFieldInOrderBy<IQF> {
    field: IQOrderableField<IQF>;
    sortOrder: SortOrder;
    constructor(field: IQOrderableField<IQF>, sortOrder: SortOrder);
    toJSON(columnAliases: IFieldColumnAliases<IQF>): JSONFieldInOrderBy;
    toEntityJSON(): JSONEntityFieldInOrderBy;
}
//# sourceMappingURL=FieldInOrderBy.d.ts.map