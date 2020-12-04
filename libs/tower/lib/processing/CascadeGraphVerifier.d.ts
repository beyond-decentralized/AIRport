import { IOperationContext } from './OperationContext';
export interface ICascadeGraphVerifier {
    verify<E, EntityCascadeGraph>(entities: E | E[], context: IOperationContext<E, EntityCascadeGraph>): E[];
}
export declare class CascadeGraphVerifier implements ICascadeGraphVerifier {
    verify<E, EntityCascadeGraph>(root: E | E[], context: IOperationContext<E, EntityCascadeGraph>): E[];
}
//# sourceMappingURL=CascadeGraphVerifier.d.ts.map