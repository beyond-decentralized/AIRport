import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IRepositoryTransactionBlock, RepositoryTransactionBlockEId, RepositoryTransactionBlockEOptionalId, RepositoryTransactionBlockESelect, QRepositoryTransactionBlockQId, QRepositoryTransactionBlockQRelation } from './qrepositorytransactionblock';
import { ISchema, SchemaEId, SchemaEOptionalId, SchemaESelect, QSchemaQId, QSchemaQRelation } from '@airport/traffic-pattern';
export interface IRepoTransBlockSchemaToChange {
    repositoryTransactionBlock?: IRepositoryTransactionBlock;
    schema?: ISchema;
    status?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransBlockSchemaToChangeESelect extends IEntitySelectProperties, RepoTransBlockSchemaToChangeEOptionalId, RepoTransBlockSchemaToChangeEUpdateProperties {
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
    status?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockSchemaToChangeEUpdateColumns extends IEntityUpdateColumns {
    STATUS?: number | IQNumberField;
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
export interface QRepoTransBlockSchemaToChange extends QEntity {
    repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
    schema: QSchemaQRelation;
    status: IQNumberField;
}
export interface QRepoTransBlockSchemaToChangeQId {
    repositoryTransactionBlock: QRepositoryTransactionBlockQId;
    schema: QSchemaQId;
}
export interface QRepoTransBlockSchemaToChangeQRelation extends QRelation<QRepoTransBlockSchemaToChange>, QRepoTransBlockSchemaToChangeQId {
}
