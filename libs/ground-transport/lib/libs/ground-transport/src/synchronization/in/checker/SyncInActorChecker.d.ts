import { ActorId, ActorRandomId, TerminalName, TerminalSecondId, IActor, IActorDao, ITerminalDao, UserUniqueId } from "@airport/holding-pattern";
import { IDataToTM } from "../SyncInUtils";
import { IUtils } from "@airport/air-control";
import { UserCheckResults } from "./SyncInUserChecker";
import { TerminalCheckResults } from "./SyncInTerminalChecker";
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
    private areActorIdsConsistentInMessage(message);
    private updateActorIdsInMessages(actorMap, dataMessages);
    private getNewActors(dataMessages, actorMap);
    private addActorToMap(actor, actorMap);
}
