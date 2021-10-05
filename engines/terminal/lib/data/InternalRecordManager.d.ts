import { IContext } from "@airport/di";
import { DomainName } from "@airport/ground-control";
import { JsonSchemaWithLastIds } from "@airport/security-check";
export interface IInternalRecordManager {
    ensureSchemaRecords(schema: JsonSchemaWithLastIds, context: IContext): Promise<void>;
    initTerminal(domainName: DomainName, context: IContext): Promise<void>;
}
export declare class InternalRecordManager implements IInternalRecordManager {
    ensureSchemaRecords(schema: JsonSchemaWithLastIds, context: IContext): Promise<void>;
    initTerminal(domainName: DomainName, context: IContext): Promise<void>;
}
//# sourceMappingURL=InternalRecordManager.d.ts.map