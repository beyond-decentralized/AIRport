import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IRepositoryTransactionBlock, RepositoryTransactionBlockEId, RepositoryTransactionBlockEOptionalId, RepositoryTransactionBlockESelect, QRepositoryTransactionBlockQId, QRepositoryTransactionBlockQRelation } from './qrepositorytransactionblock';
import { ISchema, SchemaEId, SchemaEOptionalId, SchemaESelect, QSchemaQId, QSchemaQRelation } from '@airport/traffic-pattern';
export interface IRepoTransBlockSchemasToChange {
    repositoryTransactionBlock?: IRepositoryTransactionBlock;
    schema?: ISchema;
    status?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepoTransBlockSchemasToChangeESelect extends IEntitySelectProperties, RepoTransBlockSchemasToChangeEOptionalId, RepoTransBlockSchemasToChangeEUpdateProperties {
    repositoryTransactionBlock?: RepositoryTransactionBlockESelect;
    schema?: SchemaESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepoTransBlockSchemasToChangeEId extends IEntityIdProperties {
    repositoryTransactionBlock: RepositoryTransactionBlockEId;
    schema: SchemaEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepoTransBlockSchemasToChangeEOptionalId {
    repositoryTransactionBlock?: RepositoryTransactionBlockEOptionalId;
    schema?: SchemaEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepoTransBlockSchemasToChangeEUpdateProperties extends IEntityUpdateProperties {
    status?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepoTransBlockSchemasToChangeEUpdateColumns extends IEntityUpdateColumns {
    STATUS?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepoTransBlockSchemasToChangeECreateProperties extends RepoTransBlockSchemasToChangeEId, RepoTransBlockSchemasToChangeEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepoTransBlockSchemasToChangeECreateColumns extends RepoTransBlockSchemasToChangeEId, RepoTransBlockSchemasToChangeEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepoTransBlockSchemasToChange extends QEntity {
    repositoryTransactionBlock: QRepositoryTransactionBlockQRelation;
    schema: QSchemaQRelation;
    status: IQNumberField;
}
export interface QRepoTransBlockSchemasToChangeQId {
    repositoryTransactionBlock: QRepositoryTransactionBlockQId;
    schema: QSchemaQId;
}
export interface QRepoTransBlockSchemasToChangeQRelation extends QRelation<QRepoTransBlockSchemasToChange>, QRepoTransBlockSchemasToChangeQId {
}
