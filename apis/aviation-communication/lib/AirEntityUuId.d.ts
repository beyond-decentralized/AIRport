export interface IUser {
    id?: number;
    email?: string;
    passwordHash?: string;
    ranking?: number;
    username?: string;
    uuId?: string;
}
export interface AirEntityUuId {
    repository?: {
        uuId?: string;
    };
    actor?: {
        uuId?: string;
        user?: IUser;
    };
    actorRecordId?: number;
}
export interface IAirEntityUtils {
    getCreatedBy(idObject: AirEntityUuId): IUser;
    encodeUuId(idObject: AirEntityUuId): string;
    parseUuId(idString: string): AirEntityUuId;
    setUuId(idString: string, airEntity: AirEntityUuId): void;
}
export declare class AirEntityUtils implements IAirEntityUtils {
    getCreatedBy(airEntity: AirEntityUuId): IUser;
    encodeUuId(idObject: AirEntityUuId): string;
    parseUuId(idString: string): AirEntityUuId;
    setUuId(idString: string, airEntity: AirEntityUuId): void;
}
//# sourceMappingURL=AirEntityUuId.d.ts.map