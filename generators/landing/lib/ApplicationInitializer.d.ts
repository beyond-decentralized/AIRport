import { IAirportDatabase } from '@airport/air-traffic-control';
import { ISequenceGenerator } from '@airport/check-in';
import { IContext } from '@airport/direction-indicator';
import { IDbApplicationUtils } from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/apron';
import { AllDdlObjects, IApplicationInitializer, IQueryObjectInitializer, ITerminalStore } from '@airport/terminal-map';
import { IApplicationDao } from '@airport/airspace';
import { ISchemaBuilder } from './builder/ISchemaBuilder';
import { IApplicationChecker } from './checker/ApplicationChecker';
import { IApplicationComposer } from './recorder/ApplicationComposer';
import { IApplicationLocator } from './locator/ApplicationLocator';
import { IApplicationRecorder } from './recorder/ApplicationRecorder';
export declare abstract class ApplicationInitializer implements IApplicationInitializer {
    airportDatabase: IAirportDatabase;
    applicationBuilder: ISchemaBuilder;
    applicationChecker: IApplicationChecker;
    applicationComposer: IApplicationComposer;
    applicationDao: IApplicationDao;
    applicationLocator: IApplicationLocator;
    applicationRecorder: IApplicationRecorder;
    dbApplicationUtils: IDbApplicationUtils;
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