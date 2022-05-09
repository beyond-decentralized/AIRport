var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Inject, Injected } from '@airport/direction-indicator';
import { ApplicationInitializer } from "@airport/landing";
let WebApplicationInitializer = class WebApplicationInitializer extends ApplicationInitializer {
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
        this.terminalStore.getApplicationInitializer()
            .applicationWindowMap.set(fullApplicationName, appIframe.contentWindow);
        this.terminalStore.getApplicationInitializer()
            .initializingApplicationMap.set(fullApplicationName, false);
    }
};
__decorate([
    Inject()
], WebApplicationInitializer.prototype, "terminalStore", void 0);
WebApplicationInitializer = __decorate([
    Injected()
], WebApplicationInitializer);
export { WebApplicationInitializer };
//# sourceMappingURL=WebApplicationInitializer.js.map