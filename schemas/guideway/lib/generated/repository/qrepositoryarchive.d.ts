import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { IRepository, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from './qrepository';
import { IArchive, ArchiveEOptionalId, ArchiveESelect, QArchiveQRelation } from './qarchive';
export interface IRepositoryArchive {
    repository?: IRepository;
    archive?: IArchive;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryArchiveESelect extends IEntitySelectProperties, RepositoryArchiveEOptionalId, RepositoryArchiveEUpdateProperties {
    repository?: RepositoryESelect;
    archive?: ArchiveESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryArchiveEId extends IEntityIdProperties {
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryArchiveEOptionalId {
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryArchiveEUpdateProperties extends IEntityUpdateProperties {
    repository?: RepositoryEOptionalId;
    archive?: ArchiveEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryArchiveEUpdateColumns extends IEntityUpdateColumns {
    REPOSITORY_ID?: number | IQNumberField;
    ARCHIVE_ID?: string | IQStringField;
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
export interface QRepositoryArchive extends QEntity {
    repository: QRepositoryQRelation;
    archive: QArchiveQRelation;
}
export interface QRepositoryArchiveQId {
}
export interface QRepositoryArchiveQRelation extends QRelation<QRepositoryArchive>, QRepositoryArchiveQId {
}
