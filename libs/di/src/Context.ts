export interface IContext {
	startedAt?: Date
	[propertyName: string]: any;
}

export interface IInjectionContext
	extends IContext {
	name: string
	type: ContextType
}

export enum ContextType {
	DB,
	UI
}

export class Context
	implements IInjectionContext {

	constructor(
		public name: string,
		public type: ContextType
	) {
	}

}
