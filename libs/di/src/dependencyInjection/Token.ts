import {IInjectionApplication} from './InjectionApplication'

export type IDiTokenName = string

export interface ITokenDependencyConfiguration {

	[propertyName: string]: IDiToken<any>

}

export interface IDiToken<Injectable> {
	
	application: IInjectionApplication
	dependencyConfiguration: ITokenDependencyConfiguration
	name: string

	getPath(): string

	setDependencies(
		dependencyConfiguration: ITokenDependencyConfiguration
	): void

}

export class DiToken<Injectable>
	implements IDiToken<Injectable> {

 	dependencyConfiguration: ITokenDependencyConfiguration

	constructor(
		public application: IInjectionApplication,
		public name: string
	) {
	}

	getPath(): string {
		return this.application.domain.name + ':' + this.application.name + ':' + this.name
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
