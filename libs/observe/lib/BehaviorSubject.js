import { Subject } from './Subject';
export class BehaviorSubject extends Subject {
    constructor(value) {
        super();
        this.currentValue = value;
    }
    next(value) {
        this.currentValue = value;
        this.exec(value, 'onNext');
    }
    clear() {
    }
}
//# sourceMappingURL=BehaviorSubject.js.map