import {
    Injected
} from '@airport/direction-indicator'
import { DbApplication_FullName } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/takeoff";
import {
    IApplicationInitializer
} from "@airport/terminal-map";

export interface IIFrameApplicationInitializer
    extends IApplicationInitializer {

}

@Injected()
export class IFrameApplicationInitializer
    extends ApplicationInitializer {

    applicationWindowMap: Map<DbApplication_FullName, Window> = new Map()

    async nativeInitializeApplication(
        domain: string,
        application: string,
        fullDbApplication_Name: string,
    ): Promise<void> {
        throw new Error(
            `Application Initialization should be done directly from main AIRport window,
            not from Application child frames`)
    }

    protected async isAppLoaded(
        fullDbApplication_Name: string
    ): Promise<boolean> {
        throw new Error(
            `Application Initialization should be done directly from main AIRport window,
                not from Application child frames`)
    }
}
