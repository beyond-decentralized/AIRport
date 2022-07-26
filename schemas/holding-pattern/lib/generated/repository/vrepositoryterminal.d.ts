import { IEntityVDescriptor } from '@airport/airbridge-validate';
import { RepositoryVDescriptor } from './vrepository';
import { TerminalVDescriptor } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface RepositoryTerminalVDescriptor extends IEntityVDescriptor {
    repository?: RepositoryVDescriptor;
    terminal?: TerminalVDescriptor;
}
//# sourceMappingURL=vrepositoryterminal.d.ts.map