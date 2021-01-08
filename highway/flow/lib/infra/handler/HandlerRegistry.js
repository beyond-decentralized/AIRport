import { DI } from '@airport/di';
import { isClassConstructor } from '@node-ts/bus-core';
// import { ClassConstructor, isClassConstructor } from '../util/class-constructor'
// import { Handler, HandlerPrototype, MessageType } from './handler'
import { decorate, injectable } from 'inversify';
import { serializeError } from 'serialize-error';
import { HANDLER_REGISTRY } from '../../tokens';
/**
 * An internal singleton that contains all registrations of messages to functions that handle
 * those messages.
 */
// @injectable()
export class HandlerRegistry {
    constructor() {
        this.handlerResolvers = [];
        this.logger = console;
    }
    // constructor(
    // 	// @inject(LOGGER_SYMBOLS.Logger) private readonly logger: Logger
    // ) {
    // }
    /**
     * Retrieves a list of all messages that have handler registrations
     */
    get messageSubscriptions() {
        return this.handlerResolvers;
    }
    /**
     * Registers that a function handles a particular message type
     * @param resolver A method that determines which messages should be forwarded to the handler
     * @param symbol A unique symbol to identify the binding of the message to the function
     * @param handler The function handler to dispatch messages to as they arrive
     * @param messageType The class type of message to handle
     * @param topicIdentifier Identifies the topic where the message is sourced from. This topic must exist
     * before being consumed as the library assumes it's managed externally
     */
    register(resolver, symbol, handler, messageType, topicIdentifier) {
        const handlerName = getHandlerName(handler);
        const handlerAlreadyRegistered = this.handlerResolvers.some(f => f.symbol === symbol);
        if (handlerAlreadyRegistered) {
            this.logger.warn(`Attempted to re-register a handler that's already registered`, { handlerName });
            return;
        }
        if (isClassConstructor(handler)) {
            try {
                // Ensure the handler is available for injection
                decorate(injectable(), handler);
                this.logger.trace(`Handler "${handler.name}" was missing the "injectable()" decorator. `
                    + `This has been added automatically`);
            }
            catch {
                // An error is expected here if the injectable() decorator was attached to the handler
            }
        }
        this.handlerResolvers.push({ messageType, resolver, symbol, handler, topicIdentifier });
        this.logger.info('Handler registered', { messageName: messageType ? messageType.name : undefined, handler: handlerName });
    }
    /**
     * Gets all registered message handlers for a given message name
     * @param message A message instance to resolve handlers for
     */
    get(message) {
        const resolvedHandlers = this.handlerResolvers
            .filter(resolvers => resolvers.resolver(message));
        if (resolvedHandlers.length === 0) {
            // No handlers for the given message
            this.logger.warn(`No handlers were registered for message. ` +
                `This could mean that either the handlers haven't been registered with bootstrap.registerHandler(), ` +
                `or that the underlying transport is subscribed to messages that aren't handled and should be removed.`, { receivedMessage: message });
            return [];
        }
        return resolvedHandlers.map(h => ({
            defaultContainer: this.container,
            resolveHandler: (container) => {
                this.logger.debug(`Resolving handlers for message.`, { receivedMessage: message });
                try {
                    return container.get(h.symbol);
                }
                catch (error) {
                    this.logger.error('Could not resolve handler from the IoC container.', {
                        receivedMessage: message,
                        error: serializeError(error)
                    });
                    throw error;
                }
            }
        }));
    }
    /**
     * Gets the type consturctor for a given message name.
     * This is used for deserialization
     * @param message A message instance to resolve handlers for
     */
    getMessageType(message) {
        const resolvedHandlers = this.handlerResolvers
            .filter(resolvers => resolvers.resolver(message));
        if (resolvedHandlers.length === 0) {
            return undefined;
        }
        // Assuming one message name is only associated with one message type
        return resolvedHandlers[0].messageType;
    }
    /**
     * Binds message handlers into the IoC container. All handlers should be stateless and are
     * bound in a transient scope.
     */
    bindHandlersToContainer(container) {
        this.container = container;
        this.bindHandlers();
    }
    /**
     * Retrieves the identity of a handler. This is synonymous with a the handler's class name.
     */
    getHandlerId(handler) {
        return handler.constructor.name;
    }
    bindHandlers() {
        this.handlerResolvers.forEach(handlerRegistration => {
            const handlerName = getHandlerName(handlerRegistration.handler);
            this.logger.debug('Binding handler to message', { handlerName });
            if (isClassConstructor(handlerRegistration.handler)) {
                this.container
                    .bind(handlerRegistration.symbol)
                    .to(handlerRegistration.handler)
                    .inTransientScope();
            }
            else {
                this.container
                    .bind(handlerRegistration.symbol)
                    .toDynamicValue(handlerRegistration.handler)
                    .inTransientScope();
            }
        });
    }
}
DI.set(HANDLER_REGISTRY, HandlerRegistry);
function getHandlerName(handler) {
    return isClassConstructor(handler)
        ? handler.prototype.constructor.name
        : handler.constructor.name;
}
//# sourceMappingURL=HandlerRegistry.js.map