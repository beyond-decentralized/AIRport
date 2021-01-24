/**
 * Column keys.
 */
export declare type Primitive = boolean | Date | number | string;
export declare namespace column {
    /**
     * Name property of the column.
     * @type {string}
     */
    const NAME = "name";
    /**
     * Column data types.
     */
    namespace type {
        const ANY = "any";
        const BOOLEAN = "boolean";
        const DATE = "Date";
        const NUMBER = "number";
        const STRING = "string";
    }
}
/**
 * File level keys.
 */
export declare namespace file {
    const ENTITY = "Entity";
    const TABLE = "Table";
}
/**
 * Entity configuration keys.
 */
export declare namespace entity {
    const DATABASES = "databases";
}
/**
 * Foreign Key configuration keys.
 */
export declare namespace foreignkey {
    const DEFINITION = "foreignKeyDefinition";
    const NAME = "name";
    const VALUE = "value";
}
/**
 * Index configuration keys.
 */
export declare namespace index {
    const COLUMN_LIST = "columnList";
    const NAME = "name";
    const UNIQUE = "unique";
}
/**
 * JoinColumn configuration keys.
 */
export declare namespace joincolumn {
    const FOREIGN_KEY = "foreignKey";
    const REFERENCED_COLUMN_NAME = "referencedColumnName";
    const VALUE = "value";
}
/**
 * Property annotation keys.
 */
export declare namespace property {
    const COLUMN = "Column";
    const ENUM_TYPE = "Enum";
    const ID = "Id";
    const JOIN_COLUMN = "JoinColumn";
    const JOIN_COLUMNS = "JoinColumns";
    const JSON_TYPE = "Json";
    const MANY_TO_ONE = "ManyToOne";
    const ONE_TO_MANY = "OneToMany";
    const SUB_QUERY = "SubQuery";
}
/**
 * OneToMany configuration keys.
 */
export declare namespace onetomany {
    const MAPPED_BY = "mappedBy";
}
/**
 * Table configuration keys.
 */
export declare namespace table {
    const INDEXES = "indexes";
    const NAME = "name";
    const PRIMARY_KEY = "primaryKey";
    const SCHEMA = "schema";
}
/**
 * Name of the RepositoryId column
 * @type {string}
 */
export declare namespace repositoryEntity {
    const ACTOR_ID = "ACTOR_ID";
    const ACTOR_RECORD_ID = "ACTOR_RECORD_ID";
    const ENTITY_NAME = "RepositoryEntity";
    const FOREIGN_KEY = "REPOSITORY_ID";
    const IS_DRAFT = "IS_DRAFT";
    const LOCAL_ENTITY_NAME = "LocalRepositoryEntity";
    const REPOSITORY_ID = "REPOSITORY_ID";
    const SYS_WIDE_OP_ID_SCHEMA = "npmjs_org___airport__airport_code";
    const SYS_WIDE_OP_ID_ENTITY = "SystemWideOperationId";
    const systemWideOperationId = "systemWideOperationId";
    const SYSTEM_WIDE_OPERATION_ID = "SYSTEM_WIDE_OPERATION_ID";
}
//# sourceMappingURL=Dictionary.d.ts.map