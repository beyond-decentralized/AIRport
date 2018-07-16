import { JsonInsertValues } from "@airport/ground-control";
import { IQEntity } from "../../../lingo/core/entity/Entity";
import { RawInsertColumnValues } from "../../../lingo/query/facade/InsertValues";
import { AbstractInsertValues } from "./AbstractInsertValues";
export declare class InsertColumnValues<IQE extends IQEntity> extends AbstractInsertValues<IQE, RawInsertColumnValues<IQE>> {
    toJSON(): JsonInsertValues;
}
