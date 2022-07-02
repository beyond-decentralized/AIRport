export interface IUser {
    id?: number;
    email?: string;
    passwordHash?: string;
    ranking?: number;
    username?: string;
    GUID?: string;
}
export interface AirEntityUuId {
    repository?: {
        GUID?: string;
    };
    actor?: {
        GUID?: string;
        user?: IUser;
    };
    actorRecordId?: number;
}
export interface IAirEntityUtils {
    getCreatedBy(idObject: AirEntityUuId): IUser;
    encodeUuId(idObject: AirEntityUuId): string;
    parseEGUID(idString: string): AirEntityUuId;
    setUuId(idString: string, airEntity: AirEntityUuId): void;
}
export declare class AirEntityUtils implements IAirEntityUtils {
    getCreatedBy(airEntity: AirEntityUuId): IUser;
    encodeUuId(idObject: AirEntityUuId): string;
    parseEGUID(idString: string): AirEntityUuId;
    setUuId(idString: string, airEntity: AirEntityUuId): void;
}
//# sourceMappingURL=AirEntityUuId.d.ts.map