import {ILibrary} from './Library'

export interface IDiToken<Injectable> {
	library: ILibrary
	sequence: number
}

export class DiToken<Injectable>
	implements IDiToken<Injectable> {

	constructor(
		public library: ILibrary,
		public sequence: number
	) {
	}

}

export interface GenericDependencyInjectionError {

	DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void

}
