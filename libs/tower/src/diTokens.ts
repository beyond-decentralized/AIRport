import {
	diToken,
	DiToken
}                             from '@airport/di'
import {ITransactionalServer} from './core/data/ITransactionalServer'

export const TRANS_SERVER: DiToken<ITransactionalServer> = diToken<ITransactionalServer>()
