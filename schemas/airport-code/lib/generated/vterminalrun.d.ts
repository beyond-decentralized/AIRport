import { IEntityVDescriptor, IVNumberField } from '@airport/airbridge-validate';
export interface TerminalRunVDescriptor extends IEntityVDescriptor {
    _localId: number | IVNumberField;
    createTimestamp?: number | IVNumberField;
    randomNumber?: number | IVNumberField;
}
//# sourceMappingURL=vterminalrun.d.ts.map