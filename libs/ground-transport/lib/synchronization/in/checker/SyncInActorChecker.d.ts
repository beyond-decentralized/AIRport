import { TerminalMessage } from '@airport/arrivals-n-departures';
export interface ISyncInActorChecker {
    ensureActors(message: TerminalMessage): Promise<boolean>;
}
export declare class SyncInActorChecker implements ISyncInActorChecker {
    ensureActors(message: TerminalMessage): Promise<boolean>;
}
//# sourceMappingURL=SyncInActorChecker.d.ts.map