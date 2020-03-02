"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_in_1 = require("@airport/check-in");
const di_1 = require("@airport/di");
const ground_control_1 = require("@airport/ground-control");
/**
 * Created by Papa on 5/28/2016.
 */
async function setStoreDriver(storeType) {
    let StoreDriver;
    switch (storeType) {
        case ground_control_1.StoreType.SQLITE_CORDOVA:
            const webSqlDriverFile = await Promise.resolve().then(() => require('./webSql/WebSqlDriver'));
            StoreDriver = webSqlDriverFile.WebSqlDriver;
            break;
        case ground_control_1.StoreType.SQLJS:
            const sqlJsDriverFile = await Promise.resolve().then(() => require('./sqlJs/SqlJsDriver'));
            StoreDriver = sqlJsDriverFile.SqlJsDriver;
            break;
        default:
            throw new Error(`Unsupported StoreType: ${storeType}`);
    }
    const sqLiteSequenceGeneratorFile = await Promise.resolve().then(() => require('./sqLite/SqLiteSequenceGenerator'));
    const SqLiteSequenceGenerator = sqLiteSequenceGeneratorFile.SqLiteSequenceGenerator;
    di_1.DI.set(ground_control_1.STORE_DRIVER, StoreDriver);
    di_1.DI.set(check_in_1.SEQUENCE_GENERATOR, SqLiteSequenceGenerator);
}
exports.setStoreDriver = setStoreDriver;
//# sourceMappingURL=Store.js.map