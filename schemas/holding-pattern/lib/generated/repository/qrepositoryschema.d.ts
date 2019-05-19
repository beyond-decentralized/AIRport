import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, IQEntity, IQRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from './qrepository';
export interface IRepositorySchema {
    id?: number;
    repository?: IRepository;
    schemaIndex?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositorySchemaESelect extends IEntitySelectProperties, RepositorySchemaEOptionalId {
    schemaIndex?: number | IQNumberField;
    repository?: RepositoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositorySchemaEId extends IEntityIdProperties {
    id: number | IQNumberField;
    repository: RepositoryEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositorySchemaEOptionalId {
    id?: number | IQNumberField;
    repository?: RepositoryEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositorySchemaEUpdateProperties extends IEntityUpdateProperties {
    schemaIndex?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositorySchemaEUpdateColumns extends IEntityUpdateColumns {
    SCHEMA_INDEX?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositorySchemaECreateProperties extends Partial<RepositorySchemaEId>, RepositorySchemaEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositorySchemaECreateColumns extends RepositorySchemaEId, RepositorySchemaEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepositorySchema extends IQEntity {
    id: IQNumberField;
    repository: QRepositoryQRelation;
    schemaIndex: IQNumberField;
}
export interface QRepositorySchemaQId {
    id: IQNumberField;
    repository: QRepositoryQId;
}
export interface QRepositorySchemaQRelation extends IQRelation<QRepositorySchema>, QRepositorySchemaQId {
}
