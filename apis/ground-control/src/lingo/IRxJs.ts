import type {
	from as IRxFrom,
} from 'rxjs';
import type { IBehaviorSubject, ISubject } from '@airport/observe';
import type {
	distinctUntilChanged as IRxDistinctUntilChanged,
	map as IRxMap
} from 'rxjs/operators';

export interface IRxJs {

	BehaviorSubject: { new <T>(value: T): IBehaviorSubject<T> }
	distinctUntilChanged: typeof IRxDistinctUntilChanged
	from: typeof IRxFrom
	map: typeof IRxMap
	Subject: { new <T>(): ISubject<T> }

}

