import { ClassConstructor, Handler, MessageType } from '@node-ts/bus-core';
import { Message } from '@node-ts/bus-messages';
import { Container, interfaces } from 'inversify';
declare type HandlerType = ClassConstructor<Handler<Message>> | ((context: interfaces.Context) => Handler<Message>);
export interface HandlerRegistration<TMessage extends MessageType> {
    defaultContainer: Container;
    resolveHandler(handlerContextContainer: Container): Handler<TMessage>;
}
export interface HandlerResolver {
    handler: HandlerType;
    symbol: symbol;
    topicIdentifier: string | undefined;
    messageType: ClassConstructor<Message> | undefined;
    resolver(message: unknown): boolean;
}
/**
 * An internal singleton that contains all registrations of messages to functions that handle
 * those messages.
 */
export declare class HandlerRegistry {
    private container;
    private handlerResolvers;
    private logger;
    /**
     * Retrieves a list of all messages that have handler registrations
     */
    get messageSubscriptions(): HandlerResolver[];
    /**
     * Registers that a function handles a particular message type
     * @param resolver A method that determines which messages should be forwarded to the handler
     * @param symbol A unique symbol to identify the binding of the message to the function
     * @param handler The function handler to dispatch messages to as they arrive
     * @param messageType The class type of message to handle
     * @param topicIdentifier Identifies the topic where the message is sourced from. This topic must exist
     * before being consumed as the library assumes it's managed externally
     */
    register<TMessage extends MessageType = MessageType>(resolver: (message: TMessage) => boolean, symbol: symbol, handler: HandlerType, messageType?: ClassConstructor<Message>, topicIdentifier?: string): void;
    /**
     * Gets all registered message handlers for a given message name
     * @param message A message instance to resolve handlers for
     */
    get<TMessage extends MessageType>(message: TMessage): HandlerRegistration<TMessage>[];
    /**
     * Gets the type consturctor for a given message name.
     * This is used for deserialization
     * @param message A message instance to resolve handlers for
     */
    getMessageType<TMessage extends MessageType>(message: TMessage): HandlerResolver['messageType'];
    /**
     * Binds message handlers into the IoC container. All handlers should be stateless and are
     * bound in a transient scope.
     */
    bindHandlersToContainer(container: Container): void;
    /**
     * Retrieves the identity of a handler. This is synonymous with a the handler's class name.
     */
    getHandlerId(handler: Handler<Message>): string;
    private bindHandlers;
}
export {};
//# sourceMappingURL=HandlerRegistry.d.ts.map