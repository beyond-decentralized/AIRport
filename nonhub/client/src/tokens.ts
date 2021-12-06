import { lib } from '@airport/di'
import { INonhubClient } from './NonhubClient'
// import {
//     decryptString,
//     encryptString,
// } from "string-cipher";

const nonhubClient = lib('nonhub-client')
export const NONHUB_CLIENT = nonhubClient.token<INonhubClient>('INonhubClient')
