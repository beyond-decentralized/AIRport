import { system } from '@airport/di';
const groundControl = system('airport').lib('ground-control');
export const STORE_DRIVER = groundControl.token();
export const TRANS_CONNECTOR = groundControl.token();
//# sourceMappingURL=tokens.js.map