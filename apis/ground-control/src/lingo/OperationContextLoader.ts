import { IContext } from "@airport/direction-indicator";

export interface IOperationContextLoader {

	ensure(
		context: IContext
	): Promise<void>

	ensureSync(
		context: IContext
	): void

}