export abstract class ApiProxy<Api> {

    proxy: Api

    constructor(
        application: any
    ) {
        this.proxy = globalThis.IOC.getAutopilotApiLoader().loadApiAutopilot({
            application,
            descriptor: {
                interface: this.constructor.name
            }
        })
    }

}