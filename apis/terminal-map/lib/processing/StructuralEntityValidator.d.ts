import type { IOperationContext } from "./OperationContext";
export interface IStructuralEntityValidator {
    validate<E>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext): void;
}
//# sourceMappingURL=StructuralEntityValidator.d.ts.map