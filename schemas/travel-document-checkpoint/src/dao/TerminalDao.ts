import { AND } from '@airport/tarmaq-query'
import { IContext, Inject, Injected } from '@airport/direction-indicator';
import {
	BaseTerminalDao,
	IBaseTerminalDao,
	QTerminal,
	QUserAccount
} from '../generated/generated'
import Q from '../generated/qApplication'
import { IAirportDatabase } from '@airport/air-traffic-control';
import { Dictionary, ISequenceGenerator, ITerminal, Terminal_GUID } from '@airport/ground-control';
import { UserAccount_GUID } from '@airport/aviation-communication';

export interface ITerminalDao
	extends IBaseTerminalDao {

	findByOwnerIdsAndGUIDs(
		ownerGuids: UserAccount_GUID[],
		GUIDs: Terminal_GUID[]
	): Promise<ITerminal[]>;

	findByGUIDs(
		GUIDs: Terminal_GUID[]
	): Promise<ITerminal[]>;

	insert(
		terminals: ITerminal[],
		context: IContext
	): Promise<void>

}

@Injected()
export class TerminalDao
	extends BaseTerminalDao
	implements ITerminalDao {

	@Inject()
	airportDatabase: IAirportDatabase

	@Inject()
	dictionary: Dictionary

	@Inject()
	sequenceGenerator: ISequenceGenerator

	async findByOwnerIdsAndGUIDs(
		ownerGuids: UserAccount_GUID[],
		GUIDs: Terminal_GUID[]
	): Promise<ITerminal[]> {
		let t: QTerminal,
			ua: QUserAccount
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				t = Q.Terminal,
				ua = t.owner.LEFT_JOIN()
			],
			WHERE: AND(
				ua.GUID.IN(ownerGuids),
				t.GUID.IN(GUIDs)
			)
		})
	}

	async findByGUIDs(
		GUIDs: Terminal_GUID[],
	): Promise<ITerminal[]> {
		let t: QTerminal
		return await this.db.find.tree({
			SELECT: {},
			FROM: [
				t = Q.Terminal
			],
			WHERE: t.GUID.IN(GUIDs)
		})
	}

	async insert(
		terminals: ITerminal[],
		context: IContext
	): Promise<void> {
		const airport = this.dictionary.airport
		const Terminal = this.dictionary.Terminal
		const terminalLids = await this.sequenceGenerator
			.generateSequenceNumbersForColumn(
				airport.DOMAIN_NAME,
				airport.apps.TRAVEL_DOCUMENT_CHECKPOINT.name,
				Terminal.name,
				Terminal.columns.TERMINAL_LID,
				terminals.length
			);

		const VALUES = []
		for (let i = 0; i < terminals.length; i++) {
			const terminal = terminals[i]
			terminal._localId = terminalLids[i]
			VALUES.push([
				terminalLids[i], terminal.GUID, terminal.owner._localId, false
			])
		}

		let t: QTerminal;

		await this.db.insertValues({
			INSERT_INTO: t = Q.Terminal,
			columns: [
				t._localId,
				t.GUID,
				t.owner._localId,
				t.isLocal
			],
			VALUES
		}, context)
	}

}
