import {
	BaseTerminalRunDao,
	IBaseTerminalRunDao
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
