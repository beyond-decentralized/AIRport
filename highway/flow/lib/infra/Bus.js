import { container, DI } from '@airport/di';
import { BusState, FailMessageOutsideHandlingContext, sleep } from '@node-ts/bus-core';
import { MessageAttributes } from '@node-ts/bus-messages';
import { serializeError } from 'serialize-error';
import { BUS, BUS_HOOKS } from '../tokens';
export class ServiceBus {
    constructor() {
        this.internalState = BusState.Stopped;
        this.runningWorkerCount = 0;
        this.logger = console;
    }
    // constructor(
    // 	@inject(BUS_SYMBOLS.Transport) private readonly transport: Transport<{}>,
    // 	@inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger,
    // 	@inject(BUS_SYMBOLS.HandlerRegistry) private readonly handlerRegistry: HandlerRegistry,
    // 	@inject(BUS_SYMBOLS.MessageHandlingContext) private readonly messageHandlingContext: MessageAttributes,
    // 	@inject(BUS_INTERNAL_SYMBOLS.BusHooks) private readonly busHooks: BusHooks,
    // 	@inject(BUS_SYMBOLS.BusConfiguration) private readonly busConfiguration: BusConfiguration,
    // 	@optional() @inject(BUS_INTERNAL_SYMBOLS.RawMessage) private readonly rawMessage: TransportMessage<unknown>
    // ) {
    // }
    async fail() {
        if (!this.rawMessage) {
            throw new FailMessageOutsideHandlingContext(this.rawMessage);
        }
        this.logger.debug('failing message', { message: this.rawMessage });
        return this.transport.fail(this.rawMessage);
    }
    off(action, callback) {
        container(this).getSync(BUS_HOOKS).off(action, callback);
    }
    // tslint:disable-next-line:member-ordering
    on(action, callback) {
        return container(this).getSync(BUS_HOOKS).on(action, callback);
    }
    async publish(event, messageOptions = new MessageAttributes()) {
        this.logger.debug('publish', { event });
        const transportOptions = this.prepareTransportOptions(messageOptions);
        const busHooks = await container(this).get(BUS_HOOKS);
        await Promise.all(busHooks.publish.map(callback => callback(event, messageOptions)));
        return this.transport.publish(event, transportOptions);
    }
    get runningParallelWorkerCount() {
        return this.runningWorkerCount;
    }
    async send(command, messageOptions = new MessageAttributes()) {
        this.logger.debug('send', { command });
        const transportOptions = this.prepareTransportOptions(messageOptions);
        const busHooks = await container(this).get(BUS_HOOKS);
        await Promise.all(busHooks.send.map(callback => callback(command, messageOptions)));
        return this.transport.send(command, transportOptions);
    }
    async start() {
        if (this.internalState !== BusState.Stopped) {
            throw new Error('ServiceBus must be stopped before it can be started');
        }
        this.internalState = BusState.Starting;
        this.logger.info('ServiceBus starting...', { concurrency: this.busConfiguration.concurrency });
        new Array(this.busConfiguration.concurrency)
            .fill(undefined)
            .forEach(() => setTimeout(async () => this.applicationLoop(), 0));
        this.internalState = BusState.Started;
    }
    get state() {
        return this.internalState;
    }
    async stop() {
        this.internalState = BusState.Stopping;
        this.logger.info('ServiceBus stopping...');
        while (this.runningWorkerCount > 0) {
            await sleep(100);
        }
        this.internalState = BusState.Stopped;
        this.logger.info('ServiceBus stopped');
    }
    async applicationLoop() {
        this.runningWorkerCount++;
        this.logger.debug('Worker started', { runningParallelWorkerCount: this.runningParallelWorkerCount });
        while (this.internalState === BusState.Started) {
            await this.handleNextMessage();
        }
        this.runningWorkerCount--;
        this.logger.debug('Worker stopped', { runningParallelWorkerCount: this.runningParallelWorkerCount });
    }
    async handleNextMessage() {
        try {
            const message = await this.transport.readNextMessage();
            if (message) {
                this.logger.debug('Message read from transport', { message });
                try {
                    await this.dispatchMessageToHandlers(message);
                    this.logger.debug('Message dispatched to all handlers', { message });
                    await this.transport.deleteMessage(message);
                }
                catch (error) {
                    this.logger.warn('Message was unsuccessfully handled. Returning to queue', { message, error: serializeError(error) });
                    await Promise.all(container(this).getSync(BUS_HOOKS).error.map(callback => callback(message.domainMessage, error, message.attributes)));
                    await this.transport.returnMessage(message);
                    return false;
                }
                return true;
            }
        }
        catch (error) {
            this.logger.error('Failed to receive message from transport', { error: serializeError(error) });
        }
        return false;
    }
    async dispatchMessageToHandlers(rawMessage) {
        const handlers = this.handlerRegistry.get(rawMessage.domainMessage);
        if (handlers.length === 0) {
            this.logger.warn(`No handlers registered for message. Message will be discarded`, { messageType: rawMessage.domainMessage });
            return;
        }
        const handlersToInvoke = handlers.map(handler => dispatchMessageToHandler(rawMessage, handler));
        await Promise.all(handlersToInvoke);
    }
    prepareTransportOptions(clientOptions) {
        const result = {
            correlationId: clientOptions.correlationId || this.messageHandlingContext.correlationId,
            attributes: clientOptions.attributes,
            stickyAttributes: {
                ...clientOptions.stickyAttributes,
                ...this.messageHandlingContext.stickyAttributes
            }
        };
        return result;
    }
}
async function dispatchMessageToHandler(rawMessage, handlerRegistration) {
    const container = handlerRegistration.defaultContainer;
    const childContainer = container.createChild();
    childContainer
        .bind(BUS_INTERNAL_SYMBOLS.RawMessage)
        .toConstantValue(rawMessage);
    childContainer
        .bind(BUS_SYMBOLS.MessageHandlingContext)
        .toConstantValue(rawMessage.attributes);
    const sessionScopeBinder = container.get(BUS_INTERNAL_SYMBOLS.SessionScopeBinder);
    // tslint:disable-next-line:no-unsafe-any
    sessionScopeBinder(childContainer.bind.bind(childContainer));
    const handler = handlerRegistration.resolveHandler(childContainer);
    return handler.handle(rawMessage.domainMessage, rawMessage.attributes);
}
DI.set(BUS, ServiceBus);
//# sourceMappingURL=Bus.js.map