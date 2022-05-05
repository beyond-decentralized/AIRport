export interface IContext {
	lastOUID?: number
	repository?: {
		source: string
		uuId?: string
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

export class Context
	implements IInjectionContext {

	constructor(
		public id: string,
		public type: ContextType
	) {
	}

}
