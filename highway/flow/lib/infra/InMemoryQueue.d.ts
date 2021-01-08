import { HandlerRegistry, MessageType, Transport, TransportMessage } from '@node-ts/bus-core';
import { Command, Event, MessageAttributes } from '@node-ts/bus-messages';
import { Logger } from '@node-ts/logger-core';
export declare const RETRY_LIMIT = 10;
/**
 * How long to wait for the next message
 */
export declare const RECEIVE_TIMEOUT_MS = 1000;
export interface InMemoryMessage {
    /**
     * If the message is currently being handled and not visible to other consumers
     */
    inFlight: boolean;
    /**
     * The number of times the message has been fetched from the queue
     */
    seenCount: number;
    /**
     * The body of the message that was sent by the consumer
     */
    payload: MessageType;
}
/**
 * An in-memory message queue. This isn't intended for production use as all messages
 * are kept in memory and hence will be wiped when the application or host restarts.
 *
 * There are however legitimate uses for in-memory queues such as decoupling of non-mission
 * critical code inside of larger applications; so use at your own discresion.
 */
export declare class MemoryQueue implements Transport<InMemoryMessage> {
    private readonly logger;
    private readonly handlerRegistry;
    private queue;
    private queuePushed;
    private deadLetterQueue;
    private messagesWithHandlers;
    constructor(logger: Logger, handlerRegistry: HandlerRegistry);
    /**
     * Gets the queue depth, which is the number of messages both queued and in flight
     */
    get depth(): number;
    /**
     * Gets the number of messages in the queue, excluding those in flight
     */
    get numberMessagesVisible(): number;
    get deadLetterQueueDepth(): number;
    deleteMessage(message: TransportMessage<InMemoryMessage>): Promise<void>;
    dispose(): Promise<void>;
    fail(transportMessage: TransportMessage<unknown>): Promise<void>;
    initialize(): Promise<void>;
    publish<TEvent extends Event>(event: TEvent, messageOptions?: MessageAttributes): Promise<void>;
    readNextMessage(): Promise<TransportMessage<InMemoryMessage> | undefined>;
    returnMessage(message: TransportMessage<InMemoryMessage>): Promise<void>;
    send<TCommand extends Command>(command: TCommand, messageOptions?: MessageAttributes): Promise<void>;
    addToQueue(message: MessageType, messageOptions?: MessageAttributes): void;
    private sendToDeadLetterQueue;
}
export declare const toTransportMessage: (message: MessageType, messageAttributes: MessageAttributes, isProcessing: boolean) => TransportMessage<InMemoryMessage>;
//# sourceMappingURL=InMemoryQueue.d.ts.map