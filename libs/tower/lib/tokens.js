import { system } from '@airport/di';
const tower = system('airport').lib('tower');
export const TRANS_SERVER = tower.token();
//# sourceMappingURL=tokens.js.map