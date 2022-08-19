import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { ApplicationGraph, ApplicationEId, ApplicationEOptionalId, ApplicationESelect, QApplicationQId, QApplicationQRelation } from '@airport/airspace';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryApplicationESelect extends IEntitySelectProperties, RepositoryApplicationEOptionalId {
    application?: ApplicationESelect;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryApplicationEId extends IEntityIdProperties {
    application: ApplicationEId;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryApplicationEOptionalId {
    application?: ApplicationEOptionalId;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryApplicationEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryApplicationGraph extends RepositoryApplicationEOptionalId, IEntityCascadeGraph {
    application?: ApplicationGraph;
    repository?: RepositoryGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryApplicationEUpdateColumns extends IEntityUpdateColumns {
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
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryApplication<IQE extends QRepositoryApplication = any> extends IQEntity<IQE | QRepositoryApplication> {
    application: QApplicationQRelation;
    repository: QRepositoryQRelation;
}
export interface QRepositoryApplicationQId {
    application: QApplicationQId;
    repository: QRepositoryQId;
}
export interface QRepositoryApplicationQRelation extends IQRelation<QRepositoryApplication>, QRepositoryApplicationQId {
}
//# sourceMappingURL=qrepositoryapplication.d.ts.map