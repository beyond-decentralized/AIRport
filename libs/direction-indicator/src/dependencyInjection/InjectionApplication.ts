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

	static getTokenName(
		className: string
	): string {
		let tokenName = className.replace(/[A-Z]/g, c => '_' + c);
		tokenName = tokenName.replace(/[a-z0-9]*/g, c => c.toUpperCase())
		if (tokenName.startsWith('_')) {
			tokenName.substring(1, tokenName.length)
		}
		return tokenName
	}

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
			descriptor.token = InjectionApplication.getTokenName(descriptor.interface)
		}

		return

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
			if (injectedClassOrInterfaceName.constructor) {
				(injectedClassOrInterfaceName as any).token = token
			}
			tokensObject[token.descriptor.token] = token
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
				throw new Error(`Token with name '${descriptor.interface}' has already been created`)
			} else {
				return existingToken
			}
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

