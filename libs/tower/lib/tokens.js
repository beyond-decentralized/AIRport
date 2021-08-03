import { system } from '@airport/di';
const tower = system('airport').lib('tower');
export const ENTITY_COPIER = tower.token('IEntityCopier');
export const TRANSACTIONAL_SERVER = tower.token('ITransactionalServer');
//# sourceMappingURL=tokens.js.map