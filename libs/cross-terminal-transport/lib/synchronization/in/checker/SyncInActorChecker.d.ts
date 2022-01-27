import { TerminalName, TerminalSecondId } from '@airport/arrivals-n-departures';
import { ActorId, ActorUuId, IActor } from '@airport/holding-pattern';
import { User_PrivateId } from '@airport/travel-document-checkpoint';
import { IDataToTM } from '../SyncInUtils';
import { TerminalCheckResults } from './SyncInTerminalChecker';
import { UserCheckResults } from './SyncInUserChecker';
export interface ActorCheckResults {
    actorMap: Map<ActorUuId, Map<User_PrivateId, Map<TerminalName, Map<TerminalSecondId, Map<User_PrivateId, IActor>>>>>;
    actorMapById: Map<ActorId, IActor>;
    consistentMessages: IDataToTM[];
    inconsistentMessages: IDataToTM[];
}
export interface ISyncInActorChecker {
    ensureActorsAndGetAsMaps(dataMessages: IDataToTM[], actorMap: Map<User_PrivateId, Map<TerminalName, Map<TerminalSecondId, Map<User_PrivateId, IActor>>>>, actorMapById: Map<ActorId, IActor>, userCheckResults: UserCheckResults, terminalCheckResults: TerminalCheckResults, dataMessagesWithInvalidData: IDataToTM[]): Promise<ActorCheckResults>;
}
export declare class SyncInActorChecker implements ISyncInActorChecker {
    ensureActorsAndGetAsMaps(dataMessages: IDataToTM[], actorMap: Map<User_PrivateId, Map<TerminalName, Map<TerminalSecondId, Map<User_PrivateId, IActor>>>>, actorMapById: Map<ActorId, IActor>, userCheckResults: UserCheckResults, terminalCheckResults: TerminalCheckResults, dataMessagesWithInvalidData: IDataToTM[]): Promise<ActorCheckResults>;
    private areActorIdsConsistentInMessage;
    private updateActorIdsInMessages;
    private getNewActors;
    private addActorToMap;
}
//# sourceMappingURL=SyncInActorChecker.d.ts.map