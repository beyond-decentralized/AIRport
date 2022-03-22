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
        // TODO: message parent frame with INITIALIZE_DEPENDENCY message
        // and provide IFrameTransactionalConnector with a handle to a state bit
        // IFrameTransactionalConnector should listen for INITIALIZED_DEPENDENCY
        // and flip a session state bit
        // Here a check should be performed for the state bit, once it's ON
        // the method should return.
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
    }
}

DI.set(APPLICATION_INITIALIZER, IFrameApplicationInitializer)
