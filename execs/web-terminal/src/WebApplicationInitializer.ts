import { FullApplicationName } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/landing";
import {
    IApplicationInitializer,
    ITerminalStore
} from "@airport/terminal-map";

export interface IWebApplicationInitializer
    extends IApplicationInitializer {

    applicationWindowMap: Map<FullApplicationName, Window>

    initializingApplicationMap: Map<FullApplicationName, boolean>

}

export class WebApplicationInitializer
    extends ApplicationInitializer {

    terminalStore: ITerminalStore

    applicationWindowMap: Map<FullApplicationName, Window> = new Map()

    initializingApplicationMap: Map<FullApplicationName, boolean> = new Map()

    async nativeInitializeApplication(
        domain: string,
        application: string,
        fullApplicationName: string,
    ): Promise<void> {
        if (this.terminalStore.getReceiver().initializedApps
            .has(fullApplicationName)) {
            return
        }

        let appIframes = document.getElementsByName(fullApplicationName);
        let appIframe: HTMLIFrameElement

        if (!appIframes.length) {
            appIframe = document.createElement('iframe') as HTMLIFrameElement
            appIframe.src = 'http://' + domain + '/AIRport/apps/'
                + application + '/index.html'
            appIframe.name = fullApplicationName
            appIframe.style.display = 'none'
            document.body.appendChild(appIframe)

        }

        while (!this.terminalStore.getReceiver().initializedApps
            .has(fullApplicationName)) {
            await this.wait(100)
        }

        this.applicationWindowMap.set(fullApplicationName, appIframe.contentWindow)
        this.initializingApplicationMap.set(fullApplicationName, false)
    }
}

