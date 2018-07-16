import { DbEntity } from "@airport/ground-control";
import { MappedEntityArray } from "../../lingo/query/MappedEntityArray";
import { IUtils } from "../../lingo/utils/Utils";
/**
 * Created by Papa on 10/14/2016.
 */
export declare function newMappedEntityArray<E>(utils: IUtils, dbEntity: DbEntity): MappedEntityArray<E>;
