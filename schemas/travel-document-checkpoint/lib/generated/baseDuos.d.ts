import { Classification } from '../ddl/type/classification';
import { ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification } from './type/qclassification';
import { Client } from '../ddl/client/client';
import { ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient } from './client/qclient';
import { ClientType } from '../ddl/client/clienttype';
import { ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType } from './client/qclienttype';
import { Continent } from '../ddl/locality/continent';
import { ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent } from './locality/qcontinent';
import { Country } from '../ddl/locality/country';
import { CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry } from './locality/qcountry';
import { Database } from '../ddl/database/database';
import { DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase } from './database/qdatabase';
import { DatabaseType } from '../ddl/database/databasetype';
import { DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType } from './database/qdatabasetype';
import { MetroArea } from '../ddl/locality/metroarea';
import { MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea } from './locality/qmetroarea';
import { MetroAreaState } from '../ddl/locality/metroareastate';
import { MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState } from './locality/qmetroareastate';
import { State } from '../ddl/locality/state';
import { StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState } from './locality/qstate';
import { Terminal } from '../ddl/terminal/terminal';
import { TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal } from './terminal/qterminal';
import { TerminalType } from '../ddl/terminal/terminaltype';
import { TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType } from './terminal/qterminaltype';
import { Type } from '../ddl/type/type';
import { TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType } from './type/qtype';
import { TypeClassification } from '../ddl/type/typeclassification';
import { TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification } from './type/qtypeclassification';
import { UserAccount } from '../ddl/useraccount';
import { UserAccountESelect, UserAccountECreateProperties, UserAccountEUpdateColumns, UserAccountEUpdateProperties, UserAccountEId, UserAccountGraph, QUserAccount } from './quseraccount';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/tarmaq-query';
import { IDuo, Duo } from '@airport/tarmaq-dao';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseClassificationDuo extends IDuo<Classification, ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification> {
}
export declare class BaseClassificationDuo extends SQDIDuo<Classification, ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification> implements IBaseClassificationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseClientDuo extends IDuo<Client, ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient> {
}
export declare class BaseClientDuo extends SQDIDuo<Client, ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient> implements IBaseClientDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseClientTypeDuo extends IDuo<ClientType, ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType> {
}
export declare class BaseClientTypeDuo extends SQDIDuo<ClientType, ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType> implements IBaseClientTypeDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseContinentDuo extends IDuo<Continent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent> {
}
export declare class BaseContinentDuo extends SQDIDuo<Continent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent> implements IBaseContinentDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseCountryDuo extends IDuo<Country, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry> {
}
export declare class BaseCountryDuo extends SQDIDuo<Country, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry> implements IBaseCountryDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDatabaseDuo extends IDuo<Database, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase> {
}
export declare class BaseDatabaseDuo extends SQDIDuo<Database, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase> implements IBaseDatabaseDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseDatabaseTypeDuo extends IDuo<DatabaseType, DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType> {
}
export declare class BaseDatabaseTypeDuo extends SQDIDuo<DatabaseType, DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType> implements IBaseDatabaseTypeDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMetroAreaDuo extends IDuo<MetroArea, MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea> {
}
export declare class BaseMetroAreaDuo extends SQDIDuo<MetroArea, MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea> implements IBaseMetroAreaDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseMetroAreaStateDuo extends IDuo<MetroAreaState, MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState> {
}
export declare class BaseMetroAreaStateDuo extends SQDIDuo<MetroAreaState, MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState> implements IBaseMetroAreaStateDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseStateDuo extends IDuo<State, StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState> {
}
export declare class BaseStateDuo extends SQDIDuo<State, StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState> implements IBaseStateDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDuo extends IDuo<Terminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> {
}
export declare class BaseTerminalDuo extends SQDIDuo<Terminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> implements IBaseTerminalDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalTypeDuo extends IDuo<TerminalType, TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType> {
}
export declare class BaseTerminalTypeDuo extends SQDIDuo<TerminalType, TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType> implements IBaseTerminalTypeDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTypeDuo extends IDuo<Type, TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType> {
}
export declare class BaseTypeDuo extends SQDIDuo<Type, TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType> implements IBaseTypeDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTypeClassificationDuo extends IDuo<TypeClassification, TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification> {
}
export declare class BaseTypeClassificationDuo extends SQDIDuo<TypeClassification, TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification> implements IBaseTypeClassificationDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserAccountDuo extends IDuo<UserAccount, UserAccountESelect, UserAccountECreateProperties, UserAccountEUpdateColumns, UserAccountEUpdateProperties, UserAccountEId, UserAccountGraph, QUserAccount> {
}
export declare class BaseUserAccountDuo extends SQDIDuo<UserAccount, UserAccountESelect, UserAccountECreateProperties, UserAccountEUpdateColumns, UserAccountEUpdateProperties, UserAccountEId, UserAccountGraph, QUserAccount> implements IBaseUserAccountDuo {
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDuos.d.ts.map