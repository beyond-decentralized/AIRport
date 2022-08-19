import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { TypeGraph, TypeEId, TypeEOptionalId, TypeESelect, QTypeQId, QTypeQRelation } from '@airport/travel-document-checkpoint';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryTypeESelect extends IEntitySelectProperties, RepositoryTypeEOptionalId {
    repository?: RepositoryESelect;
    type?: TypeESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryTypeEId extends IEntityIdProperties {
    repository: RepositoryEId;
    type: TypeEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryTypeEOptionalId {
    repository?: RepositoryEOptionalId;
    type?: TypeEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryTypeEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryTypeGraph extends RepositoryTypeEOptionalId, IEntityCascadeGraph {
    repository?: RepositoryGraph;
    type?: TypeGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryTypeEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryTypeECreateProperties extends Partial<RepositoryTypeEId>, RepositoryTypeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryTypeECreateColumns extends RepositoryTypeEId, RepositoryTypeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryType<IQE extends QRepositoryType = any> extends IQEntity<IQE | QRepositoryType> {
    repository: QRepositoryQRelation;
    type: QTypeQRelation;
}
export interface QRepositoryTypeQId {
    repository: QRepositoryQId;
    type: QTypeQId;
}
export interface QRepositoryTypeQRelation extends IQRelation<QRepositoryType>, QRepositoryTypeQId {
}
//# sourceMappingURL=qrepositorytype.d.ts.map