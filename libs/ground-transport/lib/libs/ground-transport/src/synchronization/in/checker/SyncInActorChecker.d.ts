import { IUtils } from "@airport/air-control";
import { ActorId, ActorRandomId, IActor, IActorDao, ITerminalDao, TerminalName, TerminalSecondId, UserUniqueId } from "@airport/holding-pattern";
import { IDataToTM } from "../SyncInUtils";
import { TerminalCheckResults } from "./SyncInTerminalChecker";
import { UserCheckResults } from "./SyncInUserChecker";
export interface ActorCheckResults {
    actorMap: Map<ActorRandomId, Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>>;
    actorMapById: Map<ActorId, IActor>;
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
}
export interface ISyncInActorChecker {
    ensureActorsAndGetAsMaps(dataMessages: IDataToTM[], actorMap: Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>, actorMapById: Map<ActorId, IActor>, userCheckResults: UserCheckResults, terminalCheckResults: TerminalCheckResults): Promise<ActorCheckResults>;
}
export declare class SyncInActorChecker implements ISyncInActorChecker {
    private actorDao;
    private terminalDao;
    private utils;
    constructor(actorDao: IActorDao, terminalDao: ITerminalDao, utils: IUtils);
    ensureActorsAndGetAsMaps(dataMessages: IDataToTM[], actorMap: Map<UserUniqueId, Map<TerminalName, Map<TerminalSecondId, Map<UserUniqueId, IActor>>>>, actorMapById: Map<ActorId, IActor>, userCheckResults: UserCheckResults, terminalCheckResults: TerminalCheckResults): Promise<ActorCheckResults>;
    private areActorIdsConsistentInMessage;
    private updateActorIdsInMessages;
    private getNewActors;
    private addActorToMap;
}
