import type {
	ISharingNode,
	SharingNodeSyncFrequency
}                  from '@airport/moving-walkway'
import type {IDomain}   from '@airport/territory'
import type {ISchema}   from '@airport/traffic-pattern'
import type {ITerminal} from '@airport/travel-document-checkpoint'

export interface ITerminalState {

	terminal: ITerminal

	nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>

	domains: IDomain[]

	schemas: ISchema[]

}