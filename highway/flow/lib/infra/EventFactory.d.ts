import { IInitializable } from '@airport/di';
export interface IEventFactory {
    emit(event: string): boolean;
    on(event: string, listener: (...args: any[]) => void): IEventFactory;
    off(event: string | symbol, listener: (...args: any[]) => void): IEventFactory;
}
export declare class EventFactory implements IEventFactory, IInitializable {
    isNode: boolean;
    eventEmitter: any;
    document: any;
    init(): Promise<void>;
    emit(event: string): boolean;
    off(event: string | symbol, listener: (...args: any[]) => void): IEventFactory;
    on(event: string, listener: (...args: any[]) => void): IEventFactory;
}
//# sourceMappingURL=EventFactory.d.ts.map