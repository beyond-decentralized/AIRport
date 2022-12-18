import { addClasses } from '../classes'
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
		descriptorOrInterfaceName: IDependencyInjectionTokenDescriptor | string | { new(): any },
		autopilot?: boolean
	): IDependencyInjectionToken<T>

}

export class InjectionApplication
	implements IInjectionApplication {

	static getTokenDescriptor(
		input: IDependencyInjectionTokenDescriptor | string | { new(): any },
	): IDependencyInjectionTokenDescriptor {
		let descriptor = input as IDependencyInjectionTokenDescriptor
		if (typeof input === 'string') {
			descriptor = {
				interface: input
			}
		} else if (input.constructor) {
			descriptor = {
				class: input,
				interface: input.constructor.name
			}
		}

		if (!descriptor.class) {
			descriptor.class = null;
		}

		if (!descriptor.token) {
			let token = descriptor.interface.replace(/[A-Z]/g, c => '_' + c);
			token = token.replace(/[a-z0-9]*/g, c => c.toUpperCase())
			if (token.startsWith('_')) {
				token.substring(1, token.length)
			}
			descriptor.token = token
		}

		return

	}

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
		input: IDependencyInjectionTokenDescriptor | string | { new(): any },
	): IDependencyInjectionToken<T> {
		const descriptor = InjectionApplication.getTokenDescriptor(input)

		const existingToken = this.tokenMap.get(descriptor.interface)

		if (existingToken) {
			throw new Error(`Token with name '${descriptor.interface}' has already been created`)
		}

		const diToken = new DependencyInjectionToken(
			this,
			descriptor
		)

		this.tokenMap.set(descriptor.interface, diToken)


		if (descriptor.class) {
			diToken.setClass(descriptor.class)
		}

		return diToken
	}

}
addClasses([InjectionApplication])

export function lib(
	libraryName: string
): IInjectionApplication {
	return AIRPORT_DOMAIN.app(libraryName)
}

