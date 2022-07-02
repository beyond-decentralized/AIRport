import { Client } from '../ddl/client/client';
import { ClientESelect, ClientECreateProperties, ClientEUpdateColumns, ClientEUpdateProperties, ClientEId, ClientGraph, QClient } from './client/qclient';
import { ClientType } from '../ddl/client/clienttype';
import { ClientTypeESelect, ClientTypeECreateProperties, ClientTypeEUpdateColumns, ClientTypeEUpdateProperties, ClientTypeEId, ClientTypeGraph, QClientType } from './client/qclienttype';
import { Continent } from '../ddl/locality/continent';
import { ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent } from './locality/qcontinent';
import { Country } from '../ddl/locality/country';
import { CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry } from './locality/qcountry';
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
import { User } from '../ddl/user';
import { UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser } from './quser';
import { UserTerminal } from '../ddl/terminal/userterminal';
import { UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal } from './terminal/quserterminal';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-traffic-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
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
export interface IBaseUserDao extends IDao<User, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser> {
}
export declare class BaseUserDao extends SQDIDao<User, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser> implements IBaseUserDao {
    static Find: DaoQueryDecorators<UserESelect>;
    static FindOne: DaoQueryDecorators<UserESelect>;
    static Search: DaoQueryDecorators<UserESelect>;
    static SearchOne: DaoQueryDecorators<UserESelect>;
    static Save(config: UserGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalDao extends IDao<UserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal> {
}
export declare class BaseUserTerminalDao extends SQDIDao<UserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal> implements IBaseUserTerminalDao {
    static Find: DaoQueryDecorators<UserTerminalESelect>;
    static FindOne: DaoQueryDecorators<UserTerminalESelect>;
    static Search: DaoQueryDecorators<UserTerminalESelect>;
    static SearchOne: DaoQueryDecorators<UserTerminalESelect>;
    static Save(config: UserTerminalGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map