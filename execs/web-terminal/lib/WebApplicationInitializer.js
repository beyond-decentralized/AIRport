import { container, DI } from "@airport/di";
import { ApplicationInitializer } from "@airport/landing";
import { APPLICATION_INITIALIZER, TERMINAL_STORE } from "@airport/terminal-map";
export class WebApplicationInitializer extends ApplicationInitializer {
    constructor() {
        super(...arguments);
        this.applicationWindowMap = new Map();
    }
    async nativeInitializeApplication(domain, application, fullApplicationName) {
        const terminalStore = await container(this).get(TERMINAL_STORE);
        if (terminalStore.getInitializedApps().has(fullApplicationName)) {
            return;
        }
        let appIframe = document
            .getElementsByName(fullApplicationName);
        if (!appIframe) {
            appIframe = document.createElement('iframe');
            appIframe.src = 'http://' + domain + '/AIRport/apps/'
                + application + '/index.html';
            appIframe.name = fullApplicationName;
            appIframe.style.display = 'none';
            document.body.appendChild(appIframe);
        }
        while (!terminalStore.getInitializedApps().has(fullApplicationName)) {
            await this.wait(100);
        }
        this.applicationWindowMap.set(fullApplicationName, appIframe.contentWindow);
    }
}
DI.set(APPLICATION_INITIALIZER, WebApplicationInitializer);
//# sourceMappingURL=WebApplicationInitializer.js.map