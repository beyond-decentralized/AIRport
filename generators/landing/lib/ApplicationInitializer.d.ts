import { IAirportDatabase } from '@airport/air-traffic-control';
import { ISequenceGenerator } from '@airport/check-in';
import { IContext } from '@airport/direction-indicator';
import { JsonApplicationWithLastIds } from '@airport/apron';
import { AllDdlObjects, IApplicationInitializer, IQueryObjectInitializer, ITerminalStore } from '@airport/terminal-map';
import { IApplicationDao } from '@airport/airspace';
import { IApplicationBuilder } from './builder/IApplicationBuilder';
import { IApplicationChecker } from './checker/ApplicationChecker';
import { IApplicationComposer } from './recorder/ApplicationComposer';
import { IApplicationLocator } from './locator/ApplicationLocator';
import { IApplicationRecorder } from './recorder/ApplicationRecorder';
export declare abstract class ApplicationInitializer implements IApplicationInitializer {
    airportDatabase: IAirportDatabase;
    applicationBuilder: IApplicationBuilder;
    applicationChecker: IApplicationChecker;
    applicationComposer: IApplicationComposer;
    applicationDao: IApplicationDao;
    applicationLocator: IApplicationLocator;
    applicationRecorder: IApplicationRecorder;
    queryObjectInitializer: IQueryObjectInitializer;
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