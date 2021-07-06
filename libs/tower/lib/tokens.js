import { system } from '@airport/di';
const tower = system('airport')
    .lib('tower');
export const TRANSACTIONAL_SERVER = tower.token('ITransactionalServer');
//# sourceMappingURL=tokens.js.map