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
        id?: number;
        uuId?: string;
    };
    actor: {
        id?: number;
        uuId?: string;
        user?: IUser;
    };
    actorRecordId: number;
}
export interface IRepositoryEntityUtils {
    getCreatedBy(idObject: RepositoryEntityId): IUser;
    encodeId(idObject: RepositoryEntityId): string;
    encodeUuId(idObject: RepositoryEntityId): string;
    parseId(idString: string): RepositoryEntityId;
    parseUuId(idString: string): RepositoryEntityId;
    setId(idString: string, repositoryEntity: RepositoryEntityId): void;
    setUuId(idString: string, repositoryEntity: RepositoryEntityId): void;
}
export declare class RepositoryEntityUtils implements IRepositoryEntityUtils {
    getCreatedBy(repositoryEntity: RepositoryEntityId): IUser;
    encodeId(idObject: RepositoryEntityId): string;
    encodeUuId(idObject: RepositoryEntityId): string;
    parseId(idString: string): RepositoryEntityId;
    parseUuId(idString: string): RepositoryEntityId;
    setId(idString: string, repositoryEntity: RepositoryEntityId): void;
    setUuId(idString: string, repositoryEntity: RepositoryEntityId): void;
}
//# sourceMappingURL=RepositoryEntityId.d.ts.map