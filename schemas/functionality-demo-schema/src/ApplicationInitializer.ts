import {
    API_REGISTRY,
} from '@airport/check-in'
import { container, DI, SYSTEM } from '@airport/di'
import { APPLICATION_INITIALIZER } from '@airport/landing'
import {
    APPLICATION_INITIALIZER,
    IApplicationInitializer,
    JsonApplicationWithLastIds,
    LastIds
} from '@airport/security-check'
import { DDL_OBJECT_RETRIEVER } from '@airport/takeoff'
import { APPLICATION } from './generated/application'

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

        const [apiRegistry, ddlObjectRetriever, applicationInitializer] = await container(this)
            .get(API_REGISTRY, DDL_OBJECT_RETRIEVER, APPLICATION_INITIALIZER)
        ddlObjectRetriever.lastIds = lastIds

        await applicationInitializer.initializeForAIRportApp(APPLICATION as any)

        apiRegistry.initialize(APPLICATION.versions[0].api)

        SYSTEM.mapLibraryBySignature('functionality-demo-schema', librarySignature)
    }

    getApplication(): JsonApplicationWithLastIds {
        return APPLICATION as any
    }
}
DI.set(APPLICATION_INITIALIZER, ApplicationInitializer)

export function loadApplicationInitializer() {
    console.log('Application Initializer loaded')
}