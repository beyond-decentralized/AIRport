import { DbEntity } from "@airport/ground-control";
import { IEntitySelectProperties } from "@airport/tarmaq-query";
import { IFieldsSelect } from "../definition/IFieldsSelect";
export declare class FieldsSelect<EntitySelect extends IEntitySelectProperties> implements IFieldsSelect<EntitySelect> {
    dbEntity: DbEntity;
    constructor(dbEntity: DbEntity);
    get ids(): EntitySelect;
    get fields(): EntitySelect;
    get manyToOnes(): EntitySelect;
    get oneToManys(): EntitySelect;
    private getRelationSelect;
    private getSelect;
}
//# sourceMappingURL=FieldsSelect.d.ts.map