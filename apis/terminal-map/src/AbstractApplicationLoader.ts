import { IApiRegistry, JsonApplicationWithLastIds, ILastIds } from '@airport/air-traffic-control'
import { IContext, Inject, Injected } from '@airport/direction-indicator'
import { IApplicationInitializer } from './core/IApplicationInitializer'
import { IApplicationLoader } from './application/IApplicationLoader'
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
        lastIds: ILastIds
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

        await this.applicationInitializer.initializeForAIRportApp(
            this.application)

        this.apiRegistry.initialize(this.application.versions[0].api)
    }

    async initialize(): Promise<void> {
    }

    getApplication(): JsonApplicationWithLastIds {
        return this.application
    }
}
