import { JsonApplicationWithLastIds } from "@airport/air-traffic-control";
import { IContext } from "@airport/direction-indicator";

export interface IApplicationInitializer {

    initialize(
        jsonApplications: JsonApplicationWithLastIds[],
        context: IContext,
        checkDependencies: boolean,
        loadExistingApplications: boolean,
        areFeatureApps: boolean
    ): Promise<void>

    initializeForAIRportApp(
        jsonApplication: JsonApplicationWithLastIds
    ): Promise<void>

    isApplicationIsInstalled(
        domain: string,
        fullApplication_Name: string
    ): Promise<boolean>

    ensureApplicationIsInstalled(
        domainName: string,
        applicationName: string
    ): Promise<boolean>

    installApplication(
        domainName: string,
        applicationName: string
    ): Promise<void>

    hydrate(
        jsonApplications: JsonApplicationWithLastIds[],
        context: IContext,
    ): Promise<void>

    nativeInitializeApplication(
        domain: string,
        application: string,
        fullApplication_Name: string,
    ): Promise<void>

    stage(
        jsonApplications: JsonApplicationWithLastIds[],
        context: IContext,
    ): Promise<void>

}
