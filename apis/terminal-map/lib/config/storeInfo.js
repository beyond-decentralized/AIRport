"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreType;
(function (StoreType) {
    StoreType[StoreType["SQLITE_CORDOVA"] = 0] = "SQLITE_CORDOVA";
    StoreType[StoreType["SQLJS"] = 1] = "SQLJS";
    StoreType[StoreType["REMOTE"] = 2] = "REMOTE";
})(StoreType = exports.StoreType || (exports.StoreType = {}));
var IdGeneration;
(function (IdGeneration) {
    IdGeneration[IdGeneration["ENTITY_CHANGE_ID"] = 0] = "ENTITY_CHANGE_ID";
})(IdGeneration = exports.IdGeneration || (exports.IdGeneration = {}));
var store;
(function (store) {
    var type;
    (function (type) {
        type.WEB_SQL = 'WEB_SQL';
        type.SQL_JS = 'SQL_JS';
        function getName(localStoreType) {
            switch (localStoreType) {
                case StoreType.SQLITE_CORDOVA:
                    return type.WEB_SQL;
                case StoreType.SQLJS:
                    return type.SQL_JS;
                default:
                    throw `Unsupported Local Store Type: ${localStoreType}`;
            }
        }
        type.getName = getName;
        function getValue(localStoreTypeName) {
            switch (localStoreTypeName) {
                case type.WEB_SQL:
                    return StoreType.SQLITE_CORDOVA;
                case type.SQL_JS:
                    return StoreType.SQLJS;
                default:
                    throw `Unsupported Local Store Type name: ${localStoreTypeName}`;
            }
        }
        type.getValue = getValue;
    })(type = store.type || (store.type = {}));
})(store = exports.store || (exports.store = {}));
//# sourceMappingURL=storeInfo.js.map