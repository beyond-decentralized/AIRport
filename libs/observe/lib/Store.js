import { BehaviorSubject } from './BehaviorSubject';
export class Store extends BehaviorSubject {
    constructor(value) {
        super(value);
    }
    next(value) {
        this.forceExec(value, 'onNext');
    }
}
//# sourceMappingURL=Store.js.map