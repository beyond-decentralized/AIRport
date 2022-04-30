import { IDbApplicationBuilder } from '../../../apis/ground-control/lib/lingo/application/builder/DbApplicationBuilder';
import { ILinkingDictionary } from '../../../apis/ground-control/lib/lingo/application/builder/LinkingDictionary';
import { DbApplication, JsonApplication } from '../../../apis/ground-control/lib/lingo/application/Application';
export declare class DbApplicationBuilder implements IDbApplicationBuilder {
    buildDbApplicationWithoutReferences(jsonApplication: JsonApplication, allApplications: DbApplication[], dictionary: ILinkingDictionary): DbApplication;
    /**
     *
     * @param {{[p: string]: DbApplication}} applicationMap
     * @param {{[p: string]: JsonApplication}} jsonApplicationMap
     * @param {ILinkingDictionary} dictionary
     */
    linkDbApplicationsByReferences(applicationMap: {
        [domain: string]: {
            [name: string]: DbApplication;
        };
    }, jsonApplicationMap: {
        [domain: string]: {
            [name: string]: JsonApplication;
        };
    }, dictionary: ILinkingDictionary, failOnMissingMappings?: boolean): void;
    private buildDbEntity;
    private buildDbRelation;
    /**
     * Application loading process at runtime:
     *
     * First the build-in application's run:
     *
     * 1) Traffic Pattern
     * 2) Holding Pattern
     *
     * Then the application for the application being loaded is run, in order of the dependency
     * graph:
     *
     * 3) App application grand-dependency
     * 4) App application dependency
     * 5) Application application
     *
     * Load provided applications
     */
    private buildDbColumn;
}
//# sourceMappingURL=DbApplicationBuilder.d.ts.map