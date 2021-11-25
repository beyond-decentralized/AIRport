import { IActor } from '@airport/holding-pattern'
import type {
	ISharingNode,
	SharingNode_SyncFrequency
}                  from '@airport/moving-walkway'
import type {IApplication, IDomain}   from '@airport/territory'
import type {ISchema}   from '@airport/traffic-pattern'
import type {ITerminal} from '@airport/travel-document-checkpoint'

export interface ITerminalState {

	applicationActors: IActor[]
	applications: IApplication[]
	domains: IDomain[]
	frameworkActor: IActor
	nodesBySyncFrequency: Map<SharingNode_SyncFrequency, ISharingNode[]>
	schemas: ISchema[]
	terminal: ITerminal

}