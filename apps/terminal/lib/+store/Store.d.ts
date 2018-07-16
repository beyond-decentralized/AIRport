import { Observable } from "rxjs/Observable";
export interface SubSystem {
    reducer: any;
    effects: any;
}
export interface IStore<Modify, Signal> {
    modify: Modify;
    signal: Signal;
}
export declare class Store<Modify, Signal> implements IStore {
    state: {};
    listeners: any[];
    constructor(modify: Modify, signal: Signal);
    initialize(): void;
    addAction(name: string, action: Function): void;
    addEffect(name: string, effect: Observable<any>): void;
}
