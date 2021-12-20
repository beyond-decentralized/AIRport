import { IInjectionDomain, AIRPORT_DOMAIN } from './InjectionDomain'
import {
	DiToken,
	GenericDependencyInjectionError,
	IDiToken
} from './Token'

export interface IInjectionApplication {

	autopilot: boolean
	name: string
	signature: string
	domain: IInjectionDomain
	tokenMap: Map<string, IDiToken<any>>

	token<T = GenericDependencyInjectionError>(
		name: string,
		autopilot?: boolean
	): IDiToken<T>

}

export class InjectionApplication
	implements IInjectionApplication {

	public signature: string
	public tokenMap: Map<string, IDiToken<any>> = new Map()
	public autopilot = false

	constructor(
		public name: string,
		public domain: IInjectionDomain
	) {
	}

	setSignature(
		signature: string
	): IInjectionApplication {
		this.signature = signature
		this.autopilot = true
		return this
	}

	token<T = GenericDependencyInjectionError>(
		name: string,
	): IDiToken<T> {
		const existingToken = this.tokenMap.get(name)

		if (existingToken) {
			throw new Error(`Token with name '${name}' has already been created`)
		}

		const diToken = new DiToken(
			this,
			name
		)

		this.tokenMap.set(name, diToken)

		return diToken
	}

}

export function lib(
	libraryName: string
): IInjectionApplication {
	return AIRPORT_DOMAIN.app(libraryName)
}
