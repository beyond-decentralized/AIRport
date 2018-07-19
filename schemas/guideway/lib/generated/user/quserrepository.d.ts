import { IEntityIdProperties, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQNumberField, QEntity, QRelation } from '@airport/air-control';
import { IRepository, RepositoryEId, RepositoryEOptionalId, RepositoryESelect, QRepositoryQId, QRepositoryQRelation } from '../repository/qrepository';
import { IUser, UserEId, UserEOptionalId, UserESelect, QUserQId, QUserQRelation } from './quser';
export interface IUserRepository {
    repository?: IRepository;
    user?: IUser;
    permission?: number;
}
/**
 * SELECT - All fields and relations (optional).
 */
export interface UserRepositoryESelect extends IEntitySelectProperties, UserRepositoryEOptionalId, UserRepositoryEUpdateProperties {
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
    permission?: number | IQNumberField;
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface UserRepositoryEUpdateColumns extends IEntityUpdateColumns {
    PERMISSION?: number | IQNumberField;
}
/**
 * CREATE - id fields and relations (required) and non-id fields and relations (optional).
 */
export interface UserRepositoryECreateProperties extends UserRepositoryEId, UserRepositoryEUpdateProperties {
}
/**
 * CREATE - id columns (required) and non-id columns (optional).
 */
export interface UserRepositoryECreateColumns extends UserRepositoryEId, UserRepositoryEUpdateColumns {
}
/**
 * Query Entity Query Definition (used for Q.EntityName).
 */
export interface QUserRepository extends QEntity {
    repository: QRepositoryQRelation;
    user: QUserQRelation;
    permission: IQNumberField;
}
export interface QUserRepositoryQId {
    repository: QRepositoryQId;
    user: QUserQId;
}
export interface QUserRepositoryQRelation extends QRelation<QUserRepository>, QUserRepositoryQId {
}
