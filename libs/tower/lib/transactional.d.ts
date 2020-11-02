import { IStoreDriver } from '@airport/ground-control';
/**
 * Created by Papa on 4/3/2019.
 */
export declare function transactional<T>(callback: {
    (transaction: IStoreDriver): Promise<void>;
}): Promise<void>;
//# sourceMappingURL=transactional.d.ts.map