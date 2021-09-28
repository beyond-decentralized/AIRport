import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { Level2Graph, Level2ESelect, QLevel2 } from './qlevel2';
import { Level2 } from '../ddl/Level2';
import { Level1 } from '../ddl/Level1';
/**
 * SELECT - All fields and relations (optional).
 */
export interface Level1ESelect extends IEntitySelectProperties, Level1EOptionalId {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    contained?: Level2ESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface Level1EId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface Level1EOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface Level1EUpdateProperties extends IEntityUpdateProperties {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface Level1Graph extends Level1EOptionalId, IEntityCascadeGraph {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    contained?: Level2Graph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface Level1EUpdateColumns extends IEntityUpdateColumns {
    BOOL?: boolean | IQBooleanField;
    NUM?: number | IQNumberField;
    STR?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface Level1ECreateProperties extends Partial<Level1EId>, Level1EUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface Level1ECreateColumns extends Level1EId, Level1EUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QLevel1 extends IQEntity<Level1> {
    id: IQNumberField;
    bool: IQBooleanField;
    num: IQNumberField;
    str: IQStringField;
    contained: IQOneToManyRelation<Level2, QLevel2>;
}
export interface QLevel1QId {
    id: IQNumberField;
}
export interface QLevel1QRelation extends IQRelation<Level1, QLevel1>, QLevel1QId {
}
//# sourceMappingURL=qlevel1.d.ts.map