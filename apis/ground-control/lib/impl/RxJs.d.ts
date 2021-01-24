import type { IBehaviorSubject, ISubject } from '@airport/observe';
import type { from as IRxFrom } from 'rxjs';
import type { distinctUntilChanged as IRxDistinctUntilChanged, map as IRxMap } from 'rxjs/operators';
import { IRxJs } from '../lingo/IRxJs';
export declare class RxJs implements IRxJs {
    loadRx: boolean;
    rxjsRef: IRxJs;
    get BehaviorSubject(): {
        new <T>(value: T): IBehaviorSubject<T>;
    };
    get Subject(): {
        new <T>(): ISubject<T>;
    };
    get distinctUntilChanged(): typeof IRxDistinctUntilChanged;
    get from(): typeof IRxFrom;
    get map(): typeof IRxMap;
    init(): Promise<void>;
    private ensureLoaded;
}
//# sourceMappingURL=RxJs.d.ts.map