import { JsonUpdate } from "@airport/ground-control";
import { JsonEntityUpdateColumns } from "@airport/ground-control";
import { IQEntity } from "../../../lingo/core/entity/Entity";
import { AbstractRawUpdate } from "../../../lingo/query/facade/Update";
import { IUtils } from "../../../lingo/utils/Utils";
import { AbstractQuery } from "./AbstractQuery";
export declare abstract class AbstractUpdate<IQE extends IQEntity, ARE extends AbstractRawUpdate<IQE>> extends AbstractQuery {
    rawUpdate: ARE;
    protected utils: IUtils;
    constructor(rawUpdate: ARE, utils: IUtils);
    toJSON(): JsonUpdate<JsonEntityUpdateColumns>;
    protected abstract setToJSON(set: any): JsonEntityUpdateColumns;
}
