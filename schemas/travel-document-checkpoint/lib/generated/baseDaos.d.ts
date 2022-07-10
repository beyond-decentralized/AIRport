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
import { UserAccount } from '../ddl/userAccount';
import { UserAccountESelect, UserAccountECreateProperties, UserAccountEUpdateColumns, UserAccountEUpdateProperties, UserAccountEId, UserAccountGraph, QUserAccount } from './quserAccount';
import { IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/tarmaq-query';
import { Dao, IDao, DaoQueryDecorators } from '@airport/tarmaq-dao';
import { ApplicationEntity_LocalId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, ApplicationEntity_LocalId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, ApplicationEntity_LocalId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseClassificationDao extends IDao<Classification, ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification> {
}
export declare class BaseClassificationDao extends SQDIDao<Classification, ClassificationESelect, ClassificationECreateProperties, ClassificationEUpdateColumns, ClassificationEUpdateProperties, ClassificationEId, ClassificationGraph, QClassification> implements IBaseClassificationDao {
    static Find: DaoQueryDecorators<ClassificationESelect>;
    static FindOne: DaoQueryDecorators<ClassificationESelect>;
    static Search: DaoQueryDecorators<ClassificationESelect>;
    static SearchOne: DaoQueryDecorators<ClassificationESelect>;
    static Save(config: ClassificationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseClientDao extends IDao<Client, ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient> {
}
export declare class BaseClientDao extends SQDIDao<Client, ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient> implements IBaseClientDao {
    static Find: DaoQueryDecorators<ClientESelect>;
    static FindOne: DaoQueryDecorators<ClientESelect>;
    static Search: DaoQueryDecorators<ClientESelect>;
    static SearchOne: DaoQueryDecorators<ClientESelect>;
    static Save(config: ClientGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseClientTypeDao extends IDao<ClientType, ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType> {
}
export declare class BaseClientTypeDao extends SQDIDao<ClientType, ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType> implements IBaseClientTypeDao {
    static Find: DaoQueryDecorators<ClientTypeESelect>;
    static FindOne: DaoQueryDecorators<ClientTypeESelect>;
    static Search: DaoQueryDecorators<ClientTypeESelect>;
    static SearchOne: DaoQueryDecorators<ClientTypeESelect>;
    static Save(config: ClientTypeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseContinentDao extends IDao<Continent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent> {
}
export declare class BaseContinentDao extends SQDIDao<Continent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent> implements IBaseContinentDao {
    static Find: DaoQueryDecorators<ContinentESelect>;
    static FindOne: DaoQueryDecorators<ContinentESelect>;
    static Search: DaoQueryDecorators<ContinentESelect>;
    static SearchOne: DaoQueryDecorators<ContinentESelect>;
    static Save(config: ContinentGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseCountryDao extends IDao<Country, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry> {
}
export declare class BaseCountryDao extends SQDIDao<Country, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry> implements IBaseCountryDao {
    static Find: DaoQueryDecorators<CountryESelect>;
    static FindOne: DaoQueryDecorators<CountryESelect>;
    static Search: DaoQueryDecorators<CountryESelect>;
    static SearchOne: DaoQueryDecorators<CountryESelect>;
    static Save(config: CountryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseDatabaseDao extends IDao<Database, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase> {
}
export declare class BaseDatabaseDao extends SQDIDao<Database, DatabaseESelect, DatabaseECreateProperties, DatabaseEUpdateColumns, DatabaseEUpdateProperties, DatabaseEId, DatabaseGraph, QDatabase> implements IBaseDatabaseDao {
    static Find: DaoQueryDecorators<DatabaseESelect>;
    static FindOne: DaoQueryDecorators<DatabaseESelect>;
    static Search: DaoQueryDecorators<DatabaseESelect>;
    static SearchOne: DaoQueryDecorators<DatabaseESelect>;
    static Save(config: DatabaseGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseDatabaseTypeDao extends IDao<DatabaseType, DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType> {
}
export declare class BaseDatabaseTypeDao extends SQDIDao<DatabaseType, DatabaseTypeESelect, DatabaseTypeECreateProperties, DatabaseTypeEUpdateColumns, DatabaseTypeEUpdateProperties, DatabaseTypeEId, DatabaseTypeGraph, QDatabaseType> implements IBaseDatabaseTypeDao {
    static Find: DaoQueryDecorators<DatabaseTypeESelect>;
    static FindOne: DaoQueryDecorators<DatabaseTypeESelect>;
    static Search: DaoQueryDecorators<DatabaseTypeESelect>;
    static SearchOne: DaoQueryDecorators<DatabaseTypeESelect>;
    static Save(config: DatabaseTypeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseMetroAreaDao extends IDao<MetroArea, MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea> {
}
export declare class BaseMetroAreaDao extends SQDIDao<MetroArea, MetroAreaESelect, MetroAreaECreateProperties, MetroAreaEUpdateColumns, MetroAreaEUpdateProperties, MetroAreaEId, MetroAreaGraph, QMetroArea> implements IBaseMetroAreaDao {
    static Find: DaoQueryDecorators<MetroAreaESelect>;
    static FindOne: DaoQueryDecorators<MetroAreaESelect>;
    static Search: DaoQueryDecorators<MetroAreaESelect>;
    static SearchOne: DaoQueryDecorators<MetroAreaESelect>;
    static Save(config: MetroAreaGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseMetroAreaStateDao extends IDao<MetroAreaState, MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState> {
}
export declare class BaseMetroAreaStateDao extends SQDIDao<MetroAreaState, MetroAreaStateESelect, MetroAreaStateECreateProperties, MetroAreaStateEUpdateColumns, MetroAreaStateEUpdateProperties, MetroAreaStateEId, MetroAreaStateGraph, QMetroAreaState> implements IBaseMetroAreaStateDao {
    static Find: DaoQueryDecorators<MetroAreaStateESelect>;
    static FindOne: DaoQueryDecorators<MetroAreaStateESelect>;
    static Search: DaoQueryDecorators<MetroAreaStateESelect>;
    static SearchOne: DaoQueryDecorators<MetroAreaStateESelect>;
    static Save(config: MetroAreaStateGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseStateDao extends IDao<State, StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState> {
}
export declare class BaseStateDao extends SQDIDao<State, StateESelect, StateECreateProperties, StateEUpdateColumns, StateEUpdateProperties, StateEId, StateGraph, QState> implements IBaseStateDao {
    static Find: DaoQueryDecorators<StateESelect>;
    static FindOne: DaoQueryDecorators<StateESelect>;
    static Search: DaoQueryDecorators<StateESelect>;
    static SearchOne: DaoQueryDecorators<StateESelect>;
    static Save(config: StateGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDao extends IDao<Terminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> {
}
export declare class BaseTerminalDao extends SQDIDao<Terminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> implements IBaseTerminalDao {
    static Find: DaoQueryDecorators<TerminalESelect>;
    static FindOne: DaoQueryDecorators<TerminalESelect>;
    static Search: DaoQueryDecorators<TerminalESelect>;
    static SearchOne: DaoQueryDecorators<TerminalESelect>;
    static Save(config: TerminalGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalTypeDao extends IDao<TerminalType, TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType> {
}
export declare class BaseTerminalTypeDao extends SQDIDao<TerminalType, TerminalTypeESelect, TerminalTypeECreateProperties, TerminalTypeEUpdateColumns, TerminalTypeEUpdateProperties, TerminalTypeEId, TerminalTypeGraph, QTerminalType> implements IBaseTerminalTypeDao {
    static Find: DaoQueryDecorators<TerminalTypeESelect>;
    static FindOne: DaoQueryDecorators<TerminalTypeESelect>;
    static Search: DaoQueryDecorators<TerminalTypeESelect>;
    static SearchOne: DaoQueryDecorators<TerminalTypeESelect>;
    static Save(config: TerminalTypeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTypeDao extends IDao<Type, TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType> {
}
export declare class BaseTypeDao extends SQDIDao<Type, TypeESelect, TypeECreateProperties, TypeEUpdateColumns, TypeEUpdateProperties, TypeEId, TypeGraph, QType> implements IBaseTypeDao {
    static Find: DaoQueryDecorators<TypeESelect>;
    static FindOne: DaoQueryDecorators<TypeESelect>;
    static Search: DaoQueryDecorators<TypeESelect>;
    static SearchOne: DaoQueryDecorators<TypeESelect>;
    static Save(config: TypeGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTypeClassificationDao extends IDao<TypeClassification, TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification> {
}
export declare class BaseTypeClassificationDao extends SQDIDao<TypeClassification, TypeClassificationESelect, TypeClassificationECreateProperties, TypeClassificationEUpdateColumns, TypeClassificationEUpdateProperties, TypeClassificationEId, TypeClassificationGraph, QTypeClassification> implements IBaseTypeClassificationDao {
    static Find: DaoQueryDecorators<TypeClassificationESelect>;
    static FindOne: DaoQueryDecorators<TypeClassificationESelect>;
    static Search: DaoQueryDecorators<TypeClassificationESelect>;
    static SearchOne: DaoQueryDecorators<TypeClassificationESelect>;
    static Save(config: TypeClassificationGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserAccountDao extends IDao<UserAccount, UserAccountESelect, UserAccountECreateProperties, UserAccountEUpdateColumns, UserAccountEUpdateProperties, UserAccountEId, UserAccountGraph, QUserAccount> {
}
export declare class BaseUserAccountDao extends SQDIDao<UserAccount, UserAccountESelect, UserAccountECreateProperties, UserAccountEUpdateColumns, UserAccountEUpdateProperties, UserAccountEId, UserAccountGraph, QUserAccount> implements IBaseUserAccountDao {
    static Find: DaoQueryDecorators<UserAccountESelect>;
    static FindOne: DaoQueryDecorators<UserAccountESelect>;
    static Search: DaoQueryDecorators<UserAccountESelect>;
    static SearchOne: DaoQueryDecorators<UserAccountESelect>;
    static Save(config: UserAccountGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map