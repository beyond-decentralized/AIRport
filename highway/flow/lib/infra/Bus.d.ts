import { Bus, BusState, HookAction, HookCallback } from '@node-ts/bus-core';
import { Command, Event, MessageAttributes } from '@node-ts/bus-messages';
export declare class ServiceBus implements Bus {
    private internalState;
    private runningWorkerCount;
    private logger;
    fail(): Promise<void>;
    off(action: HookAction, callback: HookCallback): void;
    on(action: HookAction, callback: HookCallback): void;
    publish<TEvent extends Event>(event: TEvent, messageOptions?: MessageAttributes): Promise<void>;
    get runningParallelWorkerCount(): number;
    send<TCommand extends Command>(command: TCommand, messageOptions?: MessageAttributes): Promise<void>;
    start(): Promise<void>;
    get state(): BusState;
    stop(): Promise<void>;
    private applicationLoop;
    private handleNextMessage;
    private dispatchMessageToHandlers;
    private prepareTransportOptions;
}
//# sourceMappingURL=Bus.d.ts.map