import { IEntityIdProperties, IEntityCascadeGraph, IEntityUpdateColumns, IEntityUpdateProperties, IEntitySelectProperties, IQBooleanField, IQDateField, IQNumberField, IQOneToManyRelation, IQStringField, IQEntity, IQRelation } from '@airport/air-traffic-control';
import { UserGraph, UserEOptionalId, UserESelect, QUserQRelation, ContinentGraph, ContinentEOptionalId, ContinentESelect, QContinentQRelation, CountryGraph, CountryEOptionalId, CountryESelect, QCountryQRelation, StateGraph, StateEOptionalId, StateESelect, QStateQRelation, MetroAreaGraph, MetroAreaEOptionalId, MetroAreaESelect, QMetroAreaQRelation } from '@airport/travel-document-checkpoint';
import { RepositoryTransactionHistoryGraph, RepositoryTransactionHistoryESelect, QRepositoryTransactionHistory } from '../history/qrepositorytransactionhistory';
import { RepositoryApplicationGraph, RepositoryApplicationESelect, QRepositoryApplication } from './qrepositoryapplication';
import { RepositoryClientGraph, RepositoryClientESelect, QRepositoryClient } from './qrepositoryclient';
import { RepositoryDatabaseGraph, RepositoryDatabaseESelect, QRepositoryDatabase } from './qrepositorydatabase';
import { RepositoryTerminalGraph, RepositoryTerminalESelect, QRepositoryTerminal } from './qrepositoryterminal';
import { RepositoryTypeGraph, RepositoryTypeESelect, QRepositoryType } from './qrepositorytype';
/**
 * SELECT - All fields and relations (optional).
 */
export interface RepositoryESelect extends IEntitySelectProperties, RepositoryEOptionalId {
    ageSuitability?: number | IQNumberField;
    createdAt?: Date | IQDateField;
    immutable?: boolean | IQBooleanField;
    source?: string | IQStringField;
    GUID?: string | IQStringField;
    owner?: UserESelect;
    repositoryTransactionHistory?: RepositoryTransactionHistoryESelect;
    continent?: ContinentESelect;
    country?: CountryESelect;
    state?: StateESelect;
    metroArea?: MetroAreaESelect;
    repositoryApplications?: RepositoryApplicationESelect;
    repositoryClients?: RepositoryClientESelect;
    repositoryDatabases?: RepositoryDatabaseESelect;
    repositoryTerminals?: RepositoryTerminalESelect;
    repositoryTypes?: RepositoryTypeESelect;
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
    GUID?: string | IQStringField;
    owner?: UserEOptionalId;
    continent?: ContinentEOptionalId;
    country?: CountryEOptionalId;
    state?: StateEOptionalId;
    metroArea?: MetroAreaEOptionalId;
}
/**
 * PERSIST CASCADE - non-id relations (optional).
 */
export interface RepositoryGraph extends RepositoryEOptionalId, IEntityCascadeGraph {
    ageSuitability?: number | IQNumberField;
    createdAt?: Date | IQDateField;
    immutable?: boolean | IQBooleanField;
    source?: string | IQStringField;
    GUID?: string | IQStringField;
    owner?: UserGraph;
    repositoryTransactionHistory?: RepositoryTransactionHistoryGraph[];
    continent?: ContinentGraph;
    country?: CountryGraph;
    state?: StateGraph;
    metroArea?: MetroAreaGraph;
    repositoryApplications?: RepositoryApplicationGraph[];
    repositoryClients?: RepositoryClientGraph[];
    repositoryDatabases?: RepositoryDatabaseGraph[];
    repositoryTerminals?: RepositoryTerminalGraph[];
    repositoryTypes?: RepositoryTypeGraph[];
}
/**
 * UPDATE - non-id columns (optional).
 */
export interface RepositoryEUpdateColumns extends IEntityUpdateColumns {
    AGE_SUITABILITY?: number | IQNumberField;
    CREATED_AT?: Date | IQDateField;
    IMMUTABLE?: boolean | IQBooleanField;
    SOURCE?: string | IQStringField;
    GUID?: string | IQStringField;
    OWNER_USER_ID?: number | IQNumberField;
    CONTINENT_ID?: number | IQNumberField;
    COUNTRY_ID?: number | IQNumberField;
    STATE_ID?: number | IQNumberField;
    METRO_AREA_ID?: number | IQNumberField;
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
    GUID: IQStringField;
    owner: QUserQRelation;
    repositoryTransactionHistory: IQOneToManyRelation<QRepositoryTransactionHistory>;
    continent: QContinentQRelation;
    country: QCountryQRelation;
    state: QStateQRelation;
    metroArea: QMetroAreaQRelation;
    repositoryApplications: IQOneToManyRelation<QRepositoryApplication>;
    repositoryClients: IQOneToManyRelation<QRepositoryClient>;
    repositoryDatabases: IQOneToManyRelation<QRepositoryDatabase>;
    repositoryTerminals: IQOneToManyRelation<QRepositoryTerminal>;
    repositoryTypes: IQOneToManyRelation<QRepositoryType>;
}
export interface QRepositoryQId {
    id: IQNumberField;
}
export interface QRepositoryQRelation extends IQRelation<QRepository>, QRepositoryQId {
}
//# sourceMappingURL=qrepository.d.ts.map