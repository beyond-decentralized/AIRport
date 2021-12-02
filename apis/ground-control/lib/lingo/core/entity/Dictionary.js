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
export var repositoryEntity;
(function (repositoryEntity) {
    repositoryEntity.ACTOR_ID = 'ACTOR_ID';
    repositoryEntity.ACTOR_RECORD_ID = 'ACTOR_RECORD_ID';
    repositoryEntity.ENTITY_NAME = 'RepositoryEntity';
    repositoryEntity.FOREIGN_KEY = 'REPOSITORY_ID';
    repositoryEntity.IS_DRAFT = 'IS_DRAFT';
    repositoryEntity.LOCAL_ENTITY_NAME = 'LocalRepositoryEntity';
    repositoryEntity.REPOSITORY_ID = 'REPOSITORY_ID';
    repositoryEntity.ORIGINAL_REPOSITORY_ID = 'ORIGINAL_REPOSITORY_ID';
    repositoryEntity.SYS_WIDE_OP_ID_APPLICATION = 'air___airport__airport_code';
    repositoryEntity.SYS_WIDE_OP_ID_ENTITY = 'SystemWideOperationId';
    repositoryEntity.systemWideOperationId = 'systemWideOperationId';
    repositoryEntity.SYSTEM_WIDE_OPERATION_ID = 'SYSTEM_WIDE_OPERATION_ID';
})(repositoryEntity || (repositoryEntity = {}));
//# sourceMappingURL=Dictionary.js.map