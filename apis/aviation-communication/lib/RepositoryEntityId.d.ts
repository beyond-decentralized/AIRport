export interface RepositoryEntityId {
    repository: {
        id?: number;
        uuId?: string;
    };
    actor: {
        id?: number;
        uuId?: string;
    };
    actorRecordId: number;
}
export declare function parseId(idString: string): RepositoryEntityId;
export declare function encodeId(idObject: RepositoryEntityId): string;
export declare function setId(idString: string, repositoryEntity: RepositoryEntityId): void;
//# sourceMappingURL=RepositoryEntityId.d.ts.map