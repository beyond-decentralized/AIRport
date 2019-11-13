import {ISystem} from './System'
import {
	DiToken,
	GenericDependencyInjectionError,
	IDiToken
}                from './Token'

export interface ILibrary {

	name: string
	system: ISystem
	tokens: IDiToken<any>[]

	mark<T = GenericDependencyInjectionError>(): IDiToken<T>

}

let diTokenSeq = -1

export class Library
	implements ILibrary {

	public tokens: IDiToken<any>[] = []

	constructor(
		public name: string,
		public system: ISystem
	) {
	}

	mark<T = GenericDependencyInjectionError>(): IDiToken<T> {
		diTokenSeq++

		const diToken = new DiToken(
			this,
			diTokenSeq
		)

		this.tokens.push(diToken)

		return diToken

	}

}
