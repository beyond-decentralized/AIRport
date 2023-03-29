import { ILastIds, JsonApplicationWithLastIds } from "@airport/air-traffic-control";
import { IMessage, Message_Domain } from "@airport/aviation-communication";
import {
    DbApplicationVersion,
    DbApplication_FullName,
    DbDomain,
    PortableQuery
} from "@airport/ground-control";

export interface IInitializeConnectionMessage
    extends IMessage {
    jsonApplication: JsonApplicationWithLastIds
    returnedValue?: ILastIds
}

export interface IConnectionInitializedMessage
    extends IMessage {
    fullDbApplication_Name: DbApplication_FullName
}

export interface IPortableQueryMessage
    extends IMessage {
    portableQuery: PortableQuery
}

export interface IReadQueryMessage
    extends IPortableQueryMessage {
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
    extends IMessage {
    dbEntity: IMessageDbEntity
    entity: T
}

export interface IGetLatestApplicationVersionByDbApplication_NameMessage
    extends IMessage {
    fullDbApplication_Name: string
    returnedValue?: DbApplicationVersion
}

export interface IRetrieveDomainMessage
    extends IMessage {
    domainName: Message_Domain
    returnedValue?: DbDomain
}
