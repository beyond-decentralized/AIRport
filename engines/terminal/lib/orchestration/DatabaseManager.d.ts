import { IContext } from '@airport/di';
import { IDatabaseManager } from '@airport/terminal-map';
import { JsonApplicationWithLastIds } from '@airport/security-check';
export declare class DatabaseManager implements IDatabaseManager {
    private initialized;
    initNoDb(context: IContext, ...applications: JsonApplicationWithLastIds[]): Promise<void>;
    initWithDb(domainName: string, context: IContext): Promise<void>;
    isInitialized(): boolean;
    initFeatureApplications(context: IContext, jsonApplications?: JsonApplicationWithLastIds[]): Promise<void>;
    private installStarterApplication;
}
//# sourceMappingURL=DatabaseManager.d.ts.map