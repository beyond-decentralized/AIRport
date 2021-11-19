import type { IOperationContext } from "./OperationContext";

export interface IStructuralEntityValidator {

	validate<E>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		context: IOperationContext,
	): Promise<void>

}
