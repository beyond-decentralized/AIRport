import {system}                     from '@airport/di'
import {ISyncConnectionServer}      from './lingo/SyncConnectionServer'

const arrivalsNDepartures = system('airport').lib('arrivals-n-departures')

export const SYNC_CONNECTION_SERVER       = arrivalsNDepartures.token<ISyncConnectionServer<any, any, any, any>>('ISyncConnectionServer')
