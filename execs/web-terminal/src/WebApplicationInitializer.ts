import {
    container,
    DI
} from "@airport/di";
import { FullApplicationName } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/landing";
import {
    APPLICATION_INITIALIZER,
    IApplicationInitializer,
    TERMINAL_STORE
} from "@airport/terminal-map";

export interface IWebApplicationInitializer
    extends IApplicationInitializer {

    applicationWindowMap: Map<FullApplicationName, Window>

    initializingApplicationMap: Map<FullApplicationName, boolean>

}

export class WebApplicationInitializer
    extends ApplicationInitializer {

    applicationWindowMap: Map<FullApplicationName, Window> = new Map()

    initializingApplicationMap: Map<FullApplicationName, boolean> = new Map()

    async nativeInitializeApplication(
        domain: string,
        application: string,
        fullApplicationName: string,
    ): Promise<void> {
        const terminalStore = await container(this).get(TERMINAL_STORE)
        if (terminalStore.getInitializedApps().has(fullApplicationName)) {
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

        while (!terminalStore.getInitializedApps().has(fullApplicationName)) {
            await this.wait(100)
        }

        this.applicationWindowMap.set(fullApplicationName, appIframe.contentWindow)
        this.initializingApplicationMap.set(fullApplicationName, false)
    }
}

DI.set(APPLICATION_INITIALIZER, WebApplicationInitializer)
