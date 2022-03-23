import { DI } from "@airport/di";
import { ApplicationInitializer } from "@airport/landing";
import { APPLICATION_INITIALIZER } from "@airport/terminal-map";
export class IFrameApplicationInitializer extends ApplicationInitializer {
    constructor() {
        super(...arguments);
        this.applicationWindowMap = new Map();
    }
    async nativeInitializeApplication(domain, application, fullApplicationName) {
        throw new Error(`Application Initialization should be done directly from main AIRport window,
            not from Application child frames`);
    }
}
DI.set(APPLICATION_INITIALIZER, IFrameApplicationInitializer);
//# sourceMappingURL=IFrameApplicationInitializer.js.map