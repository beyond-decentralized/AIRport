export abstract class ApiProxy<Api> {

    observableMethodNameSet: Set<string> = new Set()

    private _proxy: Api

    constructor(
        private application: {
            domain: {
                name: string
            },
            name: string
        },
        observableMethodNames: string[]
    ) {
        for(let observableMethodName of observableMethodNames) {
            this.observableMethodNameSet.add(observableMethodName)
        }
    }

    get proxy(): Api {
        // Proxy won't be set by default in UIs, where there is 
        // no dependency injection or the associated 'init()' call
        if (!this._proxy) {
            this.setProxy(globalThis.IOC.getAutopilotApiLoader())
        }

        return this._proxy
    }

    init(): void {
        this.setProxy(
            (this as any).__container__.getSync(globalThis.AUTOPILOT_API_LOADER)
        )
    }

    private setProxy(
        autopilotApiLoader
    ): void {
        this._proxy = autopilotApiLoader.loadApiAutopilot({
            application: this.application,
            descriptor: {
                interface: this.constructor.name
            }
        }, this.observableMethodNameSet)
    }

}