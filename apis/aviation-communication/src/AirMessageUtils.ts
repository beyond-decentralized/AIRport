import { Injected } from "@airport/direction-indicator";
import { IApiCallRequestMessage } from "./IApiCallMessage";
import { CRUD_Message_Type, ICrudMessage, IInternalMessage, IMessage, INTERNAL_Message_Type, ISubscriptionMessage, IMessageOriginOrDestination, Message_OriginOrDestination_Type, Message_Type_Group, SUBSCRIPTION_Message_Type } from "./IMessage";

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
    ): void

    validateIncomingMessage(
        message: IMessage
    ): boolean

    validateUiBoundMessage(
        message: IMessage
    ): boolean

}

@Injected()
export class AirMessageUtils
    implements IAirMessageUtils {

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
                    case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBE:
                        return true
                    default:
                        return false
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
    ): void {
        delete message.__received__
        delete message.__receivedTime__
    }

    isFromValidFrameworkDomain(
        origin: string
    ): boolean {
        if (!origin.startsWith("https")) {
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
        if(message.destination.type !== Message_OriginOrDestination_Type.USER_INTERFACE) {
            return false
        }

        return true
    }

    private validateApplicationInfo(
        message: IMessage
    ): void {
        this.validateDomainAndApplication(
            message,
            message.origin,
            'origin'
        )
        this.validateDomainAndApplication(
            message,
            message.destination,
            'destination'
        );

        switch (message.origin.type) {
            case Message_OriginOrDestination_Type.APPLICATION: {
                this.validateApplicationMessageType(message)
                break;
            }
            case Message_OriginOrDestination_Type.DATABASE: {
                this.validateDatabaseMessageType(message)
                break;
            }
            case Message_OriginOrDestination_Type.FRAMEWORK: {
                this.validateFrameworkMessageType(message)
                break;
            }
            case Message_OriginOrDestination_Type.USER_INTERFACE: {
                this.validateUiMessageType(message)
                break;
            }
        }
    }

    private validateApplicationMessageType(
        message: IMessage
    ): void {
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
                    case CRUD_Message_Type.UPDATE_VALUES:
                        break
                    default:
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
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
                    case INTERNAL_Message_Type.RETRIEVE_DOMAIN:
                        break
                    default:
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                }
                break
            }
            case Message_Type_Group.SUBSCRIPTION: {
                switch ((message as ISubscriptionMessage).type) {
                    case SUBSCRIPTION_Message_Type.API_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.API_SUBSCRIPTION_DATA:
                    case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SEARCH_ONE_UNSUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SEARCH_UNSUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SUBSCRIPTION_PING:
                        break
                    default:
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                }
                break
            }
            default: {
                throw new Error(this.getErrorMessage(`Unexpected
    message.typeGroup: ${message.typeGroup}`, message))
            }
        }
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
                    case CRUD_Message_Type.UPDATE_VALUES:
                        break
                    default:
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                }
                break
            }
            case Message_Type_Group.SUBSCRIPTION: {
                switch ((message as ISubscriptionMessage).type) {
                    case SUBSCRIPTION_Message_Type.SEARCH_ONE_SUBSCRIBTION_DATA:
                    case SUBSCRIPTION_Message_Type.SEARCH_SUBSCRIBTION_DATA:
                        break
                    default:
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
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
                    case INTERNAL_Message_Type.IS_CONNECTION_READY:
                    case INTERNAL_Message_Type.RETRIEVE_DOMAIN:
                        break
                    default:
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
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
    ): void {
        switch (message.typeGroup) {
            case Message_Type_Group.API: {
                break
            }
            case Message_Type_Group.SUBSCRIPTION: {
                switch ((message as ISubscriptionMessage).type) {
                    case SUBSCRIPTION_Message_Type.API_SUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.API_UNSUBSCRIBE:
                    case SUBSCRIPTION_Message_Type.SUBSCRIPTION_PING:
                        break
                    default:
                        throw new Error(this.getErrorMessage(`Unexpected
    message.type: ${(message as ISubscriptionMessage).type}`, message))
                }
                break
            }
            default: {
                throw new Error(this.getErrorMessage(`Unexpected
    message.typeGroup: ${message.typeGroup}`, message))
            }
        }
    }

    private validateDomainAndApplication<M extends IMessage>(
        message: M,
        originOrDestination: IMessageOriginOrDestination,
        type: 'origin' | 'destination',
    ): void {
        if (!this.isValidDomainNameString(
            originOrDestination.domain
        )) {
            throw new Error(this.getErrorMessage(`Invalid ${type} domain`, message))
        }
        if (!this.isValidApplicationNameString(
            originOrDestination.app
        )) {
            throw new Error(this.getErrorMessage(`Invalid ${type} application`, message))
        }
        if (originOrDestination.domain.indexOf('.') > -1) {
            throw new Error(this.getErrorMessage(`Invalid ${type} Domain name - cannot have periods that would point to invalid subdomains`, message))
        }
        if (originOrDestination.app.indexOf('.') > -1) {
            throw new Error(this.getErrorMessage(`Invalid ${type} Application name - cannot have periods that would point to invalid subdomains`, message))
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
