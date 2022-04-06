import { IAgt } from './agt';
import { AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtGraph, QAgt } from './qagt';
import { IContinent } from './continent';
import { ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent } from './qcontinent';
import { ICountry } from './country';
import { CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry } from './qcountry';
import { ITerminal } from './terminal';
import { TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal } from './qterminal';
import { ITerminalAgt } from './terminalagt';
import { TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtGraph, QTerminalAgt } from './qterminalagt';
import { IUser } from './user';
import { UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser } from './quser';
import { IUserTerminal } from './userterminal';
import { UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal } from './quserterminal';
import { IUserTerminalAgt } from './userterminalagt';
import { UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtGraph, QUserTerminalAgt } from './quserterminalagt';
import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao, DaoQueryDecorators } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseAgtDao extends IDao<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtGraph, QAgt> {
}
export declare class BaseAgtDao extends SQDIDao<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtGraph, QAgt> implements IBaseAgtDao {
    static Find: DaoQueryDecorators<AgtESelect>;
    static FindOne: DaoQueryDecorators<AgtESelect>;
    static Search: DaoQueryDecorators<AgtESelect>;
    static SearchOne: DaoQueryDecorators<AgtESelect>;
    static Save(config: AgtGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseContinentDao extends IDao<IContinent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent> {
}
export declare class BaseContinentDao extends SQDIDao<IContinent, ContinentESelect, ContinentECreateProperties, ContinentEUpdateColumns, ContinentEUpdateProperties, ContinentEId, ContinentGraph, QContinent> implements IBaseContinentDao {
    static Find: DaoQueryDecorators<ContinentESelect>;
    static FindOne: DaoQueryDecorators<ContinentESelect>;
    static Search: DaoQueryDecorators<ContinentESelect>;
    static SearchOne: DaoQueryDecorators<ContinentESelect>;
    static Save(config: ContinentGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseCountryDao extends IDao<ICountry, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry> {
}
export declare class BaseCountryDao extends SQDIDao<ICountry, CountryESelect, CountryECreateProperties, CountryEUpdateColumns, CountryEUpdateProperties, CountryEId, CountryGraph, QCountry> implements IBaseCountryDao {
    static Find: DaoQueryDecorators<CountryESelect>;
    static FindOne: DaoQueryDecorators<CountryESelect>;
    static Search: DaoQueryDecorators<CountryESelect>;
    static SearchOne: DaoQueryDecorators<CountryESelect>;
    static Save(config: CountryGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDao extends IDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> {
}
export declare class BaseTerminalDao extends SQDIDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalGraph, QTerminal> implements IBaseTerminalDao {
    static Find: DaoQueryDecorators<TerminalESelect>;
    static FindOne: DaoQueryDecorators<TerminalESelect>;
    static Search: DaoQueryDecorators<TerminalESelect>;
    static SearchOne: DaoQueryDecorators<TerminalESelect>;
    static Save(config: TerminalGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalAgtDao extends IDao<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtGraph, QTerminalAgt> {
}
export declare class BaseTerminalAgtDao extends SQDIDao<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtGraph, QTerminalAgt> implements IBaseTerminalAgtDao {
    static Find: DaoQueryDecorators<TerminalAgtESelect>;
    static FindOne: DaoQueryDecorators<TerminalAgtESelect>;
    static Search: DaoQueryDecorators<TerminalAgtESelect>;
    static SearchOne: DaoQueryDecorators<TerminalAgtESelect>;
    static Save(config: TerminalAgtGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserDao extends IDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser> {
}
export declare class BaseUserDao extends SQDIDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserGraph, QUser> implements IBaseUserDao {
    static Find: DaoQueryDecorators<UserESelect>;
    static FindOne: DaoQueryDecorators<UserESelect>;
    static Search: DaoQueryDecorators<UserESelect>;
    static SearchOne: DaoQueryDecorators<UserESelect>;
    static Save(config: UserGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalDao extends IDao<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal> {
}
export declare class BaseUserTerminalDao extends SQDIDao<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalGraph, QUserTerminal> implements IBaseUserTerminalDao {
    static Find: DaoQueryDecorators<UserTerminalESelect>;
    static FindOne: DaoQueryDecorators<UserTerminalESelect>;
    static Search: DaoQueryDecorators<UserTerminalESelect>;
    static SearchOne: DaoQueryDecorators<UserTerminalESelect>;
    static Save(config: UserTerminalGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalAgtDao extends IDao<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtGraph, QUserTerminalAgt> {
}
export declare class BaseUserTerminalAgtDao extends SQDIDao<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtGraph, QUserTerminalAgt> implements IBaseUserTerminalAgtDao {
    static Find: DaoQueryDecorators<UserTerminalAgtESelect>;
    static FindOne: DaoQueryDecorators<UserTerminalAgtESelect>;
    static Search: DaoQueryDecorators<UserTerminalAgtESelect>;
    static SearchOne: DaoQueryDecorators<UserTerminalAgtESelect>;
    static Save(config: UserTerminalAgtGraph): PropertyDecorator;
    static diSet(): boolean;
    constructor();
}
//# sourceMappingURL=baseDaos.d.ts.map