import { IAirportDatabase } from '@airport/air-control';
import { ISequenceGenerator } from '@airport/check-in';
import { IContext } from '@airport/di';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import { AllDdlObjects, IApplicationInitializer, IQueryObjectInitializer } from '@airport/terminal-map';
import { IApplication } from '@airport/airspace';
export declare abstract class ApplicationInitializer implements IApplicationInitializer {
    addNewApplicationVersionsToAll(ddlObjects: AllDdlObjects): void;
    hydrate(jsonApplications: JsonApplicationWithLastIds[], context: IContext): Promise<void>;
    initialize(jsonApplications: JsonApplicationWithLastIds[], existingApplicationMap: Map<string, IApplication>, context: IContext, checkDependencies: boolean): Promise<void>;
    initializeForAIRportApp(jsonApplication: JsonApplicationWithLastIds): Promise<void>;
    stage(jsonApplications: JsonApplicationWithLastIds[], context: IContext): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]>;
    abstract nativeInitializeApplication(domain: string, application: string, fullApplicationName: string): Promise<void>;
    protected wait(milliseconds: number): Promise<void>;
    private getApplicationsWithValidDependencies;
    private setAirDbApplications;
}
//# sourceMappingURL=ApplicationInitializer.d.ts.map