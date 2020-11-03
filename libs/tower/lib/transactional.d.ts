import { ITransaction } from './ITransaction';
/**
 * Created by Papa on 4/3/2019.
 */
export declare function transactional<T>(callback: {
    (transaction: ITransaction): Promise<void>;
}): Promise<void>;
//# sourceMappingURL=transactional.d.ts.map