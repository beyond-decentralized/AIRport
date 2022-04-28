import { IAirportDatabase } from '@airport/air-control';
import { ISequenceGenerator } from '@airport/check-in';
import { IContext } from '@airport/direction-indicator';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import { AllDdlObjects, IApplicationInitializer, ITerminalStore } from '@airport/terminal-map';
export declare abstract class ApplicationInitializer implements IApplicationInitializer {
    airportDatabase: IAirportDatabase;
    sequenceGenerator: ISequenceGenerator;
    terminalStore: ITerminalStore;
    addNewApplicationVersionsToAll(ddlObjects: AllDdlObjects): void;
    hydrate(jsonApplications: JsonApplicationWithLastIds[], context: IContext): Promise<void>;
    initialize(jsonApplications: JsonApplicationWithLastIds[], context: IContext, checkDependencies: boolean, loadExistingApplications: boolean): Promise<void>;
    initializeForAIRportApp(jsonApplication: JsonApplicationWithLastIds): Promise<void>;
    stage(jsonApplications: JsonApplicationWithLastIds[], context: IContext): Promise<void>;
    abstract nativeInitializeApplication(domain: string, application: string, fullApplicationName: string): Promise<void>;
    protected wait(milliseconds: number): Promise<void>;
    private getApplicationsWithValidDependencies;
    private setAirDbApplications;
}
//# sourceMappingURL=ApplicationInitializer.d.ts.map