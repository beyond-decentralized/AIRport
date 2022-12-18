import { addClasses } from "./classes"

export interface IContext {
	lastOUID?: number
	repository?: {
		source: string
		GUID?: string
	}
	repositoryExistenceChecked?: boolean,
	startedAt?: Date
	[propertyName: string]: any;
}

export interface IInjectionContext
	extends IContext {

	id: string
	type: ContextType
}

export enum ContextType {
	DB = 'DB',
	UI = 'UI'
}
globalThis.ContextType = ContextType

export class Context
	implements IInjectionContext {

	constructor(
		public id: string,
		public type: ContextType
	) {
	}

}
addClasses([Context])
