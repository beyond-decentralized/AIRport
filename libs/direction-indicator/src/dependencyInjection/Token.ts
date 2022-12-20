import { addClasses } from '../classes'
import { IInjectionApplication } from './interfaces/IInjectionApplication'
import { IDependencyInjectionToken, IDependencyInjectionTokenDescriptor, IFullDITokenDescriptor, ITokenDependencyConfiguration, ITokenDependencyConfigurationIn } from './interfaces/Token'

export class DependencyInjectionToken<Injected>
	implements IDependencyInjectionToken<Injected> {

	static getPath<Injected>(
		tokenOrFullDescriptor: IDependencyInjectionToken<Injected> | IFullDITokenDescriptor
	): string {
		return tokenOrFullDescriptor.application.domain.name + ':' + tokenOrFullDescriptor.application.name + ':'
			+ tokenOrFullDescriptor.descriptor.token
	}


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
		return DependencyInjectionToken.getPath(this)
	}

	setDependencies(
		dependencyConfiguration: ITokenDependencyConfigurationIn
	): void {
		let tokenBasedDependencyConfiguration: ITokenDependencyConfiguration = {}
		for (let propertyName in dependencyConfiguration) {
			let dependency = dependencyConfiguration[propertyName]
			if (dependency.constructor) {
				let apiClass = dependency as any
				if (!apiClass.token) {
					const applicationDescriptor = apiClass.application
					if (!applicationDescriptor || !applicationDescriptor.name || !applicationDescriptor.domain
						|| !applicationDescriptor.domain.name) {
						throw new Error(`Did not find application descriptor on a @Injected() constructor`)
					}
					this.application.getDomain(applicationDescriptor.domain.name).app(applicationDescriptor.name)
						.register(apiClass)
				}
				dependency = apiClass.token
			}
			tokenBasedDependencyConfiguration[propertyName] = dependency as IDependencyInjectionToken<any>

			if (!(dependency instanceof DependencyInjectionToken)) {
				throw new Error(`Property dependency is not a DependencyInjectionToken or a @Injected() class
	Token:    ${this.getPath}
	Property: ${propertyName}`)
			}
		}
		if (this._dependencyConfiguration) {
			this._dependencyConfiguration = {
				...this._dependencyConfiguration,
				...tokenBasedDependencyConfiguration
			}
		} else {
			this._dependencyConfiguration = tokenBasedDependencyConfiguration
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

	getClass(): any {
		return this.descriptor.class
	}

}
addClasses([DependencyInjectionToken])
