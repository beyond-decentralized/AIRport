import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { ArchiveGraph, ArchiveEId, ArchiveEOptionalId, ArchiveESelect, QArchiveQId, QArchiveQRelation } from './qarchive';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryArchiveESelect extends IEntitySelectProperties, RepositoryArchiveEOptionalId {
    repository?: RepositoryESelect;
    archive?: ArchiveESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryArchiveEId extends IEntityIdProperties {
    repository: RepositoryEId;
    archive: ArchiveEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryArchiveEOptionalId {
    repository?: RepositoryEOptionalId;
    archive?: ArchiveEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryArchiveEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryArchiveGraph extends RepositoryArchiveEOptionalId, IEntityCascadeGraph {
    repository?: RepositoryGraph;
    archive?: ArchiveGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryArchiveEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryArchiveECreateProperties extends Partial<RepositoryArchiveEId>, RepositoryArchiveEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryArchiveECreateColumns extends RepositoryArchiveEId, RepositoryArchiveEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryArchive extends IQEntity {
    repository: QRepositoryQRelation;
    archive: QArchiveQRelation;
}
export interface QRepositoryArchiveQId {
    repository: QRepositoryQId;
    archive: QArchiveQId;
}
export interface QRepositoryArchiveQRelation extends IQRelation<QRepositoryArchive>, QRepositoryArchiveQId {
}
//# sourceMappingURL=qrepositoryarchive.d.ts.map