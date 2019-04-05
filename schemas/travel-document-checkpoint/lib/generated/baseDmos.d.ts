import { IDmo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Dmo } from "@airport/check-in";
import { IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt } from './qagt';
import { ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal } from './qterminal';
import { ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt } from './qterminalagt';
import { IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser } from './quser';
import { IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal } from './quserterminal';
import { IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt } from './quserterminalagt';
export declare class SQDIDmo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Dmo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    static diSet(): boolean;
    constructor(dbEntityName: string);
}
export interface IBaseAgtDmo extends IDmo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt> {
}
export declare class BaseAgtDmo extends SQDIDmo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt> implements IBaseAgtDmo {
    constructor();
}
export interface IBaseTerminalDmo extends IDmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}
export declare class BaseTerminalDmo extends SQDIDmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> implements IBaseTerminalDmo {
    constructor();
}
export interface IBaseTerminalAgtDmo extends IDmo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt> {
}
export declare class BaseTerminalAgtDmo extends SQDIDmo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt> implements IBaseTerminalAgtDmo {
    constructor();
}
export interface IBaseUserDmo extends IDmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}
export declare class BaseUserDmo extends SQDIDmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> implements IBaseUserDmo {
    constructor();
}
export interface IBaseUserTerminalDmo extends IDmo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal> {
}
export declare class BaseUserTerminalDmo extends SQDIDmo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal> implements IBaseUserTerminalDmo {
    constructor();
}
export interface IBaseUserTerminalAgtDmo extends IDmo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt> {
}
export declare class BaseUserTerminalAgtDmo extends SQDIDmo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt> implements IBaseUserTerminalAgtDmo {
    constructor();
}
