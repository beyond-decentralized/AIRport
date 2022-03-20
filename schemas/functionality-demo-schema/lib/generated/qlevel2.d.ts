import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { Level1Graph, Level1EOptionalId, Level1ESelect, QLevel1QRelation } from './qlevel1';
/**
 * SELECT - All fields and relations (optional).
 */
export interface Level2ESelect extends IEntitySelectProperties, Level2EOptionalId {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    up?: Level1ESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface Level2EId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface Level2EOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface Level2EUpdateProperties extends IEntityUpdateProperties {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    up?: Level1EOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface Level2Graph extends Level2EOptionalId, IEntityCascadeGraph {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    up?: Level1Graph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface Level2EUpdateColumns extends IEntityUpdateColumns {
    BOOL?: boolean | IQBooleanField;
    NUM?: number | IQNumberField;
    STR?: string | IQStringField;
    LEVEL1ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface Level2ECreateProperties extends Partial<Level2EId>, Level2EUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface Level2ECreateColumns extends Level2EId, Level2EUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLevel2 extends IQEntity {
    id: IQNumberField;
    bool: IQBooleanField;
    num: IQNumberField;
    str: IQStringField;
    up: QLevel1QRelation;
}
export interface QLevel2QId {
    id: IQNumberField;
}
export interface QLevel2QRelation extends IQRelation<QLevel2>, QLevel2QId {
}
//# sourceMappingURL=qlevel2.d.ts.map