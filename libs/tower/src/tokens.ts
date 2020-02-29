import {
	system
}                             from '@airport/di'
import {ITransactionalServer} from './core/data/ITransactionalServer'

const tower = system('airport').lib('ground-control')

export const TRANS_SERVER = tower.token<ITransactionalServer>()
