import {
    API_REGISTRY,
} from '@airport/check-in'
import { container, DI } from '@airport/di'
import { APPLICATION_INITIALIZER } from '@airport/terminal-map'
import {
    APPLICATION_LOADER,
    IApplicationLoader,
    JsonApplicationWithLastIds,
    LastIds
} from '@airport/security-check'
import { DDL_OBJECT_RETRIEVER } from '@airport/takeoff'
import { APPLICATION } from './generated/application'
import { DEMO_DATA_LOADER } from './server-tokens'

export class ApplicationLoader
    implements IApplicationLoader {

    private initializing = false

    async load(
        lastIds: LastIds
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
    }

    async initialize(): Promise<void> {
        const demoDataLoader = await container(this).get(DEMO_DATA_LOADER)
        await demoDataLoader.loadDemoData()
    }

    getApplication(): JsonApplicationWithLastIds {
        return APPLICATION as any
    }
}
DI.set(APPLICATION_LOADER, ApplicationLoader)

export function wireApplicationLoader() {
    console.log('ApplicationLoader wired')
}