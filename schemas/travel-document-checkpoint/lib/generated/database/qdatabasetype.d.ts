import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { DatabaseGraph, DatabaseEId, DatabaseEOptionalId, DatabaseESelect, QDatabaseQId, QDatabaseQRelation } from './qdatabase';
import { TypeGraph, TypeEId, TypeEOptionalId, TypeESelect, QTypeQId, QTypeQRelation } from '../type/qtype';
/**
 * SELECT - All fields and relations (optional).
 */
export interface DatabaseTypeESelect extends IEntitySelectProperties, DatabaseTypeEOptionalId {
    database?: DatabaseESelect;
    type?: TypeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DatabaseTypeEId extends IEntityIdProperties {
    database: DatabaseEId;
    type: TypeEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DatabaseTypeEOptionalId {
    database?: DatabaseEOptionalId;
    type?: TypeEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DatabaseTypeEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DatabaseTypeGraph extends DatabaseTypeEOptionalId, IEntityCascadeGraph {
    database?: DatabaseGraph;
    type?: TypeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface DatabaseTypeEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DatabaseTypeECreateProperties extends Partial<DatabaseTypeEId>, DatabaseTypeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DatabaseTypeECreateColumns extends DatabaseTypeEId, DatabaseTypeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QDatabaseType extends IQEntity {
    database: QDatabaseQRelation;
    type: QTypeQRelation;
}
export interface QDatabaseTypeQId {
    database: QDatabaseQId;
    type: QTypeQId;
}
export interface QDatabaseTypeQRelation extends IQRelation<QDatabaseType>, QDatabaseTypeQId {
}
//# sourceMappingURL=qdatabasetype.d.ts.map