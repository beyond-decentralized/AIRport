import {ITerminal}          from '@airport/holding-pattern'
import {
	ISharingNode,
	SharingNodeSyncFrequency
}                           from '@airport/moving-walkway'
import {IDomain}            from '@airport/territory'
import {BehaviorSubject}    from 'rxjs'
import {Service}            from 'typedi'
import {TerminalStoreToken} from '../InjectionTokens'

export interface ITerminalStore {

	terminal: BehaviorSubject<ITerminal>;

	nodesBySyncFrequency: BehaviorSubject<Map<SharingNodeSyncFrequency, ISharingNode[]>>;

	domains: BehaviorSubject<IDomain>

	tearDown();


}

export class MemoizedSelector {

}

@Service(TerminalStoreToken)
export class TerminalStore
	implements ITerminalStore {

	terminal = new BehaviorSubject<ITerminal>(null)

	nodesBySyncFrequency
		= new BehaviorSubject<Map<SharingNodeSyncFrequency, ISharingNode[]>>(new Map())

	tearDown() {
		this.nodesBySyncFrequency.complete()
	}
}