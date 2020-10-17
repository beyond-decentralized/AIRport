import { Observable } from './Observable';
export class Subject extends Observable {
    // complete(): void {
    // }
    error(errorValue) {
        this.exec(errorValue, 'onError');
    }
    next(value) {
        this.exec(value, 'onNext');
    }
}
//# sourceMappingURL=Subject.js.map