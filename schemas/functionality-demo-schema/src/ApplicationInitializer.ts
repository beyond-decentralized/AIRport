import {
    API_REGISTRY,
} from '@airport/check-in'
import { container, DI, SYSTEM } from '@airport/di'
import { SCHEMA_INITIALIZER } from '@airport/landing'
import {
    APPLICATION_INITIALIZER,
    IApplicationInitializer,
    LastIds
} from '@airport/security-check'
import { SCHEMA } from './generated/schema'

export class ApplicationInitializer
    implements IApplicationInitializer {

    private initializing = false

    async initialize(
        lastIds: LastIds,
        librarySignature: string = 'functionality-demo-schema',
    ): Promise<void> {
        if (this.initializing) {
            return
        }
        this.initializing = true

        DI.db().context.inAIRportApp = true

        const [apiRegistry, schemaInitializer] = await container(this)
            .get(API_REGISTRY, SCHEMA_INITIALIZER)

        await schemaInitializer.initializeForAIRportApp(SCHEMA as any)

        apiRegistry.initialize(SCHEMA.versions[0].api)

        SYSTEM.mapLibraryBySignature('functionality-demo-schema', librarySignature)
    }
}
DI.set(APPLICATION_INITIALIZER, ApplicationInitializer)

export function loadApplicationInitializer() {
    console.log('Application Initializer loaded')
}