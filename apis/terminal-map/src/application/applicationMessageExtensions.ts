import { ILastIds, JsonApplicationWithLastIds } from "@airport/air-traffic-control";
import { ICrudMessage, IInternalMessage, Message_Domain } from "@airport/aviation-communication";
import {
    DbApplicationVersion,
    DbApplication_FullName,
    DbDomain,
    PortableQuery
} from "@airport/ground-control";

export interface IInitializeConnectionMessage
    extends IInternalMessage {
    jsonApplication: JsonApplicationWithLastIds
    returnedValue?: ILastIds
}

export interface IConnectionInitializedMessage
    extends IInternalMessage {
    fullDbApplication_Name: DbApplication_FullName
}

export interface IPortableQueryMessage
    extends ICrudMessage {
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
    extends ICrudMessage {
    dbEntity: IMessageDbEntity
    entity: T
}

export interface IGetLatestApplicationVersionByDbApplication_NameMessage
    extends IInternalMessage {
    fullDbApplication_Name: string
    returnedValue?: DbApplicationVersion
}

export interface IRetrieveDomainMessage
    extends IInternalMessage {
    domainName: Message_Domain
    returnedValue?: DbDomain
}
