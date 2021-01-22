import behaviorSubjectFile from 'rxjs/dist/esm/internal/BehaviorSubject';
const RxBehaviorSubject = behaviorSubjectFile.BehaviorSubject;
export const BehaviorSubject = RxBehaviorSubject;
// export class BehaviorSubject<V> {
// constructor(
// 	value: V
// ) {
// 	super()
// 	this.currentValue = value
// }
//
// next(value: V): void {
// 	this.currentValue = value
// 	this.exec(value, 'onNext')
// }
//
// clear(): void {
// }
// }
//# sourceMappingURL=BehaviorSubject.js.map