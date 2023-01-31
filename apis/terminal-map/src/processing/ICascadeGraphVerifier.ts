import { IOperationContext } from "./IOperationContext";

export interface ICascadeGraphVerifier {

	verify<E>(
		entities: E | E[],
		context: IOperationContext,
	): E[]

}