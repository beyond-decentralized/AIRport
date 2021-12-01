import { IActor } from '@airport/holding-pattern'
import type {
	IDomain,
	IApplication
} from '@airport/airspace'
import type { ITerminal } from '@airport/travel-document-checkpoint'

export interface ITerminalState {

	applicationActors: IActor[]
	domains: IDomain[]
	frameworkActor: IActor
	applications: IApplication[]
	terminal: ITerminal

}