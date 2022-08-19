import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { DatabaseGraph, DatabaseEId, DatabaseEOptionalId, DatabaseESelect, QDatabaseQId, QDatabaseQRelation } from '@airport/travel-document-checkpoint';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryDatabaseESelect extends IEntitySelectProperties, RepositoryDatabaseEOptionalId {
    repository?: RepositoryESelect;
    database?: DatabaseESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryDatabaseEId extends IEntityIdProperties {
    repository: RepositoryEId;
    database: DatabaseEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryDatabaseEOptionalId {
    repository?: RepositoryEOptionalId;
    database?: DatabaseEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryDatabaseEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryDatabaseGraph extends RepositoryDatabaseEOptionalId, IEntityCascadeGraph {
    repository?: RepositoryGraph;
    database?: DatabaseGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryDatabaseEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryDatabaseECreateProperties extends Partial<RepositoryDatabaseEId>, RepositoryDatabaseEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryDatabaseECreateColumns extends RepositoryDatabaseEId, RepositoryDatabaseEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryDatabase<IQE extends QRepositoryDatabase = any> extends IQEntity<IQE | QRepositoryDatabase> {
    repository: QRepositoryQRelation;
    database: QDatabaseQRelation;
}
export interface QRepositoryDatabaseQId {
    repository: QRepositoryQId;
    database: QDatabaseQId;
}
export interface QRepositoryDatabaseQRelation extends IQRelation<QRepositoryDatabase>, QRepositoryDatabaseQId {
}
//# sourceMappingURL=qrepositorydatabase.d.ts.map