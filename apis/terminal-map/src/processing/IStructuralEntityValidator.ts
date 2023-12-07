import { IAirEntity, IRepository } from "@airport/ground-control";
import type { IOperationContext } from "./IOperationContext";

export interface IMissingRepositoryRecord {
	record: any
	repositoryPropertyName: string
}

export interface IStructuralEntityValidator {

	validate<E extends IAirEntity>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		topLevelObjectRepositories: IRepository[],
		context: IOperationContext,
	): void

}
