import { system } from '@airport/di';
const tower = system('airport').lib('ground-control');
export const TRANS_SERVER = tower.token();
//# sourceMappingURL=tokens.js.map