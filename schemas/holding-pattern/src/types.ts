export type Repository_AgeSuitability = 0 | 7 | 13 | 18
export type Repository_CreatedAt = Date;
export type Repository_GUID = string;
export type Repository_Immutable = boolean;
export type Repository_LocalId = number;
export type Repository_Name = string;
export type Repository_Source = string;
export type Repository_UiEntryUri = string;

export interface IRepositoryIdentifier {
    source: Repository_Source;
    GUID: Repository_GUID;
}