import {ILibrary} from './Library'

export type IDiTokenName = string

export interface IDiToken<Injectable> {
	library: ILibrary
	name: string
	sequence: number
	autopilot: boolean

	getPath(): string
}

export class DiToken<Injectable>
	implements IDiToken<Injectable> {

	constructor(
		public library: ILibrary,
		public name: string,
		public sequence: number,
		public autopilot = false
	) {
	}

	getPath(): string {
		return this.library.system.name + ':' + this.library.name + ':' + this.name
	}

}

export interface GenericDependencyInjectionError {

	DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void

}
