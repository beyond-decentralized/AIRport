import { IEntityUpdateColumns, IQEntity } from "../../../lingo/core/entity/Entity";
import { RawUpdateColumns } from "../../../lingo/query/facade/Update";
import { IUtils } from "../../../lingo/utils/Utils";
import { AbstractUpdate } from "./AbstractUpdate";
export declare class UpdateColumns<IEUC extends IEntityUpdateColumns, IQE extends IQEntity> extends AbstractUpdate<IQE, RawUpdateColumns<IEUC, IQE>> {
    constructor(rawUpdate: RawUpdateColumns<IEUC, IQE>, utils: IUtils);
    protected setToJSON(set: any): IEUC;
}
