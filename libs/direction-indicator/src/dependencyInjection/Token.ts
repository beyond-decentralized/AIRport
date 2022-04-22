import { IInjectionApplication } from './InjectionApplication'

export type IDiTokenName = string

export interface ITokenDependencyConfiguration {

	[propertyName: string]: IDependencyInjectionToken<any>

}

export interface IDependencyInjectionTokenDescriptor {
	class: any,
	interface: string,
	token: string,
	isApi?: boolean
}

export interface IDependencyInjectionToken<Injectable> {

	application: IInjectionApplication
	dependencyConfiguration: ITokenDependencyConfiguration
	descriptor: IDependencyInjectionTokenDescriptor,

	getPath(): string

	setDependencies(
		dependencyConfiguration: ITokenDependencyConfiguration
	): void

}

export class DependencyInjectionToken<Injectable>
	implements IDependencyInjectionToken<Injectable> {

	dependencyConfiguration: ITokenDependencyConfiguration

	constructor(
		public application: IInjectionApplication,
		public descriptor: IDependencyInjectionTokenDescriptor
	) {
	}

	getPath(): string {
		return this.application.domain.name + ':' + this.application.name + ':'
			+ this.descriptor.token
	}

	setDependencies(
		dependencyConfiguration: ITokenDependencyConfiguration
	): void {
		this.dependencyConfiguration = dependencyConfiguration
	}

}

export interface GenericDependencyInjectionError {

	DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void

}
