import { JsonDelete } from "@airport/ground-control";
import { IQEntity } from "../../../lingo/core/entity/Entity";
import { RawDelete } from "../../../lingo/query/facade/Delete";
import { IUtils } from "../../../lingo/utils/Utils";
import { AbstractQuery } from "./AbstractQuery";
/**
 * Created by Papa on 10/2/2016.
 */
export declare class Delete<IQE extends IQEntity> extends AbstractQuery {
    rawDelete: RawDelete<IQE>;
    private utils;
    constructor(rawDelete: RawDelete<IQE>, utils: IUtils);
    toJSON(): JsonDelete;
}
