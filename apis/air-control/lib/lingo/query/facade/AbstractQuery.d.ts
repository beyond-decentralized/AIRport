import { JsonStatement } from "@airport/ground-control";
import { Parameter } from "../../core/entity/Aliases";
export interface IAbstractQuery {
    getParameters(): {
        [alias: string]: Parameter;
    };
    toJSON(): JsonStatement;
}
