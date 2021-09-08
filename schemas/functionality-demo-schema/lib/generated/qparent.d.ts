import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ChildGraph, ChildESelect, QChild } from './qchild';
import { Child } from '../ddl/Child';
import { Parent } from '../ddl/Parent';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ParentESelect extends IEntitySelectProperties, ParentEOptionalId {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    children?: ChildESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ParentEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ParentEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ParentEUpdateProperties extends IEntityUpdateProperties {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ParentGraph extends ParentEOptionalId, IEntityCascadeGraph {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    children?: ChildGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ParentEUpdateColumns extends IEntityUpdateColumns {
    BOOL?: boolean | IQBooleanField;
    NUM?: number | IQNumberField;
    STR?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ParentECreateProperties extends Partial<ParentEId>, ParentEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ParentECreateColumns extends ParentEId, ParentEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QParent extends IQEntity<Parent> {
    id: IQNumberField;
    bool: IQBooleanField;
    num: IQNumberField;
    str: IQStringField;
    children: IQOneToManyRelation<Child, QChild>;
}
export interface QParentQId {
    id: IQNumberField;
}
export interface QParentQRelation extends IQRelation<Parent, QParent>, QParentQId {
}
//# sourceMappingURL=qparent.d.ts.map