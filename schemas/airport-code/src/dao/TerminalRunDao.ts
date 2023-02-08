import { Injected } from '@airport/direction-indicator';
import { BaseTerminalRunDao, IBaseTerminalRunDao } from '../generated/baseDaos';

export interface ITerminalRunDao
	extends IBaseTerminalRunDao {

	// create<EntityInfo extends TerminalRunECreateProperties[] | TerminalRunECreateProperties>(
	// 	entityInfo: EntityInfo
	// ): Promise<number>

}

@Injected()
export class TerminalRunDao
	extends BaseTerminalRunDao
	implements ITerminalRunDao {

}
