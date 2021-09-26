import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryTransactionBlockGraph, RepositoryTransactionBlockEId, RepositoryTransactionBlockEOptionalId, RepositoryTransactionBlockESelect, QRepositoryTransactionBlockQId, QRepositoryTransactionBlockQRelation } from './qrepositorytransactionblock';
import { SchemaGraph, SchemaEId, SchemaEOptionalId, SchemaESelect, QSchemaQId, QSchemaQRelation } from '@airport/traffic-pattern';
import { RepoTransBlockSchemaToChange } from '../../ddl/repositoryTransactionBlock/RepoTransBlockSchemaToChange';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransBlockSchemaToChangeESelect extends IEntitySelectProperties, RepoTransBlockSchemaToChangeEOptionalId {
    status?: string | IQStringField;
    repositoryTransactionBlock?: RepositoryTransactionBlockESelect;
    schema?: SchemaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransBlockSchemaToChangeEId extends IEntityIdProperties {
    repositoryTransactionBlock: RepositoryTransactionBlockEId;
    schema: SchemaEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransBlockSchemaToChangeEOptionalId {
    repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;
    schema?: SchemaEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransBlockSchemaToChangeEUpdateProperties extends IEntityUpdateProperties {
    status?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepoTransBlockSchemaToChangeGraph extends RepoTransBlockSchemaToChangeEOptionalId, IEntityCascadeGraph {
    status?: string | IQStringField;
    repositoryTransactionBlock?: RepositoryTransactionBlockGraph;
    schema?: SchemaGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockSchemaToChangeEUpdateColumns extends IEntityUpdateColumns {
    STATUS?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransBlockSchemaToChangeECreateProperties extends Partial<RepoTransBlockSchemaToChangeEId>, RepoTransBlockSchemaToChangeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransBlockSchemaToChangeECreateColumns extends RepoTransBlockSchemaToChangeEId, RepoTransBlockSchemaToChangeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransBlockSchemaToChange extends IQEntity<RepoTransBlockSchemaToChange> {
    repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
    schema: QSchemaQRelation;
    status: IQStringField;
}
export interface QRepoTransBlockSchemaToChangeQId {
    repositoryTransactionBlock: QRepositoryTransactionBlockQId;
    schema: QSchemaQId;
}
export interface QRepoTransBlockSchemaToChangeQRelation extends IQRelation<RepoTransBlockSchemaToChange, QRepoTransBlockSchemaToChange>, QRepoTransBlockSchemaToChangeQId {
}
//# sourceMappingURL=qrepotransblockschematochange.d.ts.map