import { lib } from '@airport/direction-indicator';
import { NonhubClient } from './NonhubClient';
// import {
//     decryptString,
//     encryptString,
// } from "string-cipher";
const nonhubClient = lib('nonhub-client');
nonhubClient.autopilot = false;
export const NONHUB_CLIENT = nonhubClient.token({
    class: NonhubClient,
    interface: 'INonhubClient',
    token: 'INonhubClient'
});
//# sourceMappingURL=tokens.js.map