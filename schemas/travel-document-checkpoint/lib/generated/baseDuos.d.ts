import { IDuo, IEntityCascadeGraph, IEntityCreateProperties, IEntityIdProperties, IEntitySelectProperties, IEntityUpdateProperties, IQEntity } from '@airport/air-control';
import { Duo } from "@airport/check-in";
import { EntityId as DbEntityId } from '@airport/ground-control';
import { IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt } from './qagt';
import { ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal } from './qterminal';
import { ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt } from './qterminalagt';
import { IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser } from './quser';
import { IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal } from './quserterminal';
import { IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt } from './quserterminalagt';
export declare class SQDIDuo<Entity, EntitySelect extends IEntitySelectProperties, EntityCreate extends IEntityCreateProperties, EntityUpdateProperties extends IEntityUpdateProperties, EntityId extends IEntityIdProperties, EntityCascadeGraph extends IEntityCascadeGraph, IQE extends IQEntity> extends Duo<Entity, EntitySelect, EntityCreate, EntityUpdateProperties, EntityId, EntityCascadeGraph, IQE> {
    constructor(dbEntityId: DbEntityId);
}
export interface IBaseAgtDuo extends IDuo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt> {
}
export declare class BaseAgtDuo extends SQDIDuo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, AgtECascadeGraph, QAgt> implements IBaseAgtDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalDuo extends IDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> {
}
export declare class BaseTerminalDuo extends SQDIDuo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, TerminalECascadeGraph, QTerminal> implements IBaseTerminalDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseTerminalAgtDuo extends IDuo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt> {
}
export declare class BaseTerminalAgtDuo extends SQDIDuo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, TerminalAgtECascadeGraph, QTerminalAgt> implements IBaseTerminalAgtDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserDuo extends IDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> {
}
export declare class BaseUserDuo extends SQDIDuo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, UserECascadeGraph, QUser> implements IBaseUserDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalDuo extends IDuo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal> {
}
export declare class BaseUserTerminalDuo extends SQDIDuo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, UserTerminalECascadeGraph, QUserTerminal> implements IBaseUserTerminalDuo {
    static diSet(): boolean;
    constructor();
}
export interface IBaseUserTerminalAgtDuo extends IDuo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt> {
}
export declare class BaseUserTerminalAgtDuo extends SQDIDuo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, UserTerminalAgtECascadeGraph, QUserTerminalAgt> implements IBaseUserTerminalAgtDuo {
    static diSet(): boolean;
    constructor();
}
