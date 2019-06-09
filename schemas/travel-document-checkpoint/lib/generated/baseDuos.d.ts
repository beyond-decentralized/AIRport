import { IDuo, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt } from './qagt';
import { ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal } from './qterminal';
import { ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt } from './qterminalagt';
import { IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser } from './quser';
import { IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal } from './quserterminal';
import { IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt } from './quserterminalagt';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseAgtDuo extends IDuo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt> {
}
export declare class BaseAgtDuo extends SQDIDuo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt> implements IBaseAgtDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDuo extends IDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}
export declare class BaseTerminalDuo extends SQDIDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> implements IBaseTerminalDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalAgtDuo extends IDuo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt> {
}
export declare class BaseTerminalAgtDuo extends SQDIDuo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt> implements IBaseTerminalAgtDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserDuo extends IDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}
export declare class BaseUserDuo extends SQDIDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> implements IBaseUserDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalDuo extends IDuo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal> {
}
export declare class BaseUserTerminalDuo extends SQDIDuo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal> implements IBaseUserTerminalDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalAgtDuo extends IDuo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt> {
}
export declare class BaseUserTerminalAgtDuo extends SQDIDuo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt> implements IBaseUserTerminalAgtDuo {
    static diSet(): boolean;
    constructor();
}
