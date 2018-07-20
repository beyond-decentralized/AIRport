/**
 * Created by Papa on 1/10/2016.
 */
import {DocumentHandle} from '../src/google/realtime/DocumentHandle';
import {ChangeRecord} from '../../../apis/terminal-map/src/sync/ChangeModel';
import {Injectable, NgGoogleRealtimeAdaptor} from "./Injectables";

@Injectable()
export class RealtimeApiTest {

	handle:DocumentHandle;

	constructor(
		private adaptor:NgGoogleRealtimeAdaptor
	) {
	}

	setupTest() {
		this.handle = this.adaptor.startTest();
	}

	testAddRecord() {
		let record:ChangeRecord = {
			id: 'dsf',
			test: 'a',
			test2: 2,
			test3: true,
			test4: {a: 'b'}
		};
		this.handle.addChangeRecord(record);
	}

}
