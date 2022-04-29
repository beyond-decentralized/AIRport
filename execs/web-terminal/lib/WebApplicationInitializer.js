import { ApplicationInitializer } from "@airport/landing";
export class WebApplicationInitializer extends ApplicationInitializer {
    constructor() {
        super(...arguments);
        this.applicationWindowMap = new Map();
        this.initializingApplicationMap = new Map();
    }
    async nativeInitializeApplication(domain, application, fullApplicationName) {
        if (this.terminalStore.getReceiver().initializedApps
            .has(fullApplicationName)) {
            return;
        }
        let appIframes = document.getElementsByName(fullApplicationName);
        let appIframe;
        if (!appIframes.length) {
            appIframe = document.createElement('iframe');
            appIframe.src = 'http://' + domain + '/AIRport/apps/'
                + application + '/index.html';
            appIframe.name = fullApplicationName;
            appIframe.style.display = 'none';
            document.body.appendChild(appIframe);
        }
        while (!this.terminalStore.getReceiver().initializedApps
            .has(fullApplicationName)) {
            await this.wait(100);
        }
        this.applicationWindowMap.set(fullApplicationName, appIframe.contentWindow);
        this.initializingApplicationMap.set(fullApplicationName, false);
    }
}
//# sourceMappingURL=WebApplicationInitializer.js.map