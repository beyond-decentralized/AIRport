import type { IOperationContext } from "./OperationContext";
export interface IMissingRepositoryRecord {
    record: any;
    repositoryPropertyName: string;
}
export interface IStructuralEntityValidator {
    validate<E>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext): IMissingRepositoryRecord[];
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map