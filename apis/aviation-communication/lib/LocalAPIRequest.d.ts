export interface ICoreLocalApiRequest {
    args: Array<boolean | number | string>;
    methodName?: string;
    objectName?: string;
}
export declare type LocalApiRequestCategoryType = 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady';
export interface ILocalAPIRequest<CategoryType = LocalApiRequestCategoryType> extends ICoreLocalApiRequest {
    __received__?: boolean;
    __receivedTime__?: number;
    application: string;
    category: CategoryType;
    domain: string;
    id: string;
    protocol: string;
    transactionId?: string;
}
//# sourceMappingURL=LocalAPIRequest.d.ts.map