import { IContext } from "@airport/di";
import { DomainName } from "@airport/ground-control";
import { JsonApplicationWithLastIds } from "@airport/security-check";
export interface IInternalRecordManager {
    ensureApplicationRecords(application: JsonApplicationWithLastIds, context: IContext): Promise<void>;
    initTerminal(domainName: DomainName, context: IContext): Promise<void>;
}
export declare class InternalRecordManager implements IInternalRecordManager {
    ensureApplicationRecords(application: JsonApplicationWithLastIds, context: IContext): Promise<void>;
    initTerminal(domainName: DomainName, context: IContext): Promise<void>;
    private updateDomain;
}
//# sourceMappingURL=InternalRecordManager.d.ts.map