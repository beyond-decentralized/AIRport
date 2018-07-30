/**
 * Created by Papa on 1/5/2016.
 */
export declare abstract class PromiseHttp {
    constructor();
    abstract get(url: string, requestOptionsArgs?: any): Promise<any>;
    abstract post(url: string, data: string, requestOptionsArgs?: any): Promise<any>;
    private asPromise<T>(observable);
}
