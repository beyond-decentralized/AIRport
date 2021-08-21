import { IContext } from '@airport/di';
import { ITransaction } from '@airport/terminal-map';
/**
 * Created by Papa on 4/3/2019.
 */
export declare function transactional<T>(callback: {
    (transaction: ITransaction): Promise<void> | void;
}, context?: IContext): Promise<void>;
//# sourceMappingURL=transactional.d.ts.map