import { IInjectionApplication } from "./IInjectionApplication"

export type IDependencyInjectionTokenName = string

export interface ITokenDependencyConfigurationIn {

    [propertyName: string]: IDependencyInjectionToken<any> | { new(): any }

}

export interface ITokenDependencyConfiguration {

    [propertyName: string]: IDependencyInjectionToken<any>

}

export interface IApplicationDescriptor {
    domain: {
        name: string
    }
    name: string
}

export interface IFullDITokenDescriptor {
    application: IApplicationDescriptor
    descriptor: IDependencyInjectionTokenDescriptor
}

export interface IDependencyInjectionTokenDescriptor {
    class?: any,
    interface: string,
    isApi?: boolean
}

export interface IDependencyInjectionToken<Injected> {

    application: IInjectionApplication
    dependencyConfiguration: ITokenDependencyConfiguration
    descriptor: IDependencyInjectionTokenDescriptor,

    getPath(): string

    setDependencies(
        dependencyConfiguration: ITokenDependencyConfigurationIn
    ): void

    setClass(
        aClass: any
    ): void

    getClass(): any

}

export interface GenericDependencyInjectionError {

    DependencyInjectionTokenMustBeGenerisizedWithTypeOfInjectedObject(): void

}