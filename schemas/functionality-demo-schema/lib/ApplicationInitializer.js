import { API_REGISTRY, } from '@airport/check-in';
import { container, DI, SYSTEM } from '@airport/di';
import { SCHEMA_INITIALIZER } from '@airport/landing';
import { APPLICATION_INITIALIZER } from '@airport/security-check';
import { DDL_OBJECT_RETRIEVER } from '@airport/takeoff';
import { SCHEMA } from './generated/schema';
export class ApplicationInitializer {
    constructor() {
        this.initializing = false;
    }
    async initialize(lastIds, librarySignature = 'functionality-demo-schema') {
        if (this.initializing) {
            return;
        }
        this.initializing = true;
        DI.db().context.inAIRportApp = true;
        const [apiRegistry, ddlObjectRetriever, schemaInitializer] = await container(this)
            .get(API_REGISTRY, DDL_OBJECT_RETRIEVER, SCHEMA_INITIALIZER);
        ddlObjectRetriever.lastIds = lastIds;
        await schemaInitializer.initializeForAIRportApp(SCHEMA);
        apiRegistry.initialize(SCHEMA.versions[0].api);
        SYSTEM.mapLibraryBySignature('functionality-demo-schema', librarySignature);
    }
    getSchema() {
        return SCHEMA;
    }
}
DI.set(APPLICATION_INITIALIZER, ApplicationInitializer);
export function loadApplicationInitializer() {
    console.log('Application Initializer loaded');
}
//# sourceMappingURL=ApplicationInitializer.js.map