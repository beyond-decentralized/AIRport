import { IDao, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateColumns, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dao } from '@airport/check-in';
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IAgt, AgtESelect, AgtECascadeGraph, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, QAgt } from './qagt';
import { ITerminal, TerminalESelect, TerminalECascadeGraph, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, QTerminal } from './qterminal';
import { ITerminalAgt, TerminalAgtESelect, TerminalAgtECascadeGraph, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt } from './qterminalagt';
import { IUser, UserESelect, UserECascadeGraph, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, QUser } from './quser';
import { IUserTerminal, UserTerminalESelect, UserTerminalECascadeGraph, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal } from './quserterminal';
import { IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECascadeGraph, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt } from './quserterminalagt';
export declare class SQDIDao<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateColumns extends IEntityUpdateColumns, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Dao<Entity, EntitySelect, EntityCreate, EntityUpdateColumns, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseAgtDao extends IDao<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt> {
}
export declare class BaseAgtDao extends SQDIDao<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateColumns, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt> implements IBaseAgtDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDao extends IDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> {
}
export declare class BaseTerminalDao extends SQDIDao<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateColumns, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> implements IBaseTerminalDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalAgtDao extends IDao<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt> {
}
export declare class BaseTerminalAgtDao extends SQDIDao<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateColumns, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt> implements IBaseTerminalAgtDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserDao extends IDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> {
}
export declare class BaseUserDao extends SQDIDao<IUser, UserESelect, UserECreateProperties, UserEUpdateColumns, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> implements IBaseUserDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalDao extends IDao<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal> {
}
export declare class BaseUserTerminalDao extends SQDIDao<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateColumns, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal> implements IBaseUserTerminalDao {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalAgtDao extends IDao<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt> {
}
export declare class BaseUserTerminalAgtDao extends SQDIDao<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateColumns, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt> implements IBaseUserTerminalAgtDao {
    static diSet(): boolean;
    constructor();
}
