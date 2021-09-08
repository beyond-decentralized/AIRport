import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQNumberField, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { ParentGraph, ParentEOptionalId, ParentESelect, QParentQRelation } from './qparent';
import { Child } from '../ddl/Child';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ChildESelect extends IEntitySelectProperties, ChildEOptionalId {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    parent?: ParentESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ChildEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface ChildEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ChildEUpdateProperties extends IEntityUpdateProperties {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    parent?: ParentEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ChildGraph extends ChildEOptionalId, IEntityCascadeGraph {
    bool?: boolean | IQBooleanField;
    num?: number | IQNumberField;
    str?: string | IQStringField;
    parent?: ParentGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ChildEUpdateColumns extends IEntityUpdateColumns {
    BOOL?: boolean | IQBooleanField;
    NUM?: number | IQNumberField;
    STR?: string | IQStringField;
    PARENTID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ChildECreateProperties extends Partial<ChildEId>, ChildEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ChildECreateColumns extends ChildEId, ChildEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QChild extends IQEntity<Child> {
    id: IQNumberField;
    bool: IQBooleanField;
    num: IQNumberField;
    str: IQStringField;
    parent: QParentQRelation;
}
export interface QChildQId {
    id: IQNumberField;
}
export interface QChildQRelation extends IQRelation<Child, QChild>, QChildQId {
}
//# sourceMappingURL=qchild.d.ts.map