import { FullApplicationName, IDbApplicationUtils } from '@airport/ground-control';
import { JsonApplicationWithLastIds } from '@airport/apron';
import { AllDdlObjects, IDomainRetriever, ITerminalStore } from '@airport/terminal-map';
import { IApplicationVersion } from '@airport/airspace';
import { IApplicationLocator } from '../locator/ApplicationLocator';
export interface IApplicationComposer {
    compose(jsonApplications: JsonApplicationWithLastIds[], context: IApplicationComposerContext): Promise<AllDdlObjects>;
}
export interface IApplicationComposerContext {
    terminalStore: ITerminalStore;
    deepTraverseReferences?: boolean;
}
export declare class ApplicationComposer implements IApplicationComposer {
    applicationLocator: IApplicationLocator;
    dbApplicationUtils: IDbApplicationUtils;
    domainRetriever: IDomainRetriever;
    terminalStore: ITerminalStore;
    compose(jsonApplications: JsonApplicationWithLastIds[], context: IApplicationComposerContext): Promise<AllDdlObjects>;
    getExistingLatestApplicationVersion(referencedApplicationName: FullApplicationName, allDdlObjects: AllDdlObjects): Promise<IApplicationVersion>;
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