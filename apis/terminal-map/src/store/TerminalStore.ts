import {IDatabase}          from "@airport/holding-pattern";
import {
	ISharingNode,
	SharingNodeSyncFrequency
}                           from "@airport/moving-walkway";
import {BehaviorSubject}    from "rxjs";
import {Service}            from "typedi";
import {TerminalStoreToken} from "../InjectionTokens";

export interface ITerminalStore {

	database: BehaviorSubject<IDatabase>;

	nodesBySyncFrequency: BehaviorSubject<Map<SharingNodeSyncFrequency, ISharingNode[]>>;

	tearDown();

}

@Service(TerminalStoreToken)
export class TerminalStore
	implements ITerminalStore {

	database = new BehaviorSubject<IDatabase>(null);

	nodesBySyncFrequency
		= new BehaviorSubject<Map<SharingNodeSyncFrequency, ISharingNode[]>>(new Map());

	tearDown() {
		this.nodesBySyncFrequency.complete();
	}
}