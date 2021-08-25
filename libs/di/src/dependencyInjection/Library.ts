import { ISystem, SYSTEM } from './System'
import {
	DiToken,
	GenericDependencyInjectionError,
	IDiToken
} from './Token'

export interface ILibrary {

	autopilot: boolean
	name: string
	signature: string
	system: ISystem
	tokenMap: Map<string, IDiToken<any>>

	token<T = GenericDependencyInjectionError>(
		name: string,
		autopilot?: boolean
	): IDiToken<T>

}

export class Library
	implements ILibrary {

	public signature: string
	public tokenMap: Map<string, IDiToken<any>> = new Map()
	public autopilot = false

	constructor(
		public name: string,
		public system: ISystem
	) {
	}

	setSignature(
		signature: string
	): ILibrary {
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
): ILibrary {
	return SYSTEM.lib(libraryName)
}
