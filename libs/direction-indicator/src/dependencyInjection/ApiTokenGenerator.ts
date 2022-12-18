import { addClasses } from "../classes"
import { Injected } from "./decorators"
import { InjectionApplication } from "./InjectionApplication"
import { domain } from "./InjectionDomain"

@Injected()
export class ApiTokenGenerator {

    generateTokens() {
        if (!globalThis.AIRPORT_APIS) {
            console.info('No AIRport APIs defined, not generating tokens')
            return
        }
        for (const apiDescriptor of globalThis.AIRPORT_APIS) {
            const appDescriptor = apiDescriptor.application
            apiDescriptor.tokens = {}
            const app = domain(appDescriptor.domain.name).app(appDescriptor.name)
            for (const api of apiDescriptor.apis) {
                let tokenName = InjectionApplication.getTokenName(api.constructor.name)
                apiDescriptor.tokens[tokenName] = app.token(api)
            }
        }
    }
}
addClasses([ApiTokenGenerator])

export function generateTokens() {
    new ApiTokenGenerator().generateTokens()
}