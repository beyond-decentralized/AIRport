import {system}                  from '@airport/di'
import {IStoreDriver}            from './lingo/data/StoreDriver'

const groundControl = system('airport').lib('ground-control')

export const STORE_DRIVER    = groundControl.token<IStoreDriver>()
