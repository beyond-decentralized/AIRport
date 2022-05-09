import type { IOperationContext } from "./OperationContext";
export interface IMissingRepositoryRecord {
    record: any;
    repositoryPropertyName: string;
}
export interface IStructuralEntityValidator {
    validate<E>(entities: E[], operatedOnEntityIndicator: boolean[], missingRepositoryRecords: IMissingRepositoryRecord[], context: IOperationContext): void;
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map