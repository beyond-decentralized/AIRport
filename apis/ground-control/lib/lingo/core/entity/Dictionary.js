"use strict";
/**
 * Column keys.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var column;
(function (column) {
    /**
     * Name property of the column.
     * @type {string}
     */
    column.NAME = 'name';
    /**
     * Column data types.
     */
    let type;
    (function (type) {
        type.ANY = 'any';
        type.BOOLEAN = 'boolean';
        type.DATE = 'Date';
        type.NUMBER = 'number';
        type.STRING = 'string';
    })(type = column.type || (column.type = {}));
})(column = exports.column || (exports.column = {}));
/**
 * File level keys.
 */
var file;
(function (file) {
    file.ENTITY = 'Entity';
    file.TABLE = 'Table';
})(file = exports.file || (exports.file = {}));
/**
 * Entity configuration keys.
 */
var entity;
(function (entity) {
    entity.DATABASES = 'databases';
})(entity = exports.entity || (exports.entity = {}));
/**
 * Foreign Key configuration keys.
 */
var foreignkey;
(function (foreignkey) {
    foreignkey.DEFINITION = 'foreignKeyDefinition';
    foreignkey.NAME = 'name';
    foreignkey.VALUE = 'value';
})(foreignkey = exports.foreignkey || (exports.foreignkey = {}));
/**
 * Index configuration keys.
 */
var index;
(function (index) {
    index.COLUMN_LIST = 'columnList';
    index.NAME = 'name';
    index.UNIQUE = 'unique';
})(index = exports.index || (exports.index = {}));
/**
 * JoinColumn configuration keys.
 */
var joincolumn;
(function (joincolumn) {
    joincolumn.FOREIGN_KEY = 'foreignKey';
    joincolumn.REFERENCED_COLUMN_NAME = 'referencedColumnName';
    joincolumn.VALUE = 'value';
})(joincolumn = exports.joincolumn || (exports.joincolumn = {}));
/**
 * Property annotation keys.
 */
var property;
(function (property) {
    property.COLUMN = 'Column';
    property.ENUM_TYPE = 'Enum';
    property.ID = 'Id';
    property.JOIN_COLUMN = 'JoinColumn';
    property.JOIN_COLUMNS = 'JoinColumns';
    property.JSON_TYPE = 'Json';
    property.MANY_TO_ONE = 'ManyToOne';
    property.ONE_TO_MANY = 'OneToMany';
    // R_JOIN_COLUMN(s) are not needed since Repository relations are now
    // standardized - simple (@ManyToOne) and (@OneToMany) suffice.
    // export const R_JOIN_COLUMN    = 'RJoinColumn';
    // export const R_JOIN_COLUMNS   = 'RJoinColumns';
    property.SUB_QUERY = 'SubQuery';
    // export const WHERE_JOIN_TABLE = 'WhereJoinTable';
})(property = exports.property || (exports.property = {}));
/**
 * OneToMany configuration keys.
 */
var onetomany;
(function (onetomany) {
    onetomany.CASCADE = 'cascade';
    onetomany.MAPPED_BY = 'mappedBy';
})(onetomany = exports.onetomany || (exports.onetomany = {}));
/**
 * Table configuration keys.
 */
var table;
(function (table) {
    table.INDEXES = 'indexes';
    table.NAME = 'name';
    table.PRIMARY_KEY = 'primaryKey';
    table.SCHEMA = 'schema';
})(table = exports.table || (exports.table = {}));
/**
 * Name of the RepositoryId column
 * @type {string}
 */
var repositoryEntity;
(function (repositoryEntity) {
    repositoryEntity.ENTITY_NAME = 'RepositoryEntity';
    repositoryEntity.FOREIGN_KEY = 'REPOSITORY_ID';
    repositoryEntity.REPOSITORY_ID = 'REPOSITORY_ID';
    repositoryEntity.ACTOR_ID = 'ACTOR_ID';
    repositoryEntity.ACTOR_RECORD_ID = 'ACTOR_RECORD_ID';
    repositoryEntity.LOCAL_ENTITY_NAME = 'LocalRepositoryEntity';
})(repositoryEntity = exports.repositoryEntity || (exports.repositoryEntity = {}));
//# sourceMappingURL=Dictionary.js.map