import { IEntityVDescriptor } from '@airbridge/validate';
import { RepositoryVDescriptor } from './vrepository';
import { Repository } from '../../ddl/repository/Repository';
import { TerminalVDescriptor, Terminal } from '@airport/travel-document-checkpoint/lib/to_be_generated/runtime-index';
export interface RepositoryTerminalVDescriptor<T> extends IEntityVDescriptor<T> {
    repository?: RepositoryVDescriptor<Repository>;
    terminal?: TerminalVDescriptor<Terminal>;
}
//# sourceMappingURL=vrepositoryterminal.d.ts.map