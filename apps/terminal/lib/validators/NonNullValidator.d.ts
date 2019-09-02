import { DbEntity, JsonInsertValues } from '@airport/ground-control';
export interface INonNullValidator {
    validate(entity: any, jsonInsertValues: JsonInsertValues, dbEntity: DbEntity): void;
}
export declare class NonNullValidator implements INonNullValidator {
    validate(entity: any, jsonInsertValues: JsonInsertValues, dbEntity: DbEntity): void;
}
