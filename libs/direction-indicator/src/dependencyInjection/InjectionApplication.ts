import { addClasses } from '../classes'
import { IInjectionDomain } from './interfaces/IInjectionDomain'
import { AIRPORT_DOMAIN } from './InjectionDomain'
import {
	GenericDependencyInjectionError,
	IDependencyInjectionToken,
	IDependencyInjectionTokenDescriptor
} from './interfaces/Token'
import {
	DependencyInjectionToken
} from './Token'
import { IInjectionApplication } from './interfaces/IInjectionApplication'

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
		} else {
			let prototype = (input as { new(): any }).prototype
			if (prototype && prototype.constructor) {
				descriptor = {
					class: input,
					interface: prototype.constructor.name
				}
			}
		}

		if (!descriptor.class) {
			descriptor.class = null;
		}

		return descriptor
	}

	public tokenMap: Map<string, IDependencyInjectionToken<any>> = new Map()

	constructor(
		public name: string,
		public domain: IInjectionDomain
	) {
	}

	register(
		...injectedClassesOrInterfaceNames: ({ new(): any } | 'string')[]
	): {
		[tokenName: string]: IDependencyInjectionToken<any>
	} {
		let tokensObject = {}
		for (let injectedClassOrInterfaceName of injectedClassesOrInterfaceNames) {
			const token = this.token(injectedClassOrInterfaceName);
			tokensObject[token.descriptor.interface] = token
		}
		return tokensObject
	}

	setDependencies(
		injectedClass: { new(): any },
		denendencyDescriptor: { [propertyName: string]: { new(): any } }
	): void {
		(injectedClass as any).token.setDependencies(denendencyDescriptor)
	}



	getFullName(): string {
		return `${this.domain.name}/${this.name}`;
	}

	token<T = GenericDependencyInjectionError>(
		input: IDependencyInjectionTokenDescriptor | string | { new(): any },
		failOnExistingToken = true
	): IDependencyInjectionToken<T> {
		const descriptor = InjectionApplication.getTokenDescriptor(input)

		const existingToken = this.tokenMap.get(descriptor.interface)

		if (existingToken) {
			if (failOnExistingToken) {
				throw new Error(`Token with interface '${descriptor.interface}' has already been created`)
			} else {
				return existingToken
			}
		}

		const token = new DependencyInjectionToken(
			this,
			descriptor
		)

		token.setClass(input as { new(): any })

		this.tokenMap.set(descriptor.interface, token)

		if (descriptor.class) {
			token.setClass(descriptor.class)
		}

		return token
	}

	getDomain(
		domainName: string
	): IInjectionDomain {
		return null
	}

}
addClasses([InjectionApplication])

export function lib(
	libraryName: string
): IInjectionApplication {
	return AIRPORT_DOMAIN.app(libraryName)
}

