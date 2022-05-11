import { IInjectionDomain, AIRPORT_DOMAIN } from './InjectionDomain'
import {
	DependencyInjectionToken,
	GenericDependencyInjectionError,
	IDependencyInjectionToken,
	IDependencyInjectionTokenDescriptor
} from './Token'

export interface IInjectionApplication {

	autopilot: boolean
	name: string
	domain: IInjectionDomain
	tokenMap: Map<string, IDependencyInjectionToken<any>>

	getFullName(): string

	token<T = GenericDependencyInjectionError>(
		descriptor: IDependencyInjectionTokenDescriptor,
		autopilot?: boolean
	): IDependencyInjectionToken<T>

}

export class InjectionApplication
	implements IInjectionApplication {

	public tokenMap: Map<string, IDependencyInjectionToken<any>> = new Map()
	public autopilot = false

	constructor(
		public name: string,
		public domain: IInjectionDomain
	) {
	}

	getFullName(): string {
		return `${this.domain.name}/${this.name}`;
	}

	token<T = GenericDependencyInjectionError>(
		descriptor: IDependencyInjectionTokenDescriptor,
	): IDependencyInjectionToken<T> {
		const existingToken = this.tokenMap.get(descriptor.interface)

		if (existingToken) {
			throw new Error(`Token with name '${descriptor.interface}' has already been created`)
		}

		const diToken = new DependencyInjectionToken(
			this,
			descriptor
		)

		this.tokenMap.set(descriptor.interface, diToken)

		return diToken
	}

}

export function lib(
	libraryName: string
): IInjectionApplication {
	return AIRPORT_DOMAIN.app(libraryName)
}
