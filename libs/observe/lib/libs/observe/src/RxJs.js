import { CONFIG } from '../../apis/config';
import { DI } from '@airport/di';
import { RXJS } from '../../../apis/ground-control/src/tokens';
export class RxJs {
    constructor() {
        this.rxjsRef = {};
    }
    get BehaviorSubject() {
        return this.ensureLoaded(this.rxjsRef.BehaviorSubject);
    }
    get Subject() {
        return this.ensureLoaded(this.rxjsRef.Subject);
    }
    get distinctUntilChanged() {
        return this.ensureLoaded(this.rxjsRef.distinctUntilChanged);
    }
    ;
    get from() {
        return this.ensureLoaded(this.rxjsRef.from);
    }
    ;
    get map() {
        return this.ensureLoaded(this.rxjsRef.map);
    }
    ;
    async init() {
        this.loadRx = CONFIG.loadRx;
        if (!this.loadRx) {
            return;
        }
        const rxjs = await import('rxjs');
        const operators = await import('rxjs/operators');
        this.rxjsRef = {
            BehaviorSubject: rxjs.BehaviorSubject,
            distinctUntilChanged: operators.distinctUntilChanged,
            from: rxjs.from,
            map: operators.map,
            Subject: rxjs.Subject,
        };
    }
    ensureLoaded(rxJsObject) {
        if (!this.loadRx) {
            throw new Error(`RxJs has not been loaded.  Please make sure it is loaded by calling:
			configure({
				loadRx: true
			});
			`);
        }
        if (!rxJsObject) {
            throw new Error(`RxJs is not yet loaded.`);
        }
        return rxJsObject;
    }
}
DI.set(RXJS, RxJs);
//# sourceMappingURL=RxJs.js.map