import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQEntity, IQRelation } from '@airport/tarmaq-query';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
import { ClientGraph, ClientEId, ClientEOptionalId, ClientESelect, QClientQId, QClientQRelation } from '@airport/travel-document-checkpoint';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryClientESelect extends IEntitySelectProperties, RepositoryClientEOptionalId {
    repository?: RepositoryESelect;
    client?: ClientESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryClientEId extends IEntityIdProperties {
    repository: RepositoryEId;
    client: ClientEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryClientEOptionalId {
    repository?: RepositoryEOptionalId;
    client?: ClientEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryClientEUpdateProperties extends IEntityUpdateProperties {
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryClientGraph extends RepositoryClientEOptionalId, IEntityCascadeGraph {
    repository?: RepositoryGraph;
    client?: ClientGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryClientEUpdateColumns extends IEntityUpdateColumns {
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryClientECreateProperties extends Partial<RepositoryClientEId>, RepositoryClientEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryClientECreateColumns extends RepositoryClientEId, RepositoryClientEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.ApplicationEntity_Name).
 */
export interface QRepositoryClient extends IQEntity {
    repository: QRepositoryQRelation;
    client: QClientQRelation;
}
export interface QRepositoryClientQId {
    repository: QRepositoryQId;
    client: QClientQId;
}
export interface QRepositoryClientQRelation extends IQRelation<QRepositoryClient>, QRepositoryClientQId {
}
//# sourceMappingURL=qrepositoryclient.d.ts.map