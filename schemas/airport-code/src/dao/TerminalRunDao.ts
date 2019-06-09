import {DI}               from '@airport/di'
import {TERMINAL_RUN_DAO} from '../diTokens'
import {
	BaseTerminalRunDao,
	IBaseTerminalRunDao,
	TerminalRunECreateProperties
}                         from '../generated/generated'

export interface ITerminalRunDao
	extends IBaseTerminalRunDao {

	create<EntityInfo extends TerminalRunECreateProperties[] | TerminalRunECreateProperties>(
		entityInfo: EntityInfo
	): Promise<number>

}

export class TerminalRunDao
	extends BaseTerminalRunDao
	implements ITerminalRunDao {

}

DI.set(TERMINAL_RUN_DAO, TerminalRunDao)
