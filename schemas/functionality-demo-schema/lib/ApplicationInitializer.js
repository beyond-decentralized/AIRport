import { API_REGISTRY, APPLICATION_INITIALIZER } from '@airport/check-in';
import { container, DI, SYSTEM } from '@airport/di';
import { SCHEMA_INITIALIZER } from '@airport/landing';
import { SCHEMA } from './generated/schema';
export class ApplicationInitializer {
    constructor() {
        this.initializing = false;
    }
    async initialize(librarySignature = 'functionality-demo-schema') {
        if (this.initializing) {
            return;
        }
        this.initializing = true;
        DI.db().context.inAIRportApp = true;
        const [apiRegistry, schemaInitializer] = await container(this)
            .get(API_REGISTRY, SCHEMA_INITIALIZER);
        await schemaInitializer.initializeForAIRportApp(SCHEMA);
        apiRegistry.initialize(SCHEMA.versions[0].api);
        SYSTEM.mapLibraryBySignature('functionality-demo-schema', librarySignature);
    }
}
DI.set(APPLICATION_INITIALIZER, ApplicationInitializer);
export function loadApplicationInitializer() {
    console.log('Application Initializer loaded');
}
//# sourceMappingURL=ApplicationInitializer.js.map