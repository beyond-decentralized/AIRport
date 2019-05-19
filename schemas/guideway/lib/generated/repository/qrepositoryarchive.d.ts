import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { IArchive, ArchiveEId, ArchiveEOptionalId, ArchiveESelect, QArchiveQId, QArchiveQRelation } from './qarchive';
export interface IRepositoryArchive {
    repository?: IRepository;
    archive?: IArchive;
}
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
