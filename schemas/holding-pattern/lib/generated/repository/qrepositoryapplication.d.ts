import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { RepositoryApplication } from '../../ddl/repository/RepositoryApplication';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryApplicationESelect extends IEntitySelectProperties, RepositoryApplicationEOptionalId {
    applicationIndex?: number | IQNumberField;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryApplicationEId extends IEntityIdProperties {
    id: number | IQNumberField;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryApplicationEOptionalId {
    id?: number | IQNumberField;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryApplicationEUpdateProperties extends IEntityUpdateProperties {
    applicationIndex?: number | IQNumberField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryApplicationGraph extends RepositoryApplicationEOptionalId, IEntityCascadeGraph {
    applicationIndex?: number | IQNumberField;
    repository?: RepositoryGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryApplicationEUpdateColumns extends IEntityUpdateColumns {
    APPLICATION_INDEX?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryApplicationECreateProperties extends Partial<RepositoryApplicationEId>, RepositoryApplicationEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryApplicationECreateColumns extends RepositoryApplicationEId, RepositoryApplicationEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositoryApplication extends IQEntity<RepositoryApplication> {
    id: IQNumberField;
    repository: QRepositoryQRelation;
    applicationIndex: IQNumberField;
}
export interface QRepositoryApplicationQId {
    id: IQNumberField;
    repository: QRepositoryQId;
}
export interface QRepositoryApplicationQRelation extends IQRelation<RepositoryApplication, QRepositoryApplication>, QRepositoryApplicationQId {
}
//# sourceMappingURL=qrepositoryapplication.d.ts.map