import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import { Application_FullName } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/landing";
import {
    IApplicationInitializer,
    ITerminalStore
} from "@airport/terminal-map";

export interface IWebApplicationInitializer
    extends IApplicationInitializer {

    applicationWindowMap: Map<Application_FullName, Window>

    initializingApplicationMap: Map<Application_FullName, boolean>

}

@Injected()
export class WebApplicationInitializer
    extends ApplicationInitializer {

    @Inject()
    terminalStore: ITerminalStore

    async nativeInitializeApplication(
        domain: string,
        application: string,
        fullApplication_Name: string,
    ): Promise<void> {
        if (this.terminalStore.getReceiver().initializedApps
            .has(fullApplication_Name)) {
            return
        }

        let appIframes = document.getElementsByName(fullApplication_Name);
        let appIframe: HTMLIFrameElement

        if (!appIframes.length) {
            appIframe = document.createElement('iframe') as HTMLIFrameElement
            appIframe.src = 'http://' + domain + '/AIRport/apps/'
                + application + '/index.html'
            appIframe.name = fullApplication_Name
            appIframe.style.display = 'none'
            document.body.appendChild(appIframe)
        } else {
            appIframe = appIframes[0] as HTMLIFrameElement
        }

        while (!this.terminalStore.getReceiver().initializedApps
            .has(fullApplication_Name)) {
            await this.wait(100)
        }

        this.terminalStore.getApplicationInitializer()
            .applicationWindowMap.set(fullApplication_Name, appIframe.contentWindow)
        this.terminalStore.getApplicationInitializer()
            .initializingApplicationMap.set(fullApplication_Name, false)
    }

	protected async isAppLoaded(
		fullApplication_Name: string
	): Promise<boolean> {
        return !!this.terminalStore.getApplicationInitializer()
        .applicationWindowMap.get(fullApplication_Name)
    }
}

