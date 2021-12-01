import { ApplicationName } from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/security-check';
import { AllDdlObjects, IDdlObjectRetriever } from '@airport/takeoff';
import { ITerminalStore } from '@airport/terminal-map';
import { IApplicationVersion } from '@airport/airspace';
import { IApplicationLocator } from '../locator/ApplicationLocator';
export interface IApplicationComposer {
    compose(jsonApplications: JsonApplicationWithLastIds[], ddlObjectRetriever: IDdlObjectRetriever, applicationLocator: IApplicationLocator, terminalStore: ITerminalStore): Promise<AllDdlObjects>;
}
export declare class ApplicationComposer implements IApplicationComposer {
    compose(jsonApplications: JsonApplicationWithLastIds[], ddlObjectRetriever: IDdlObjectRetriever, applicationLocator: IApplicationLocator, terminalStore: ITerminalStore): Promise<AllDdlObjects>;
    getExistingLatestApplicationVersion(referencedApplicationName: ApplicationName, allDdlObjects: AllDdlObjects): Promise<IApplicationVersion>;
    private addApplicationVersionObjects;
    private addObjects;
    private composeDomain;
    private composeApplication;
    private composeApplicationVersion;
    private composeApplicationReferences;
    private composeApplicationEntities;
    private composeApplicationProperties;
    private composeApplicationRelations;
    private composeApplicationColumns;
    private composeApplicationRelationColumns;
}
//# sourceMappingURL=ApplicationComposer.d.ts.map