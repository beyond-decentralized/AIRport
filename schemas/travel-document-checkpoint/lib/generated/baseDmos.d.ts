import { IDmo } from "@airport/air-control";
import { Dmo } from "@airport/check-in";
import { IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt } from './qagt';
import { ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal } from './qterminal';
import { ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt } from './qterminalagt';
import { IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser } from './quser';
import { IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal } from './quserterminal';
import { IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt } from './quserterminalagt';
export interface IBaseAgtDmo extends IDmo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt> {
}
export declare class BaseAgtDmo extends Dmo<IAgt, AgtESelect, AgtECreateProperties, AgtEUpdateProperties, AgtEId, QAgt> implements IBaseAgtDmo {
    constructor();
}
export interface IBaseTerminalDmo extends IDmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> {
}
export declare class BaseTerminalDmo extends Dmo<ITerminal, TerminalESelect, TerminalECreateProperties, TerminalEUpdateProperties, TerminalEId, QTerminal> implements IBaseTerminalDmo {
    constructor();
}
export interface IBaseTerminalAgtDmo extends IDmo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt> {
}
export declare class BaseTerminalAgtDmo extends Dmo<ITerminalAgt, TerminalAgtESelect, TerminalAgtECreateProperties, TerminalAgtEUpdateProperties, TerminalAgtEId, QTerminalAgt> implements IBaseTerminalAgtDmo {
    constructor();
}
export interface IBaseUserDmo extends IDmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> {
}
export declare class BaseUserDmo extends Dmo<IUser, UserESelect, UserECreateProperties, UserEUpdateProperties, UserEId, QUser> implements IBaseUserDmo {
    constructor();
}
export interface IBaseUserTerminalDmo extends IDmo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal> {
}
export declare class BaseUserTerminalDmo extends Dmo<IUserTerminal, UserTerminalESelect, UserTerminalECreateProperties, UserTerminalEUpdateProperties, UserTerminalEId, QUserTerminal> implements IBaseUserTerminalDmo {
    constructor();
}
export interface IBaseUserTerminalAgtDmo extends IDmo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt> {
}
export declare class BaseUserTerminalAgtDmo extends Dmo<IUserTerminalAgt, UserTerminalAgtESelect, UserTerminalAgtECreateProperties, UserTerminalAgtEUpdateProperties, UserTerminalAgtEId, QUserTerminalAgt> implements IBaseUserTerminalAgtDmo {
    constructor();
}
