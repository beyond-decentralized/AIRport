import { IDependencyInjectionToken } from "./Token"
import { IInjectionDomain } from "./IInjectionDomain"
import { GenericDependencyInjectionError, IDependencyInjectionTokenDescriptor } from "./Token"


export interface IInjectionApplication {

	name: string
	domain: IInjectionDomain
	tokenMap: Map<string, IDependencyInjectionToken<any>>

	register(
		...injectedClasses: ({ new(): any } | string)[]
	): {
		[tokenName: string]: IDependencyInjectionToken<any>
	}

	setDependencies(
		injectedClass: { new(): any },
		denendencyDescriptor: { [propertyName: string]: ({ new(): any } | IDependencyInjectionToken<any>) }
	): void

	getFullName(): string

	token<T = GenericDependencyInjectionError>(
		descriptorOrInterfaceName: IDependencyInjectionTokenDescriptor | string | { new(): any },
		failOnExistingToken?: boolean
	): IDependencyInjectionToken<T>

	getDomain(
		domainName: string
	): IInjectionDomain

}