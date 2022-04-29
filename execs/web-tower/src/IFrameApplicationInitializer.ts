import { FullApplicationName } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/landing";
import {
    IApplicationInitializer
} from "@airport/terminal-map";

export interface IIFrameApplicationInitializer
    extends IApplicationInitializer {

}

export class IFrameApplicationInitializer
    extends ApplicationInitializer {

    applicationWindowMap: Map<FullApplicationName, Window> = new Map()

    async nativeInitializeApplication(
        domain: string,
        application: string,
        fullApplicationName: string,
    ): Promise<void> {
        throw new Error(
            `Application Initialization should be done directly from main AIRport window,
            not from Application child frames`)
    }
}
