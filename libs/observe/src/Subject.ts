// import SubjectFile from 'rxjs/dist/esm/internal/Subject';
import type { Subject as IRxSubject } from 'rxjs';

// const RxSubject: typeof IRxSubject = SubjectFile.Subject;
// import {
// 	IObservable,
// }                  from './Observable'
// import {IObserver} from './Observer'

export interface ISubject<V>
	extends
		// IObservable<V>,
		//       IObserver<V>,
		IRxSubject<V> {
}

// export const Subject = RxSubject;
// export class Subject<V>
// 	extends RxSubject<V>
// 	implements ISubject<V> {
//
// }

/*
export class Subject<V>
	extends Observable<V>
	implements ISubject<V> {


	// complete(): void {
	// }

	error(errorValue: any): void {
		this.exec(errorValue, 'onError')
	}

	next(value: V): void {
		this.exec(value, 'onNext')
	}

	// start(subscription: ISubscription): void {
	// }

}
*/
