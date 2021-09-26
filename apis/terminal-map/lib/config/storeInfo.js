import { StoreType } from '@airport/ground-control';
export var store;
(function (store) {
    var type;
    (function (type) {
        type.WEB_SQL = 'WEB_SQL';
        type.SQL_JS = 'SQL_JS';
        function getName(localStoreType) {
            switch (localStoreType) {
                case StoreType.SQLITE:
                case StoreType.WEB_SQL:
                    return type.WEB_SQL;
                case StoreType.SQLJS:
                    return type.SQL_JS;
                default:
                    throw new Error(`Unsupported Local Store Type: ${localStoreType}`);
            }
        }
        type.getName = getName;
        function getValue(localStoreTypeName) {
            switch (localStoreTypeName) {
                case type.WEB_SQL:
                    return StoreType.WEB_SQL;
                case type.SQL_JS:
                    return StoreType.SQLJS;
                default:
                    throw new Error(`Unsupported Local Store Type name: ${localStoreTypeName}`);
            }
        }
        type.getValue = getValue;
    })(type = store.type || (store.type = {}));
})(store || (store = {}));
//# sourceMappingURL=storeInfo.js.map