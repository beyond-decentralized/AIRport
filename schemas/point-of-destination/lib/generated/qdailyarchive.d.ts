import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { IDailyArchiveLog, DailyArchiveLogEId, DailyArchiveLogEOptionalId, DailyArchiveLogESelect, QDailyArchiveLogQId, QDailyArchiveLogQRelation, IRepository, RepositoryEOptionalId, RepositoryESelect, QRepositoryQRelation } from '@airport/guideway';
export interface IDailyArchive {
    dailyArchiveLog?: IDailyArchiveLog;
    repositoryData?: string;
    repository?: IRepository;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface DailyArchiveESelect extends IEntitySelectProperties, DailyArchiveEOptionalId {
    repositoryData?: string | IQStringField;
    dailyArchiveLog?: DailyArchiveLogESelect;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailyArchiveEId extends IEntityIdProperties {
    dailyArchiveLog: DailyArchiveLogEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DailyArchiveEOptionalId {
    dailyArchiveLog?: DailyArchiveLogEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailyArchiveEUpdateProperties extends IEntityUpdateProperties {
    repositoryData?: string | IQStringField;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface DailyArchiveEUpdateColumns extends IEntityUpdateColumns {
    REPOSITORY_DATA?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface DailyArchiveECreateProperties extends Partial<DailyArchiveEId>, DailyArchiveEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface DailyArchiveECreateColumns extends DailyArchiveEId, DailyArchiveEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QDailyArchive extends QEntity {
    dailyArchiveLog: QDailyArchiveLogQRelation;
    repositoryData: IQStringField;
    repository: QRepositoryQRelation;
}
export interface QDailyArchiveQId {
    dailyArchiveLog: QDailyArchiveLogQId;
}
export interface QDailyArchiveQRelation extends QRelation<QDailyArchive>, QDailyArchiveQId {
}
