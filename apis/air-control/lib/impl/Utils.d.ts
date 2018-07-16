import { DatastructureUtils } from "@airport/ground-control";
import { IAirportDatabase } from "../lingo/AirportDatabase";
import { IEntityUtils } from "../lingo/utils/EntityUtils";
import { IFieldUtils } from "../lingo/utils/FieldUtils";
import { IQMetadataUtils } from "../lingo/utils/QMetadataUtils";
import { IQueryUtils } from "../lingo/utils/QueryUtils";
import { ISchemaUtils } from "../lingo/utils/SchemaUtils";
import { IUtils } from "../lingo/utils/Utils";
export declare class Utils extends DatastructureUtils implements IUtils {
    private airportDb;
    Entity: IEntityUtils;
    Field: IFieldUtils;
    Medatada: IQMetadataUtils;
    Query: IQueryUtils;
    Schema: ISchemaUtils;
    constructor(airportDb: IAirportDatabase);
    strsToNums(strings: string[]): number[];
    objectExists(object: any): boolean;
    valuesEqual(value1: any, value2: any, checkChildObjects?: boolean): boolean;
    compareNumbers(number1: number, number2: number): -1 | 0 | 1;
}
