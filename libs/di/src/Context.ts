export interface IContext {

	name: string
	type: ContextType

}

export enum ContextType {
	DB,
	UI
}

export class Context
	implements IContext {

	constructor(
		public name: string,
		public type: ContextType
	) {
	}

}
