import {IInjectionApplication} from './InjectionApplication'

export type IDiTokenName = string

export interface IDiToken<Injectable> {
	
	application: IInjectionApplication
	name: string

	getPath(): string

}

export class DiToken<Injectable>
	implements IDiToken<Injectable> {

	constructor(
		public application: IInjectionApplication,
		public name: string
	) {
	}

	getPath(): string {
		return this.application.domain.name + ':' + this.application.name + ':' + this.name
	}

}

export interface GenericDependencyInjectionError {

	DiTokenMustBeGenerisizedWithTypeOfInjectedObject(): void

}
