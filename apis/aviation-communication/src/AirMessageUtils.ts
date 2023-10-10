import { Injected } from "@airport/direction-indicator";
import { IApiCallRequestMessage } from "./IApiCallMessage";
import { CRUD_Message_Type, ICrudMessage, IInternalMessage, IMessage, INTERNAL_Message_Type, ISubscriptionMessage, IMessageOriginOrDestination, Message_OriginOrDestination_Type, Message_Type_Group, SUBSCRIPTION_Message_Type, Message_Direction, Message_Leg, Message_Application } from "./IMessage";
import { v4 as guidv4 } from "uuid";
// import { ProgressivePair } from "@beyond-decentralized/pson";
// import PSON from "@beyond-decentralized/pson";
// import ByteBuffer from "bytebuffer";

export interface IAirMessageUtils {

    getMessageReadySendAttributes(): {
        __received__: boolean,
        __receivedTime__: number
    }

    isFromValidFrameworkDomain(
        origin: string
    ): boolean

    isMessageAlreadyReceived(
        message: IMessage | IApiCallRequestMessage
    ): boolean

    isObservableMessage(
        message: IMessage
    ): boolean

    markMessageAsReceived(
        message: IMessage
    ): void

    prepMessageToSend(
        message: IMessage
    ): any

    unpackageRecievedMessage(
        data: any
    ): IMessage

    validateIncomingMessage(
        message: IMessage
    ): boolean

    validateUiBoundMessage(
        message: IMessage
    ): boolean

    getInternalMessage(
        type: INTERNAL_Message_Type,
        originType?: Message_OriginOrDestination_Type
    ): IInternalMessage

}

@Injected()
export class AirMessageUtils
    implements IAirMessageUtils {

    // initialDictionary = []
    // pson: ProgressivePair

    // constructor() {
    //     this.pson = new PSON.StaticPair(this.initialDictionary, {});
    // }

    getMessageReadySendAttributes(): {
        __received__: boolean,
        __receivedTime__: number
    } {
        return {
            __received__: false,
            __receivedTime__: null,
        }
    }

    isMessageAlreadyReceived(
        message: IMessage
    ): boolean {
        if (!(message instanceof Object) || message.__received__) {
            console.error(`Message already recieved:
${JSON.stringify(message, null, 2)}
`)
            return true
        }

        return false
    }

    isObservableMessage(
        message: IMessage
    ): boolean {
        switch (message.typeGroup) {
            case Message_Type_Group.API: {
                return false
            }
            case Message_Type_Group.CRUD: {
                return false
            }
            case Message_Type_Group.INTERNAL: {
                return false
            }
            case Message_Type_Group.SUBSCRIPTION: {
                switch ((message as ISubscriptionMessage).type) {
                    case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBE: {
                        return true
                    }
                    default: {
                        return false
                    }
                }
            }
            default: {
                throw new Error(this.getErrorMessage(`Unexpected
    message.typeGroup: ${message.typeGroup}`, message))
            }
        }
    }

    markMessageAsReceived(
        message: IMessage
    ): void {
        message.__received__ = true
        const receivedDate = new Date()
        message.__receivedTime__ = receivedDate.getTime()
    }

    prepMessageToSend(
        message: IMessage
    ): any {
        delete message.__received__
        delete message.__receivedTime__

        // FIXME: extend this class for web-environments this once NgZone is removed - no need to serialize in the browser environment
        // and overwride with a basic return of original data
        // return this.pson.encode(message)

        return message
    }

    unpackageRecievedMessage(
        data: any
    ): IMessage {
        // if (data instanceof ByteBuffer
        //     || data instanceof ArrayBuffer
        //     || (data.buffer instanceof ArrayBuffer
        //         && data.view instanceof Uint8Array
        //         && typeof data.limit === 'number')) {
        //     return this.pson.decode(data)
        // }
        return data
    }

    isFromValidFrameworkDomain(
        origin: string
    ): boolean {
        if (!origin.startsWith("https:")) {
            console.error(`Framework is not running via HTTPS protocol`)
            return false
        }

        return true
    }

    validateIncomingMessage(
        message: IMessage
    ): boolean {
        if (this.isMessageAlreadyReceived(message)) {
            return false
        }

        this.validateApplicationInfo(message)

        this.markMessageAsReceived(message)

        return true
    }

    validateUiBoundMessage(
        message: IMessage
    ): boolean {
        if (message.destination.domain !== location.host) {
            return false
        }
        if (message.destination.type !== Message_OriginOrDestination_Type.USER_INTERFACE) {
            return false
        }

        return true
    }

    getInternalMessage(
        type: INTERNAL_Message_Type,
        originType: Message_OriginOrDestination_Type = Message_OriginOrDestination_Type.USER_INTERFACE
    ): IInternalMessage {
        return {
            direction: Message_Direction.REQUEST,
            id: guidv4(),
            isAIRportMessage: true,
            messageLeg: Message_Leg.TO_HUB,
            origin: {
                app: 'UserInterface',
                domain: location.host,
                protocol: location.protocol,
                type: originType
            },
            type,
            typeGroup: Message_Type_Group.INTERNAL,
            dropIfConnectionNotReady: true
        }
    }

    private validateApplicationInfo(
        message: IMessage
    ): void {
        this.validateDomainAndApplication(
            message,
            message.origin,
            'origin'
        )

        let messageHasADestination = true
        switch (message.origin.type) {
            case Message_OriginOrDestination_Type.APPLICATION: {
                messageHasADestination = this.validateApplicationMessageType(message)
                break
            }
            case Message_OriginOrDestination_Type.DATABASE: {
                this.validateDatabaseMessageType(message)
                break
            }
            case Message_OriginOrDestination_Type.FRAMEWORK: {
                this.validateFrameworkMessageType(message)
                break
            }
            case Message_OriginOrDestination_Type.USER_INTERFACE: {
                messageHasADestination = this.validateUiMessageType(message)
                break
            }
            default: {
                throw new Error(`Invalid message.origin.type: ${message.origin.type}`)
            }
        }

        if (messageHasADestination) {
            this.validateDomainAndApplication(
                message,
                message.destination,
                'destination'
            );
        }
    }

    private validateApplicationMessageType(
        message: IMessage
    ): boolean {
        let messageHasADestination = false

        switch (message.typeGroup) {
            case Message_Type_Group.API: {
                break
            }
            case Message_Type_Group.CRUD: {
                switch ((message as ICrudMessage).type) {
                    case CRUD_Message_Type.DELETE_WHERE:
                    case CRUD_Message_Type.FIND:
                    case CRUD_Message_Type.FIND_ONE:
                    case CRUD_Message_Type.INSERT_VALUES:
                    case CRUD_Message_Type.INSERT_VALUES_GET_IDS:
                    case CRUD_Message_Type.SAVE:
                    case CRUD_Message_Type.UPDATE_VALUES: {
                        break
                    }
                    default: {
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                    }
                }
                break
            }
            case Message_Type_Group.INTERNAL: {
                switch ((message as IInternalMessage).type) {
                    case INTERNAL_Message_Type.APP_INITIALIZED:
                    case INTERNAL_Message_Type.APP_INITIALIZING:
                    case INTERNAL_Message_Type.CONNECTION_IS_READY:
                    case INTERNAL_Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME:
                    case INTERNAL_Message_Type.IS_CONNECTION_READY:
                    case INTERNAL_Message_Type.RETRIEVE_DOMAIN: {
                        break
                    }
                    default: {
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                    }
                }
                break
            }
            case Message_Type_Group.SUBSCRIPTION: {
                switch ((message as ISubscriptionMessage).type) {
                    case SUBSCRIPTION_Message_Type.API_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA:
                    case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE:
                        messageHasADestination = true
                    case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIPTION_DATA:
                    case SUBSCRIPTION_Message_Type.SEARCH_ONE_UNSUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIPTION_DATA:
                    case SUBSCRIPTION_Message_Type.SEARCH_UNSUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SUBSCRIPTION_PING: {
                        break
                    }
                    default: {
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                    }
                }
                break
            }
            default: {
                throw new Error(this.getErrorMessage(`Unexpected
    message.typeGroup: ${message.typeGroup}`, message))
            }
        }

        return messageHasADestination
    }

    private validateDatabaseMessageType(
        message: IMessage
    ): void {
        switch (message.typeGroup) {
            case Message_Type_Group.CRUD: {
                switch ((message as ICrudMessage).type) {
                    case CRUD_Message_Type.DELETE_WHERE:
                    case CRUD_Message_Type.FIND:
                    case CRUD_Message_Type.FIND_ONE:
                    case CRUD_Message_Type.INSERT_VALUES:
                    case CRUD_Message_Type.INSERT_VALUES_GET_IDS:
                    case CRUD_Message_Type.SAVE:
                    case CRUD_Message_Type.UPDATE_VALUES: {
                        break
                    }
                    default: {
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                    }
                }
                break
            }
            case Message_Type_Group.SUBSCRIPTION: {
                switch ((message as ISubscriptionMessage).type) {
                    case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIPTION_DATA:
                    case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIPTION_DATA: {
                        break
                    }
                    default: {
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                    }
                }
                break
            }
            default: {
                throw new Error(this.getErrorMessage(`Unexpected
    message.typeGroup: ${message.typeGroup}`, message))
            }
        }
    }

    private validateFrameworkMessageType(
        message: IMessage
    ): void {
        switch (message.typeGroup) {
            case Message_Type_Group.INTERNAL: {
                switch ((message as IInternalMessage).type) {
                    case INTERNAL_Message_Type.APP_INITIALIZED:
                    case INTERNAL_Message_Type.APP_INITIALIZING:
                    case INTERNAL_Message_Type.CONNECTION_IS_READY:
                    case INTERNAL_Message_Type.GET_LATEST_APPLICATION_VERSION_BY_APPLICATION_NAME:
                    case INTERNAL_Message_Type.RETRIEVE_DOMAIN:
                    case INTERNAL_Message_Type.UI_GO_BACK:
                    case INTERNAL_Message_Type.UI_GO_FORWARD:
                    case INTERNAL_Message_Type.UI_URL_CHANGED: {
                        break
                    }
                    default: {
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                    }
                }
                break
            }
            default: {
                throw new Error(this.getErrorMessage(`Unexpected
    message.typeGroup: ${message.typeGroup}`, message))
            }
        }
    }

    private validateUiMessageType(
        message: IMessage
    ): boolean {
        let messageHasADestination = true

        switch (message.typeGroup) {
            case Message_Type_Group.API: {
                break
            }
            case Message_Type_Group.SUBSCRIPTION: {
                switch ((message as ISubscriptionMessage).type) {
                    case SUBSCRIPTION_Message_Type.API_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SUBSCRIPTION_PING: {
                        break
                    }
                    default: {
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                    }
                }
                break
            }
            case Message_Type_Group.INTERNAL: {
                switch ((message as IInternalMessage).type) {
                    case INTERNAL_Message_Type.IS_CONNECTION_READY:
                    case INTERNAL_Message_Type.UI_GO_BACK:
                    case INTERNAL_Message_Type.UI_GO_FORWARD:
                    case INTERNAL_Message_Type.UI_URL_CHANGED: {
                        break
                    }
                    default: {
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as IInternalMessage).type}`, message))
                    }
                }
                messageHasADestination = false
                break
            }
            default: {
                throw new Error(this.getErrorMessage(`Unexpected
    message.typeGroup: ${message.typeGroup}`, message))
            }
        }

        return messageHasADestination
    }

    private validateDomainAndApplication<M extends IMessage>(
        message: M,
        originOrDestination: IMessageOriginOrDestination,
        type: 'origin' | 'destination',
    ): void {
        if (!this.isValidDomainNameString(originOrDestination.domain)) {
            throw new Error(this.getErrorMessage(`Invalid ${type} domain`, message))
        }

        switch (originOrDestination.type) {
            case Message_OriginOrDestination_Type.APPLICATION: {
                if (!this.isValidApplicationNameString(originOrDestination.app)) {
                    throw new Error(this.getErrorMessage(`Invalid ${type} application`, message))
                }
                break;
            }
        }
    }

    private getErrorMessage<M extends IMessage>(
        errorMessage: string,
        message: M,
    ) {
        return `${errorMessage}
Message:
    ${JSON.stringify(message, null, 2)}
        `
    }

    private isValidApplicationNameString(
        applicationName: string
    ): boolean {
        return typeof applicationName === 'string'
            && applicationName.length >= 3
    }

    private isValidDomainNameString(
        domainName: string
    ): boolean {
        return typeof domainName === 'string'
            && domainName.length >= 3
    }

}
