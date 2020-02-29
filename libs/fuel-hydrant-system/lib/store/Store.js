import { SEQUENCE_GENERATOR } from '@airport/check-in';
import { DI } from '@airport/di';
import { STORE_DRIVER, StoreType } from '@airport/ground-control';
/**
 * Created by Papa on 5/28/2016.
 */
export async function setStoreDriver(storeType) {
    let StoreDriver;
    switch (storeType) {
        case StoreType.SQLITE_CORDOVA:
            const webSqlDriverFile = await import('./webSql/WebSqlDriver');
            StoreDriver = webSqlDriverFile.WebSqlDriver;
            break;
        case StoreType.SQLJS:
            const sqlJsDriverFile = await import('./sqlJs/SqlJsDriver');
            StoreDriver = sqlJsDriverFile.SqlJsDriver;
            break;
        default:
            throw new Error(`Unsupported StoreType: ${storeType}`);
    }
    const sqLiteSequenceGeneratorFile = await import('./sqLite/SqLiteSequenceGenerator');
    const SqLiteSequenceGenerator = sqLiteSequenceGeneratorFile.SqLiteSequenceGenerator;
    DI.set(STORE_DRIVER, StoreDriver);
    DI.set(SEQUENCE_GENERATOR, SqLiteSequenceGenerator);
}
//# sourceMappingURL=Store.js.map