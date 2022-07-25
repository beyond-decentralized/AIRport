import { IEntitySelectProperties } from "@airport/tarmaq-query";
/**
 * Select property creation utility
 */
export interface IFieldsSelect<EntitySelect extends IEntitySelectProperties> {
    ids: EntitySelect;
    fields: EntitySelect;
    manyToOnes: EntitySelect;
    oneToManys: EntitySelect;
}
//# sourceMappingURL=IFieldsSelect.d.ts.map