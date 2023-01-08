import {
    Injected
} from '@airport/direction-indicator'
import { Application_FullName } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/landing";
import {
    IApplicationInitializer
} from "@airport/terminal-map";

export interface IIFrameApplicationInitializer
    extends IApplicationInitializer {

}

@Injected()
export class IFrameApplicationInitializer
    extends ApplicationInitializer {

    applicationWindowMap: Map<Application_FullName, Window> = new Map()

    async nativeInitializeApplication(
        domain: string,
        application: string,
        fullApplication_Name: string,
    ): Promise<void> {
        throw new Error(
            `Application Initialization should be done directly from main AIRport window,
            not from Application child frames`)
    }

    protected async isAppLoaded(
        fullApplication_Name: string
    ): Promise<boolean> {
        throw new Error(
            `Application Initialization should be done directly from main AIRport window,
                not from Application child frames`)
    }
}
