import { ApplicationInitializer } from "@airport/landing";
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
//# sourceMappingURL=IFrameApplicationInitializer.js.map