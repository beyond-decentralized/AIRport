import {
    IApiRegistry,
} from '@airport/check-in'
import {
    IApplicationLoader,
    JsonApplicationWithLastIds,
    LastIds
} from '@airport/apron'
import { Inject, Injected } from '@airport/direction-indicator'
import { IApplicationInitializer } from './core/ApplicationInitializer'
import { ITerminalStore } from './store/TerminalStore'

@Injected()
export class AbstractApplicationLoader
    implements IApplicationLoader {

    @Inject()
    applicationInitializer: IApplicationInitializer

    @Inject()
    terminalStore: ITerminalStore

    @Inject()
    apiRegistry: IApiRegistry

    private initializing = false

    constructor(
        private application: JsonApplicationWithLastIds
    ) {

    }

    async load(
        lastIds: LastIds
    ): Promise<void> {
        if (this.initializing) {
            return
        }
        this.initializing = true

        const lastTerminalState = this.terminalStore.getTerminalState()
        this.terminalStore.state.next({
            ...lastTerminalState,
            lastIds
        })

        await this.applicationInitializer.initializeForAIRportApp(this.application)

        this.apiRegistry.initialize(this.application.versions[0].api)
    }

    async initialize(): Promise<void> {
    }

    getApplication(): JsonApplicationWithLastIds {
        return this.application
    }
}
