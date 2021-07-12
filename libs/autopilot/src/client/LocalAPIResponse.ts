export enum LocalAPIResponseType {
    QUERY,
    SAVE
}

export interface ILocalAPIResponse {
    payload: string;
    type: LocalAPIResponseType;
}
