import { IQNumberField, IQEntity } from '@airport/air-control';
import { RepositoryEntityGraph, RepositoryEntityEId, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityESelect, QRepositoryEntityQId, QRepositoryEntityQRelation, QRepositoryEntity } from './qrepositoryentity';
/**
 * SELECT - All fields and relations (optional).
 */
export interface IREntityESelect extends RepositoryEntityESelect, IREntityEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface IREntityEId extends RepositoryEntityEId {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface IREntityEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface IREntityEUpdateProperties extends RepositoryEntityEUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface IREntityGraph extends IREntityEOptionalId, RepositoryEntityGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface IREntityEUpdateColumns extends RepositoryEntityEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface IREntityECreateProperties extends Partial<IREntityEId>, IREntityEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface IREntityECreateColumns extends IREntityEId, IREntityEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QIREntity<T> extends QRepositoryEntity<T> {
    id: IQNumberField;
}
export interface QIREntityQId extends QRepositoryEntityQId {
    id: IQNumberField;
}
export interface QIREntityQRelation<SubType, SubQType extends IQEntity<SubType>> extends QRepositoryEntityQRelation<SubType, SubQType>, QIREntityQId {
}
//# sourceMappingURL=qirentity.d.ts.map