import { CONFIG }                from '../../apis/config';
import { DI }                    from '@airport/di';
import type {
	IBehaviorSubject,
	ISubject
}                                from 'lib';
import type { from as IRxFrom, } from 'rxjs';
import type {
	distinctUntilChanged as IRxDistinctUntilChanged,
	map as IRxMap
}                                from 'rxjs/operators';

import { RXJS }                  from '../../../apis/ground-control/src/tokens';

export interface IRxJs {

	BehaviorSubject: { new <T>(value: T): IBehaviorSubject<T> }
	distinctUntilChanged: typeof IRxDistinctUntilChanged
	from: typeof IRxFrom
	map: typeof IRxMap
	Subject: { new <T>(): ISubject<T> }

}

export class RxJs
	implements IRxJs {

	loadRx: boolean;

	rxjsRef: IRxJs = {} as any;

	get BehaviorSubject(): { new<T>(value: T): IBehaviorSubject<T> } {
		return this.ensureLoaded(this.rxjsRef.BehaviorSubject);
	}

	get Subject(): { new<T>(): ISubject<T> } {
		return this.ensureLoaded(this.rxjsRef.Subject);
	}

	get distinctUntilChanged(): typeof IRxDistinctUntilChanged {
		return this.ensureLoaded(this.rxjsRef.distinctUntilChanged);
	};

	get from(): typeof IRxFrom {
		return this.ensureLoaded(this.rxjsRef.from);
	};

	get map(): typeof IRxMap {
		return this.ensureLoaded(this.rxjsRef.map);
	};

	async init(): Promise<void> {
		this.loadRx = CONFIG.loadRx;
		if (!this.loadRx) {
			return;
		}
		const rxjs      = await import('rxjs');
		const operators = await import('rxjs/operators');
		this.rxjsRef    = {
			BehaviorSubject: rxjs.BehaviorSubject,
			distinctUntilChanged: operators.distinctUntilChanged,
			from: rxjs.from,
			map: operators.map,
			Subject: rxjs.Subject,
		};
	}

	private ensureLoaded(
		rxJsObject: any
	): any {
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
