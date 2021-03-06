import {
	Injected
} from '@airport/direction-indicator'
import { FullApplication_Name } from "@airport/ground-control";
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

    applicationWindowMap: Map<FullApplication_Name, Window> = new Map()

    async nativeInitializeApplication(
        domain: string,
        application: string,
        fullApplication_Name: string,
    ): Promise<void> {
        throw new Error(
            `Application Initialization should be done directly from main AIRport window,
            not from Application child frames`)
    }
}
