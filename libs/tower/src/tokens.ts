import { system } from '@airport/di'
import { ITransactionalServer } from './core/data/ITransactionalServer'

const tower = system('airport')
	.lib('tower')

export const TRANSACTIONAL_SERVER = tower.token<ITransactionalServer>('ITransactionalServer')
