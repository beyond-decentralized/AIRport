import { IEntityVDescriptor, IVNumberField } from '@airbridge/validate';
export interface TerminalRunVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    createTimestamp?: number | IVNumberField;
    randomNumber?: number | IVNumberField;
}
//# sourceMappingURL=vterminalrun.d.ts.map