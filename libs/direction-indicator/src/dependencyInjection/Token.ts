import { IInjectionApplication } from './InjectionApplication'

export type IDependencyInjectionTokenName = string

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

	setClass(
		aClass: any
	): void

}

export class DependencyInjectionToken<Injectable>
	implements IDependencyInjectionToken<Injectable> {

	private _dependencyConfiguration: ITokenDependencyConfiguration

	get dependencyConfiguration(): ITokenDependencyConfiguration {
		return this.getInheritedDependencyConfiguration(this.descriptor.class)
	}

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
		if (this._dependencyConfiguration) {
			this._dependencyConfiguration = {
				...this._dependencyConfiguration,
				...dependencyConfiguration
			}
		} else {
			this._dependencyConfiguration = dependencyConfiguration
		}
		if (!this.descriptor.class) {
			return
		}
		if (this.descriptor.class.dependencyConfiguration) {
			this.descriptor.class.dependencyConfiguration = {
				...this.descriptor.class.dependencyConfiguration,
				...dependencyConfiguration
			}
		} else {
			this.descriptor.class.dependencyConfiguration = dependencyConfiguration
		}
	}


	setClass(
		aClass: any
	): void {
		this.descriptor.class = aClass
		aClass.dependencyConfiguration = this._dependencyConfiguration
	}

	private getInheritedDependencyConfiguration(
		aClass: any
	) {
		const parentClass = Object.getPrototypeOf(aClass)
		let returnedDependencyConfiguration = {}
		if (parentClass) {
			returnedDependencyConfiguration = this.getInheritedDependencyConfiguration(parentClass)
		}
		const dependencyConfiguration = aClass.dependencyConfiguration
		if (dependencyConfiguration) {
			returnedDependencyConfiguration = {
				...returnedDependencyConfiguration,
				...dependencyConfiguration
			}
		}

		return returnedDependencyConfiguration
	}

}

export interface GenericDependencyInjectionError {

	DependencyInjectionTokenMustBeGenerisizedWithTypeOfInjectedObject(): void

}
