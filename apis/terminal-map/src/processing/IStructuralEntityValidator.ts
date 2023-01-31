import { IRepository } from "@airport/ground-control";
import type { IOperationContext } from "./IOperationContext";

export interface IMissingRepositoryRecord {
	record: any
	repositoryPropertyName: string
}

export interface IStructuralEntityValidator {

	validate<E>(
		entities: E[],
		operatedOnEntityIndicator: boolean[],
		missingRepositoryRecords: IMissingRepositoryRecord[],
		topLevelObjectRepositories: IRepository[],
		context: IOperationContext,
	): void

}