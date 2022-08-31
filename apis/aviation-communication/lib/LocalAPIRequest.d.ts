export interface ICoreLocalApiRequest {
    application: string;
    args: Array<boolean | number | string>;
    domain: string;
    methodName: string;
    objectName: string;
}
export declare type LocalApiRequestCategoryType = 'FromClient' | 'FromClientRedirected' | 'IsConnectionReady';
export interface ILocalAPIRequest<CategoryType = LocalApiRequestCategoryType, A = any> extends ICoreLocalApiRequest {
    __received__?: boolean;
    __receivedTime__?: number;
    actor: A;
    category: CategoryType;
    hostDomain: string;
    hostProtocol: string;
    id: string;
    protocol: string;
    transactionId?: string;
}
//# sourceMappingURL=LocalAPIRequest.d.ts.map