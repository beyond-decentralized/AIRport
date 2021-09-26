import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQStringField, IQEntity, IQRelation } from '@airport/air-control';
import { RepositoryGraph, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '../repository/qrepository';
import { UserGraph, UserEId, UserEOptionalId, UserESelect, QUserQId, QUserQRelation } from './quser';
import { UserRepository } from '../../ddl/user/UserRepository';
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserRepositoryESelect extends IEntitySelectProperties, UserRepositoryEOptionalId {
    permission?: string | IQStringField;
    repository?: RepositoryESelect;
    user?: UserESelect;
}
/**
 * DELETE - Ids fields and relations only (required).
 */
export interface UserRepositoryEId extends IEntityIdProperties {
    repository: RepositoryEId;
    user: UserEId;
}
/**
 * Ids fields and relations only (optional).
 */
export interface UserRepositoryEOptionalId {
    repository?: RepositoryEOptionalId;
    user?: UserEOptionalId;
}
/**
 * UPDATE - non-id fields and relations (optional).
 */
export interface UserRepositoryEUpdateProperties extends IEntityUpdateProperties {
    permission?: string | IQStringField;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface UserRepositoryGraph extends UserRepositoryEOptionalId, IEntityCascadeGraph {
    permission?: string | IQStringField;
    repository?: RepositoryGraph;
    user?: UserGraph;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserRepositoryEUpdateColumns extends IEntityUpdateColumns {
    PERMISSION?: string | IQStringField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserRepositoryECreateProperties extends Partial<UserRepositoryEId>, UserRepositoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserRepositoryECreateColumns extends UserRepositoryEId, UserRepositoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserRepository extends IQEntity<UserRepository> {
    repository: QRepositoryQRelation;
    user: QUserQRelation;
    permission: IQStringField;
}
export interface QUserRepositoryQId {
    repository: QRepositoryQId;
    user: QUserQId;
}
export interface QUserRepositoryQRelation extends IQRelation<UserRepository, QUserRepository>, QUserRepositoryQId {
}
//# sourceMappingURL=quserrepository.d.ts.map