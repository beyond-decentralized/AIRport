import { IOperationContext } from "./OperationContext";

export interface ICascadeGraphVerifier {

	verify<E>(
		entities: E | E[],
		context: IOperationContext,
	): E[]

}