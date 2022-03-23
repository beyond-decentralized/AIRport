import { IAirportDatabase } from "@airport/air-control";
import { IApplication } from "@airport/airspace";
import { ISequenceGenerator } from "@airport/check-in";
import { IContext } from "@airport/di";
import { JsonApplicationWithLastIds } from "@airport/security-check";
import { IQueryObjectInitializer } from "./QueryObjectInitializer";

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
    ): Promise<[IAirportDatabase, IQueryObjectInitializer, ISequenceGenerator]>

}
