import { IActor } from '@airport/holding-pattern'
import type {
	IDomain,
	IApplication
} from '@airport/airspace'
import type { ITerminal } from '@airport/travel-document-checkpoint'
import { FullApplicationName } from '@airport/ground-control'

export interface ITerminalState {

	applicationActors: IActor[]
	applications: IApplication[]
	domains: IDomain[]
	frameworkActor: IActor
	initializedApps: Set<FullApplicationName>
	initializingApps: Set<FullApplicationName>
	terminal: ITerminal

}
