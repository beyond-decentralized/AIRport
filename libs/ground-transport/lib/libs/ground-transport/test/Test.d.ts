/**
 * Created by Papa on 1/3/2016.
 */
import { RealtimeApiTest } from './RealtimeApiTest';
import { NgGoogleSharingAdaptor } from "./Injectables";
export declare class Test {
    private adaptor;
    private apiTest;
    original: string;
    constructor(adaptor: NgGoogleSharingAdaptor, apiTest: RealtimeApiTest);
    test(): void;
}
