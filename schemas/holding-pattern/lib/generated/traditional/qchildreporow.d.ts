import { IQEntity } from '@airport/air-control';
import { IRepositoryEntity, RepositoryEntityECascadeGraph, RepositoryEntityEId, RepositoryEntityEUpdateColumns, RepositoryEntityEUpdateProperties, RepositoryEntityESelect, QRepositoryEntityQId, QRepositoryEntityQRelation, QRepositoryEntity } from '../repository/qrepositoryentity';
export interface IChildRepoRow extends IRepositoryEntity {
}
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
export interface ChildRepoRowECascadeGraph extends RepositoryEntityECascadeGraph {
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
export interface QChildRepoRow extends QRepositoryEntity {
}
export interface QChildRepoRowQId extends QRepositoryEntityQId {
}
export interface QChildRepoRowQRelation<SubType extends IQEntity> extends QRepositoryEntityQRelation<QChildRepoRow>, QChildRepoRowQId {
}
