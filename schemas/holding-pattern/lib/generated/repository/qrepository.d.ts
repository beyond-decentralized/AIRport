import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQDateField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation } from '@airport/travel-document-checkpoint';
import { RepositoryTransactionHistoryGraph, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistory } from '../history/qrepositorytransactionhistory';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect extends IEntitySelectProperties, RepositoryEOptionalId {
    ageSuitability?: number | IQNumberField;
    createdAt?: Date | IQDateField;
    immutable?: boolean | IQBooleanField;
    source?: string | IQStringField;
    uuId?: string | IQStringField;
    owner?: UserESelect;
    repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface RepositoryEId extends IEntityIdProperties {
    id: number | IQNumberField;
}
/**
 * Ids fields and relations only (optional).
 */
export interface RepositoryEOptionalId {
    id?: number | IQNumberField;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface RepositoryEUpdateProperties extends IEntityUpdateProperties {
    ageSuitability?: number | IQNumberField;
    createdAt?: Date | IQDateField;
    immutable?: boolean | IQBooleanField;
    source?: string | IQStringField;
    uuId?: string | IQStringField;
    owner?: UserEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryGraph extends RepositoryEOptionalId, IEntityCascadeGraph {
    ageSuitability?: number | IQNumberField;
    createdAt?: Date | IQDateField;
    immutable?: boolean | IQBooleanField;
    source?: string | IQStringField;
    uuId?: string | IQStringField;
    owner?: UserGraph;
    repositoryTransactionHistory?: RepositoryTransactionHistoryGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns extends IEntityUpdateColumns {
    AGE_SUITABILITY?: number | IQNumberField;
    CREATED_AT?: Date | IQDateField;
    IMMUTABLE?: boolean | IQBooleanField;
    SOURCE?: string | IQStringField;
    UU_ID?: string | IQStringField;
    OWNER_USER_ID?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface RepositoryECreateProperties extends Partial<RepositoryEId>, RepositoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface RepositoryECreateColumns extends RepositoryEId, RepositoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QRepository extends IQEntity {
    id: IQNumberField;
    ageSuitability: IQNumberField;
    createdAt: IQDateField;
    immutable: IQBooleanField;
    source: IQStringField;
    uuId: IQStringField;
    owner: QUserQRelation;
    repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;
}
export interface QRepositoryQId {
    id: IQNumberField;
}
export interface QRepositoryQRelation extends IQRelation<QRepository>, QRepositoryQId {
}
//# sourceMappingURL=qrepository.d.ts.map