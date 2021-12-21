import { API_REGISTRY, } from '@airport/check-in';
import { container, DI } from '@airport/di';
import { APPLICATION_INITIALIZER } from '@airport/landing';
import { APPLICATION_LOADER } from '@airport/security-check';
import { DDL_OBJECT_RETRIEVER } from '@airport/takeoff';
import { APPLICATION } from './generated/application';
export class ApplicationLoader {
    constructor() {
        this.initializing = false;
    }
    async load(lastIds) {
        if (this.initializing) {
            return;
        }
        this.initializing = true;
        DI.db().context.inAIRportApp = true;
        const [apiRegistry, ddlObjectRetriever, applicationInitializer] = await container(this)
            .get(API_REGISTRY, DDL_OBJECT_RETRIEVER, APPLICATION_INITIALIZER);
        ddlObjectRetriever.lastIds = lastIds;
        await applicationInitializer.initializeForAIRportApp(APPLICATION);
        apiRegistry.initialize(APPLICATION.versions[0].api);
    }
    getApplication() {
        return APPLICATION;
    }
}
DI.set(APPLICATION_LOADER, ApplicationLoader);
export function loadApplicationInitializer() {
    console.log('Application Initializer loaded');
}
//# sourceMappingURL=ApplicationLoader.js.map