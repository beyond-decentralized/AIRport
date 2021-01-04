import { IQEntity } from '@airport/air-control';
import { RepositoryEntityGraph, RepositoryEntityEId, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityESelect, QRepositoryEntityQId, QRepositoryEntityQRelation, QRepositoryEntity } from '../repository/qrepositoryentity';
/**
 * SELECT - All fields and relations (optional).
 */
export interface ChildRepoRowESelect extends RepositoryEntityESelect, ChildRepoRowEOptionalId {
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface ChildRepoRowEId extends RepositoryEntityEId {
}
/**
 * Ids fields and relations only (optional).
 */
export interface ChildRepoRowEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface ChildRepoRowEUpdateProperties extends RepositoryEntityEUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface ChildRepoRowGraph extends ChildRepoRowEOptionalId, RepositoryEntityGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface ChildRepoRowEUpdateColumns extends RepositoryEntityEUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface ChildRepoRowECreateProperties extends Partial<ChildRepoRowEId>, ChildRepoRowEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface ChildRepoRowECreateColumns extends ChildRepoRowEId, ChildRepoRowEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QChildRepoRow<T> extends QRepositoryEntity<T> {
}
export interface QChildRepoRowQId extends QRepositoryEntityQId {
}
export interface QChildRepoRowQRelation<SubType, SubQType extends IQEntity<SubType>> extends QRepositoryEntityQRelation<SubType, SubQType>, QChildRepoRowQId {
}
//# sourceMappingURL=qchildreporow.d.ts.map