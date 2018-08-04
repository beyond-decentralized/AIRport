import {ITerminal} from '@airport/holding-pattern'
import {
	ISharingNode,
	SharingNodeSyncFrequency
}                  from '@airport/moving-walkway'
import {IDomain}   from '@airport/territory'

export interface ITerminalState {

	terminal: ITerminal

	nodesBySyncFrequency: Map<SharingNodeSyncFrequency, ISharingNode[]>

	domains: IDomain[]

}