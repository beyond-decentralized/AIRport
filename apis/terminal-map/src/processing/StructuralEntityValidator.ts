import { IOperationContext } from "./OperationContext";

export interface IStructuralEntityValidator {

	validate<E>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		context: IOperationContext,
	): void

}
