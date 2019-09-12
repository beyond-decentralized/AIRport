import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '../repository/qrepository';
export interface IDailyArchiveLog {
    dateNumber: number;
    repository: IRepository;
    numberOfChanges?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface DailyArchiveLogESelect extends IEntitySelectProperties, DailyArchiveLogEOptionalId {
    numberOfChanges?: number | IQNumberField;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailyArchiveLogEId extends IEntityIdProperties {
    dateNumber: number | IQNumberField;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DailyArchiveLogEOptionalId {
    dateNumber?: number | IQNumberField;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailyArchiveLogEUpdateProperties extends IEntityUpdateProperties {
    numberOfChanges?: number | IQNumberField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface DailyArchiveLogECascadeGraph extends IEntityCascadeGraph {
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface DailyArchiveLogEUpdateColumns extends IEntityUpdateColumns {
    NUMBER_OF_CHANGES?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DailyArchiveLogECreateProperties extends Partial<DailyArchiveLogEId>, DailyArchiveLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DailyArchiveLogECreateColumns extends DailyArchiveLogEId, DailyArchiveLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDailyArchiveLog extends IQEntity {
    dateNumber: IQNumberField;
    repository: QRepositoryQRelation;
    numberOfChanges: IQNumberField;
}
export interface QDailyArchiveLogQId {
    dateNumber: IQNumberField;
    repository: QRepositoryQId;
}
export interface QDailyArchiveLogQRelation extends IQRelation<QDailyArchiveLog>, QDailyArchiveLogQId {
}
