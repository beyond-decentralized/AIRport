import { IEntityStateManager } from "@airport/pressurization";
export interface IOperationDeserializer {
    deserialize<E, T = E | E[]>(entity: T, entityStateManager: IEntityStateManager): T;
}
//# sourceMappingURL=OperationDeserializer.d.ts.map