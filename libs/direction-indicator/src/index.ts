import { lib } from './dependencyInjection/InjectionApplication'
import { domain } from './dependencyInjection/InjectionDomain'
import { InversionOfControl } from './dependencyInjection/InversionOfControl'
import { DEPENDENCY_INJECTION } from './dependencyInjection/RootContainer'

export * from './autopilot/IAutopilotApiLoader'
export * from './autopilot/IApiAutopilot'
export * from './dependencyInjection/interfaces/IChildContainer'
export * from './dependencyInjection/interfaces/IContainer'
export * from './dependencyInjection/interfaces/IContainerAccessor'
export * from './dependencyInjection/interfaces/IRootContainer'
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
export * from './tokens'

if (typeof window !== 'undefined') {
    (window as any).DEPENDENCY_INJECTION = DEPENDENCY_INJECTION;
    (window as any).lib = lib;
    (window as any).domain = domain
}

export const IOC: InversionOfControl = new InversionOfControl();