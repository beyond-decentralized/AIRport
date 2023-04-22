import { Subject } from "rxjs";

export interface ISubscriptionCountSubject<T>
    extends Subject<T> {

    handleUnsubscribe(): void

}
