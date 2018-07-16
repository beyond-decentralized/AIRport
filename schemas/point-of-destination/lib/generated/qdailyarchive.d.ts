import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, QEntity, QRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation, IDailyArchiveLog, DailyArchiveLogEId, DailyArchiveLogEOptionalId, DailyArchiveLogESelect, QDailyArchiveLogQId, QDailyArchiveLogQRelation } from '@airport/guideway';
export interface IDailyArchive {
    repository?: IRepository;
    dailyArchiveLog?: IDailyArchiveLog;
    repositoryData?: string;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface DailyArchiveESelect extends IEntitySelectProperties, DailyArchiveEOptionalId, DailyArchiveEUpdateProperties {
    repository?: RepositoryESelect;
    dailyArchiveLog?: DailyArchiveLogESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface DailyArchiveEId extends IEntityIdProperties {
    repository: RepositoryEId;
    dailyArchiveLog: DailyArchiveLogEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface DailyArchiveEOptionalId {
    repository?: RepositoryEOptionalId;
    dailyArchiveLog?: DailyArchiveLogEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface DailyArchiveEUpdateProperties extends IEntityUpdateProperties {
    repositoryData?: string | IQStringField;
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
export interface DailyArchiveECreateProperties extends DailyArchiveEId, DailyArchiveEUpdateProperties {
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
    repository: QRepositoryQRelation;
    dailyArchiveLog: QDailyArchiveLogQRelation;
    repositoryData: IQStringField;
}
export interface QDailyArchiveQId {
    repository: QRepositoryQId;
    dailyArchiveLog: QDailyArchiveLogQId;
}
export interface QDailyArchiveQRelation extends QRelation<QDailyArchive>, QDailyArchiveQId {
}
