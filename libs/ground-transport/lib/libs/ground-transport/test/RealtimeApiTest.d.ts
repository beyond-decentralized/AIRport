/**
 * Created by Papa on 1/10/2016.
 */
import { DocumentHandle } from '../src/google/realtime/DocumentHandle';
import { NgGoogleRealtimeAdaptor } from "./Injectables";
export declare class RealtimeApiTest {
    private adaptor;
    handle: DocumentHandle;
    constructor(adaptor: NgGoogleRealtimeAdaptor);
    setupTest(): void;
    testAddRecord(): void;
}
