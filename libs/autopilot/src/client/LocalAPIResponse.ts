export enum LocalAPIResponseType {
    QUERY,
    SAVE
}

export interface ILocalAPIResponse {
    errorMessage: string
    payload: any
    type: LocalAPIResponseType
}
