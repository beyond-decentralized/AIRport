import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airport/airbridge-validate';
import { UserAccountVDescriptor, TerminalVDescriptor, ClientVDescriptor } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import { ApplicationVDescriptor } from '@airport/airspace';
export interface ActorVDescriptor extends IEntityVDescriptor {
    _localId?: number | IVNumberField;
    GUID?: string | IVStringField;
    userAccount?: UserAccountVDescriptor;
    terminal?: TerminalVDescriptor;
    application?: ApplicationVDescriptor;
    client?: ClientVDescriptor;
}
//# sourceMappingURL=vactor.d.ts.map