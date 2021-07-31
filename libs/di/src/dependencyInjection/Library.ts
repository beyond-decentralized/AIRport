import {ISystem} from './System'
import {
	DiToken,
	GenericDependencyInjectionError,
	IDiToken
}                from './Token'

export interface ILibrary {

	uniqueHash: string
	name: string
	system: ISystem
	tokens: IDiToken<any>[]

	token<T = GenericDependencyInjectionError>(
		name: string,
		autopilot?: boolean
	): IDiToken<T>

}

let diTokenSeq = -1

export class Library
	implements ILibrary {

	public uniqueHash: string
	public tokens: IDiToken<any>[] = []

	constructor(
		public name: string,
		public system: ISystem
	) {
	}

	hash(
		uniqueHash: string
	): ILibrary {
		this.uniqueHash = uniqueHash
		return this
	}

	token<T = GenericDependencyInjectionError>(
		name: string,
		autopilot = false
	): IDiToken<T> {
		diTokenSeq++

		const diToken = new DiToken(
			this,
			name,
			diTokenSeq,
			autopilot
		)

		this.tokens.push(diToken)

		return diToken

	}

}

export const AUTOPILOT = true;