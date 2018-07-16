import { JsonUpdate } from "@airport/ground-control";
import { JsonEntityUpdateColumns } from "@airport/ground-control";
import { IEntityUpdateProperties, IQEntity } from "../../../lingo/core/entity/Entity";
import { RawUpdate } from "../../../lingo/query/facade/Update";
import { IUtils } from "../../../lingo/utils/Utils";
import { AbstractUpdate } from "./AbstractUpdate";
/**
 * Created by Papa on 10/2/2016.
 */
export declare class UpdateProperties<IEUP extends IEntityUpdateProperties, IQE extends IQEntity> extends AbstractUpdate<IQE, RawUpdate<IEUP, IQE>> {
    constructor(rawUpdate: RawUpdate<IEUP, IQE>, utils: IUtils);
    toJSON(): JsonUpdate<JsonEntityUpdateColumns>;
    protected setToJSON(rawSet: IEUP): JsonEntityUpdateColumns;
    private setEntityFragmentsToJSON;
    private setFragmentToJSON;
    private getPropertyChainDesription;
}
