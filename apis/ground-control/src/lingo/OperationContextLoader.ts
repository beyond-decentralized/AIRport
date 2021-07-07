import { IContext } from "@airport/di";

export interface IOperationContextLoader {
	ensure(
		context: IContext
	): Promise<void>
}