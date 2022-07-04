export interface IUser {
    _localId?: number;
    email?: string;
    passwordHash?: string;
    ranking?: number;
    username?: string;
    GUID?: string;
}
export interface AirEntityId {
    repository?: {
        GUID?: string;
    };
    actor?: {
        GUID?: string;
        user?: IUser;
    };
    _actorRecordId?: number;
}
export interface IAirEntityUtils {
    getCreatedBy(idObject: AirEntityId): IUser;
    encodeId(idObject: AirEntityId): string;
    parseEGUID(idString: string): AirEntityId;
    setId(idString: string, airEntity: AirEntityId): void;
}
export declare class AirEntityUtils implements IAirEntityUtils {
    getCreatedBy(airEntity: AirEntityId): IUser;
    encodeId(idObject: AirEntityId): string;
    parseEGUID(idString: string): AirEntityId;
    setId(idString: string, airEntity: AirEntityId): void;
}
//# sourceMappingURL=AirEntityUtils.d.ts.map