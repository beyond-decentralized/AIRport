import { container } from '@airport/di';
import { Message, MessageAttributes } from '@node-ts/bus-messages';
import { EVENT_FACTORY, HANDLER_REGISTRY } from '../tokens';
export const RETRY_LIMIT = 10;
/**
 * How long to wait for the next message
 */
export const RECEIVE_TIMEOUT_MS = 1000;
/**
 * An in-memory message queue. This isn't intended for production use as all messages
 * are kept in memory and hence will be wiped when the application or host restarts.
 *
 * There are however legitimate uses for in-memory queues such as decoupling of non-mission
 * critical code inside of larger applications; so use at your own discresion.
 */
export class MemoryQueue {
    constructor(
    // @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
    // @inject(BUS_SYMBOLS.HandlerRegistry)
    // private readonly handlerRegistry: HandlerRegistry
    ) {
        this.queue = [];
        // private queuePushed: EventEmitter                            = new EventEmitter();
        this.deadLetterQueue = [];
        this.logger = console;
    }
    /**
     * Gets the queue depth, which is the number of messages both queued and in flight
     */
    get depth() {
        return this.queue.length;
    }
    /**
     * Gets the number of messages in the queue, excluding those in flight
     */
    get numberMessagesVisible() {
        return this.queue.filter(m => !m.raw.inFlight).length;
    }
    get deadLetterQueueDepth() {
        return this.deadLetterQueue.length;
    }
    async deleteMessage(message) {
        const messageIndex = this.queue.indexOf(message);
        this.logger.debug('Deleting message', { queueDepth: this.depth, messageIndex });
        this.queue.splice(messageIndex, 1);
        this.logger.debug('Message Deleted', { queueDepth: this.depth });
    }
    async dispose() {
        if (this.queue.length > 0) {
            this.logger.warn('Memory queue being shut down, all messages will be lost.', { queueSize: this.queue.length });
        }
    }
    async fail(transportMessage) {
        await this.sendToDeadLetterQueue(transportMessage);
    }
    async initialize() {
        this.messagesWithHandlers = {};
        const handlerRegistry = await container(this).get(HANDLER_REGISTRY);
        handlerRegistry.messageSubscriptions
            .filter(subscription => !!subscription.messageType)
            .map(subscription => subscription.messageType)
            .map(ctor => new ctor().$name)
            .forEach(messageName => this.messagesWithHandlers[messageName] = {});
    }
    async publish(event, messageOptions) {
        this.addToQueue(event, messageOptions);
    }
    async readNextMessage() {
        this.logger.debug('Reading next message', {
            depth: this.depth,
            numberMessagesVisible: this.numberMessagesVisible
        });
        const eventFactory = await container(this).get(EVENT_FACTORY);
        return new Promise(resolve => {
            const onMessageEmitted = () => {
                unsubscribeEmitter();
                clearTimeout(timeoutToken);
                resolve(getNextMessage());
            };
            eventFactory.on('pushed', onMessageEmitted);
            const unsubscribeEmitter = () => eventFactory.off('pushed', onMessageEmitted);
            // Immediately returns the next available message, or undefined if none are available
            const getNextMessage = () => {
                const availableMessages = this.queue.filter(m => !m.raw.inFlight);
                if (availableMessages.length === 0) {
                    this.logger.debug('No messages available in queue');
                    return;
                }
                const message = availableMessages[0];
                message.raw.inFlight = true;
                return message;
            };
            const timeoutToken = setTimeout(() => {
                unsubscribeEmitter();
                resolve(null);
            }, RECEIVE_TIMEOUT_MS);
            const nextMessage = getNextMessage();
            if (nextMessage) {
                unsubscribeEmitter();
                clearTimeout(timeoutToken);
                resolve(nextMessage);
            }
            // Else wait for the timeout (empty return) or emitted event to return
        });
    }
    async returnMessage(message) {
        message.raw.seenCount++;
        if (message.raw.seenCount >= RETRY_LIMIT) {
            // Message retries exhausted, send to DLQ
            this.logger.info('Message retry limit exceeded, sending to dead letter queue', { message });
            await this.sendToDeadLetterQueue(message);
        }
        else {
            message.raw.inFlight = false;
        }
    }
    async send(command, messageOptions) {
        this.addToQueue(command, messageOptions);
    }
    addToQueue(message, messageOptions = new MessageAttributes()) {
        const isBusMessage = message instanceof Message;
        if (!isBusMessage || this.messagesWithHandlers[message.$name]) {
            const transportMessage = toTransportMessage(message, messageOptions, false);
            container(this).get(EVENT_FACTORY).then(eventFactory => {
                this.queue.push(transportMessage);
                eventFactory.emit('pushed');
                this.logger.debug('Added message to queue', { message, queueSize: this.queue.length });
            });
        }
        else {
            this.logger.warn('Message was not sent as it has no registered handlers', { message });
        }
    }
    async sendToDeadLetterQueue(message) {
        this.deadLetterQueue.push({
            ...message,
            raw: {
                ...message.raw,
                inFlight: false
            }
        });
        await this.deleteMessage(message);
    }
}
export const toTransportMessage = (message, messageAttributes, isProcessing) => {
    return {
        id: undefined,
        domainMessage: message,
        attributes: messageAttributes,
        raw: {
            seenCount: 0,
            payload: message,
            inFlight: isProcessing
        }
    };
};
//# sourceMappingURL=InMemoryQueue.js.map