import { ILastIds, JsonApplicationWithLastIds } from "@airport/air-traffic-control";
import { ICrudMessage, IInternalMessage, IResponseMessage, ISubscriptionMessage, Message_Application, Message_Domain, Message_OriginOrDestination_Type } from "@airport/aviation-communication";
import {
    IApplicationVersion,
    Application_FullName,
    IDomain,
    PortableQuery
} from "@airport/ground-control";

export interface IInitializeConnectionMessage
    extends IInternalMessage, IResponseMessage<ILastIds> {
    jsonApplication: JsonApplicationWithLastIds
}

export interface IConnectionInitializedMessage
    extends IInternalMessage {
    fullApplication_Name: Application_FullName
}

export interface IPortableQueryMessage
    extends ICrudMessage {
    portableQuery: PortableQuery
}

export interface ISubscriptionPortableQueryMessage
    extends ISubscriptionMessage {
    portableQuery: PortableQuery
}

export interface IReadQueryMessage
    extends IPortableQueryMessage {
    repository?: {
        source: string
        GUID?: string
    }
}

export interface ISubscriptionReadQueryMessage
    extends ISubscriptionPortableQueryMessage {
    repository?: {
        source: string
        GUID?: string
    }
}

export interface IMessageDbEntity {
    _localId: number,
    _applicationVersionLocalId: number
}

export interface ISaveMessage<E, T = E | E[]>
    extends ICrudMessage {
    dbEntity: IMessageDbEntity
    entity: T
}

export interface IGetLatestApplicationVersionByApplication_NameMessage
    extends IInternalMessage, IResponseMessage<IApplicationVersion> {
    fullApplication_Name: string
}

export interface IRetrieveDomainMessage
    extends IInternalMessage, IResponseMessage<IDomain> {
    domainName: Message_Domain
}
