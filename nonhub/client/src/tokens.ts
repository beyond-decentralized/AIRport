import { lib } from '@airport/direction-indicator'
import { INonhubClient, NonhubClient } from './NonhubClient'
// import {
//     decryptString,
//     encryptString,
// } from "string-cipher";

const nonhubClient = lib('nonhub-client')
export const NONHUB_CLIENT = nonhubClient.token<INonhubClient>({
    class: NonhubClient,
    interface: 'INonhubClient',
    token: 'INonhubClient'
})
