import {DEPENDENCY_INJECTION}               from '@airport/direction-indicator'
import {TERMINAL_RUN_DAO} from '../tokens'
import {
	BaseTerminalRunDao,
	IBaseTerminalRunDao,
	TerminalRunECreateProperties
}                         from '../generated/generated'

export interface ITerminalRunDao
	extends IBaseTerminalRunDao {

	// create<EntityInfo extends TerminalRunECreateProperties[] | TerminalRunECreateProperties>(
	// 	entityInfo: EntityInfo
	// ): Promise<number>

}

export class TerminalRunDao
	extends BaseTerminalRunDao
	implements ITerminalRunDao {

}

DEPENDENCY_INJECTION.set(TERMINAL_RUN_DAO, TerminalRunDao)
