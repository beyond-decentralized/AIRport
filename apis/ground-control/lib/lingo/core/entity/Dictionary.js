/**
 * Column keys.
 */
export var column;
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
})(column || (column = {}));
/**
 * File level keys.
 */
export var file;
(function (file) {
    file.ENTITY = 'Entity';
    file.TABLE = 'Table';
})(file || (file = {}));
/**
 * Entity configuration keys.
 */
export var entity;
(function (entity) {
    entity.DATABASES = 'databases';
})(entity || (entity = {}));
/**
 * Foreign Key configuration keys.
 */
export var foreignkey;
(function (foreignkey) {
    foreignkey.DEFINITION = 'foreignKeyDefinition';
    foreignkey.NAME = 'name';
    foreignkey.VALUE = 'value';
})(foreignkey || (foreignkey = {}));
/**
 * Index configuration keys.
 */
export var index;
(function (index) {
    index.COLUMN_LIST = 'columnList';
    index.NAME = 'name';
    index.UNIQUE = 'unique';
})(index || (index = {}));
/**
 * JoinColumn configuration keys.
 */
export var joincolumn;
(function (joincolumn) {
    joincolumn.FOREIGN_KEY = 'foreignKey';
    joincolumn.REFERENCED_COLUMN_NAME = 'referencedColumnName';
    joincolumn.VALUE = 'value';
})(joincolumn || (joincolumn = {}));
/**
 * Property annotation keys.
 */
export var property;
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
})(property || (property = {}));
/**
 * OneToMany configuration keys.
 */
export var onetomany;
(function (onetomany) {
    onetomany.MAPPED_BY = 'mappedBy';
})(onetomany || (onetomany = {}));
/**
 * Table configuration keys.
 */
export var table;
(function (table) {
    table.INDEXES = 'indexes';
    table.NAME = 'name';
    table.PRIMARY_KEY = 'primaryKey';
    table.APPLICATION = 'application';
})(table || (table = {}));
/**
 * Name of the RepositoryId column
 * @type {string}
 */
export var airEntity;
(function (airEntity) {
    airEntity.ACTOR_ID = 'ACTOR_ID';
    airEntity.ACTOR_RECORD_ID = 'ACTOR_RECORD_ID';
    airEntity.ENTITY_NAME = 'AirEntity';
    airEntity.FOREIGN_KEY = 'REPOSITORY_ID';
    airEntity.LOCAL_ENTITY_NAME = 'LocalAirEntity';
    airEntity.REPOSITORY_ID = 'REPOSITORY_ID';
    airEntity.ORIGINAL_ACTOR_ID = 'ORIGINAL_ACTOR_ID';
    airEntity.ORIGINAL_ACTOR_RECORD_ID = 'ORIGINAL_ACTOR_RECORD_ID';
    airEntity.ORIGINAL_REPOSITORY_ID = 'ORIGINAL_REPOSITORY_ID';
    airEntity.SYS_WIDE_OP_ID_APPLICATION = 'air____at_airport_slash_airport_dash_code';
    airEntity.SYS_WIDE_OP_ID_ENTITY = 'SystemWideOperationId';
    airEntity.systemWideOperationId = 'systemWideOperationId';
    airEntity.SYSTEM_WIDE_OPERATION_ID = 'SYSTEM_WIDE_OPERATION_ID';
})(airEntity || (airEntity = {}));
//# sourceMappingURL=Dictionary.js.map