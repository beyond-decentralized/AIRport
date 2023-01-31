import {
    Inject,
    Injected
} from '@airport/direction-indicator'
import { DbApplication_FullName } from "@airport/ground-control";
import { ApplicationInitializer } from "@airport/takeoff";
import {
    IApplicationInitializer,
    ITerminalStore
} from "@airport/terminal-map";

export interface IWebApplicationInitializer
    extends IApplicationInitializer {

    applicationWindowMap: Map<DbApplication_FullName, Window>

    initializingApplicationMap: Map<DbApplication_FullName, boolean>

}

@Injected()
export class WebApplicationInitializer
    extends ApplicationInitializer {

    @Inject()
    terminalStore: ITerminalStore

    async nativeInitializeApplication(
        domain: string,
        application: string,
        fullDbApplication_Name: string,
    ): Promise<void> {
        if (this.terminalStore.getReceiver().initializedApps
            .has(fullDbApplication_Name)) {
            return
        }

        let appIframes = document.getElementsByName(fullDbApplication_Name);
        let appIframe: HTMLIFrameElement

        if (!appIframes.length) {
            appIframe = document.createElement('iframe') as HTMLIFrameElement
            appIframe.src = 'http://' + domain + '/AIRport/apps/'
                + application + '/index.html'
            appIframe.name = fullDbApplication_Name
            appIframe.style.display = 'none'
            document.body.appendChild(appIframe)
        } else {
            appIframe = appIframes[0] as HTMLIFrameElement
        }

        while (!this.terminalStore.getReceiver().initializedApps
            .has(fullDbApplication_Name)) {
            await this.wait(100)
        }

        this.terminalStore.getApplicationInitializer()
            .applicationWindowMap.set(fullDbApplication_Name, appIframe.contentWindow)
        this.terminalStore.getApplicationInitializer()
            .initializingApplicationMap.set(fullDbApplication_Name, false)
    }

	protected async isAppLoaded(
		fullDbApplication_Name: string
	): Promise<boolean> {
        return !!this.terminalStore.getApplicationInitializer()
        .applicationWindowMap.get(fullDbApplication_Name)
    }
}

