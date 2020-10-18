import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQUntypedField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '../repository/qrepository';
/**
 * SELECT - All fields and relations (optional).
 */
export interface MonthlyArchiveLogESelect extends IEntitySelectProperties, MonthlyArchiveLogEOptionalId {
    numberOfChanges?: number | IQNumberField;
    daysWithChanges?: any | IQUntypedField;
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
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface MonthlyArchiveLogGraph extends IEntitySelectProperties, MonthlyArchiveLogEOptionalId, IEntityCascadeGraph {
    numberOfChanges?: number | IQNumberField;
    daysWithChanges?: any | IQUntypedField;
    repository?: RepositoryGraph;
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
export interface MonthlyArchiveLogECreateProperties extends Partial<MonthlyArchiveLogEId>, MonthlyArchiveLogEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface MonthlyArchiveLogECreateColumns extends MonthlyArchiveLogEId, MonthlyArchiveLogEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QMonthlyArchiveLog extends IQEntity {
    monthNumber: IQNumberField;
    repository: QRepositoryQRelation;
    numberOfChanges: IQNumberField;
    daysWithChanges: IQUntypedField;
}
export interface QMonthlyArchiveLogQId {
    monthNumber: IQNumberField;
    repository: QRepositoryQId;
}
export interface QMonthlyArchiveLogQRelation extends IQRelation<QMonthlyArchiveLog>, QMonthlyArchiveLogQId {
}
//# sourceMappingURL=qmonthlyarchivelog.d.ts.map