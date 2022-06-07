export interface IUser {
    id: number;
    email?: string;
    passwordHash?: string;
    ranking?: number;
    username?: string;
    uuId?: string;
}
export interface RepositoryEntityId {
    repository: {
        uuId?: string;
    };
    actor: {
        uuId?: string;
        user?: IUser;
    };
    actorRecordId: number;
}
export interface IRepositoryEntityUtils {
    getCreatedBy(idObject: RepositoryEntityId): IUser;
    encodeUuId(idObject: RepositoryEntityId): string;
    parseUuId(idString: string): RepositoryEntityId;
    setUuId(idString: string, repositoryEntity: RepositoryEntityId): void;
}
export declare class RepositoryEntityUtils implements IRepositoryEntityUtils {
    getCreatedBy(repositoryEntity: RepositoryEntityId): IUser;
    encodeUuId(idObject: RepositoryEntityId): string;
    parseUuId(idString: string): RepositoryEntityId;
    setUuId(idString: string, repositoryEntity: RepositoryEntityId): void;
}
//# sourceMappingURL=RepositoryEntityId.d.ts.map