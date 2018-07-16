import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, QEntity, QRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '../repository/qrepository';
export interface IMonthlyArchiveLog {
    monthNumber?: number;
    repository?: IRepository;
    numberOfChanges?: number;
    daysWithChanges?: any;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface MonthlyArchiveLogESelect extends IEntitySelectProperties, MonthlyArchiveLogEOptionalId, MonthlyArchiveLogEUpdateProperties {
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface MonthlyArchiveLogEId extends IEntityIdProperties {
    monthNumber: number | IQNumberField;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface MonthlyArchiveLogEOptionalId {
    monthNumber?: number | IQNumberField;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface MonthlyArchiveLogEUpdateProperties extends IEntityUpdateProperties {
    numberOfChanges?: number | IQNumberField;
    daysWithChanges?: any | IQUntypedField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface MonthlyArchiveLogEUpdateColumns extends IEntityUpdateColumns {
    NUMBER_OF_CHANGES?: number | IQNumberField;
    DAYS_WITH_CHANGES?: any | IQUntypedField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface MonthlyArchiveLogECreateProperties extends MonthlyArchiveLogEId, MonthlyArchiveLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MonthlyArchiveLogECreateColumns extends MonthlyArchiveLogEId, MonthlyArchiveLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMonthlyArchiveLog extends QEntity {
    monthNumber: IQNumberField;
    repository: QRepositoryQRelation;
    numberOfChanges: IQNumberField;
    daysWithChanges: IQUntypedField;
}
export interface QMonthlyArchiveLogQId {
    monthNumber: IQNumberField;
    repository: QRepositoryQId;
}
export interface QMonthlyArchiveLogQRelation extends QRelation<QMonthlyArchiveLog>, QMonthlyArchiveLogQId {
}
