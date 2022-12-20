import { InversionOfControl } from './dependencyInjection/InversionOfControl'

export * from './classes'
export * from './autopilot/IAutopilotApiLoader'
export * from './autopilot/IApiAutopilot'
export * from './dependencyInjection/interfaces/IChildContainer'
export * from './dependencyInjection/interfaces/IContainer'
export * from './dependencyInjection/interfaces/IContainerAccessor'
export * from './dependencyInjection/interfaces/IInjectionApplication'
export * from './dependencyInjection/interfaces/IInjectionDomain'
export * from './dependencyInjection/interfaces/IRootContainer'
export * from './dependencyInjection/interfaces/Token'
export * from './dependencyInjection/ChildContainer'
export * from './dependencyInjection/Container'
export * from './dependencyInjection/ContainerAccessor'
export * from './dependencyInjection/decorators'
export * from './dependencyInjection/Injected'
export * from './dependencyInjection/InjectionApplication'
export * from './dependencyInjection/InjectionDomain'
export * from './dependencyInjection/InterAppAPIClient'
export * from './dependencyInjection/InversionOfControl'
export * from './dependencyInjection/RootContainer'
export * from './dependencyInjection/Token'
export * from './Context'
export * from './extend'
export * from './injection'

let inversionOfControl: InversionOfControl
if (globalThis.IOC) {
    inversionOfControl = globalThis.IOC
} else {
    inversionOfControl = new InversionOfControl()
    globalThis.IOC = inversionOfControl
}
export const IOC: InversionOfControl = inversionOfControl;
