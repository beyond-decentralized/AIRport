import { Injected } from "@airport/direction-indicator";
import { IApiCallRequestMessage } from "./IApiCallMessage";
import { Message_Direction, IMessage, Message_Type } from "./IMessage";

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
        type: Message_Type
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
        message: IMessage | IApiCallRequestMessage
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
        type: Message_Type
    ): boolean {
        switch (type) {
            case Message_Type.API_SUBSCRIBE:
            case Message_Type.API_SUBSCRIBTION_DATA:
            case Message_Type.API_UNSUBSCRIBE:
            case Message_Type.SEARCH_ONE_SUBSCRIBE:
            case Message_Type.SEARCH_ONE_SUBSCRIBTION_DATA:
            case Message_Type.SEARCH_ONE_UNSUBSCRIBE:
            case Message_Type.SEARCH_SUBSCRIBE:
            case Message_Type.SEARCH_SUBSCRIBTION_DATA:
            case Message_Type.SEARCH_UNSUBSCRIBE:
                return true
            default:
                return false
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

    validateIncomingMessage(
        message: IMessage
    ): boolean {
        if (this.isMessageAlreadyReceived(message)) {
            return false
        }

        if (!this.hasValidApplicationInfo(message)) {
            return false
        }

        this.markMessageAsReceived(message)

        return true
    }

    private hasValidApplicationInfo(
        message: IMessage
    ): boolean {
        let application, domain, messageType = 'INTERNAL'
        // All requests need to have a application signature
        // to know what application is being communicated to/from
        switch (message.direction) {
            case Message_Direction.FROM_CLIENT: {
                if (!this.isValidDomainNameString(
                    message.serverDomain
                ) || !this.isValidApplicationNameString(
                    message.serverApplication
                )) {
                    console.error(`FROM_CLIENT Message does not have valid client domain and application:
${JSON.stringify(message, null, 2)}
`)
                    return false
                }
                domain = message.serverDomain
                application = message.serverApplication
                break
            }
            case Message_Direction.TO_CLIENT:
                messageType = 'TO_CLIENT'
            case Message_Direction.INTERNAL: {
                if (!this.isValidDomainNameString(
                    message.clientDomain
                ) || !this.isValidApplicationNameString(
                    message.clientApplication
                )) {
                    console.error(`${messageType} Message does not have valid server domain and application:
${JSON.stringify(message, null, 2)}
`)
                    return false
                }
                domain = message.clientDomain
                application = message.clientApplication
                break
            }
            default: {
                console.warn(`Unexpected message direction '${message.direction}'
${JSON.stringify(message, null, 2)}
`)
                return false
            }
        }
        if (domain.indexOf('.') > -1) {
            console.error(`Invalid Domain name - cannot have periods that would point to invalid subdomains:
${domain}
`)
            return false
        }
        if (application.indexOf('.') > -1) {
            console.error(`Invalid Application name - cannot have periods that would point to invalid subdomains:
${application}
`)
            return false
        }

        return true
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
