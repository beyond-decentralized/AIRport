import { IEntityVDescriptor, IVNumberField, IVStringField } from '@airbridge/validate';
import { UserAccountVDescriptor, UserAccount, TerminalVDescriptor, Terminal } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
import { ApplicationVDescriptor, Application } from '@airport/airspace/lib/to_be_generated/runtime-index';
export interface ActorVDescriptor<T> extends IEntityVDescriptor<T> {
    _localId?: number | IVNumberField;
    GUID?: string | IVStringField;
    userAccount?: UserAccountVDescriptor<UserAccount>;
    terminal?: TerminalVDescriptor<Terminal>;
    application?: ApplicationVDescriptor<Application>;
}
//# sourceMappingURL=vactor.d.ts.map