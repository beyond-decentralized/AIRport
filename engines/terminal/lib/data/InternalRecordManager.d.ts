import { IContext } from "@airport/direction-indicator";
import { DomainName, IEntityStateManager } from "@airport/ground-control";
import { IActorDao } from "@airport/holding-pattern";
import { JsonApplicationWithLastIds } from "@airport/security-check";
import { TerminalStore } from "@airport/terminal-map";
import { IDomainDao, IApplicationDao } from "@airport/airspace";
export interface IInternalRecordManager {
    ensureApplicationRecords(application: JsonApplicationWithLastIds, context: IContext): Promise<void>;
    initTerminal(domainName: DomainName, context: IContext): Promise<void>;
}
export declare class InternalRecordManager implements IInternalRecordManager {
    actorDao: IActorDao;
    applicationDao: IApplicationDao;
    domainDao: IDomainDao;
    entityStateManager: IEntityStateManager;
    terminalStore: TerminalStore;
    ensureApplicationRecords(application: JsonApplicationWithLastIds, context: IContext): Promise<void>;
    initTerminal(domainName: DomainName, context: IContext): Promise<void>;
    private updateDomain;
}
//# sourceMappingURL=InternalRecordManager.d.ts.map