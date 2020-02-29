import { system } from '@airport/di';
const checkIn = system('airport').lib('check-in');
export const SEQUENCE_GENERATOR = checkIn.token();
//# sourceMappingURL=tokens.js.map