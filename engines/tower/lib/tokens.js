import { system } from '@airport/di';
const tower = system('airport').lib('tower');
export const ENTITY_COPIER = tower.token('IEntityCopier');
export const LOCAL_API_SERVER = tower.token('ILocalAPIServer');
//# sourceMappingURL=tokens.js.map