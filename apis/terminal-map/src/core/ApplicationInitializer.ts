import { IContext } from "@airport/direction-indicator";
import { JsonApplicationWithLastIds } from "@airport/apron";

export interface IApplicationInitializer {

    initialize(
        jsonApplications: JsonApplicationWithLastIds[],
        context: IContext,
        checkDependencies: boolean,
        loadExistingApplications: boolean
    ): Promise<void>

    initializeForAIRportApp(
        jsonApplication: JsonApplicationWithLastIds
    ): Promise<void>

    hydrate(
        jsonApplications: JsonApplicationWithLastIds[],
        context: IContext,
    ): Promise<void>

    nativeInitializeApplication(
        domain: string,
        application: string,
        fullApplicationName: string,
    ): Promise<void>

    stage(
        jsonApplications: JsonApplicationWithLastIds[],
        context: IContext,
    ): Promise<void>

}
