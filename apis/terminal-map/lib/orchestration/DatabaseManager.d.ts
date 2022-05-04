import { IContext } from "@airport/direction-indicator";
import { JsonApplicationWithLastIds } from "@airport/apron";
export interface IDatabaseManager {
    isInitialized(): boolean;
    initWithDb(domainName: string, context: IContext): Promise<void>;
    initNoDb(context: IContext, ...applications: JsonApplicationWithLastIds[]): Promise<void>;
    initFeatureApplications(context: IContext, jsonApplications?: JsonApplicationWithLastIds[]): void;
}
//# sourceMappingURL=DatabaseManager.d.ts.map