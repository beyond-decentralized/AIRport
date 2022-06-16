import { Continent } from '../ddl/continent';
import { ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent } from './qcontinent';
import { Country } from '../ddl/country';
import { CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry } from './qcountry';
import { Terminal } from '../ddl/terminal';
import { TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal } from './qterminal';
import { User } from '../ddl/user';
import { UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser } from './quser';
import { UserTerminal } from '../ddl/userterminal';
import { UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal } from './quserterminal';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-traffic-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
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