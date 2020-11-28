import { IOperationContext } from './OperationContext';
export interface IEntityValidator {
    validate<E, EntityCascadeGraph>(entity: E, operatedOnEntityIndicator: boolean[], ctx: IOperationContext<E, EntityCascadeGraph>): Promise<void>;
}
export declare class EntityValidator {
    validate<E, EntityCascadeGraph>(entities: E[], operatedOnEntityIndicator: boolean[], context: IOperationContext<E, EntityCascadeGraph>): Promise<void>;
}
//# sourceMappingURL=EntityValidator.d.ts.map