/**
 * Column keys.
 */

export type Primitive = boolean | Date | number | string;

export namespace column {

	/**
	 * Name property of the column.
	 * @type {string}
	 */
	export const NAME = 'name'

	/**
	 * Column data types.
	 */
	export namespace type {
		export const ANY = 'any'
		export const BOOLEAN = 'boolean'
		export const DATE = 'Date'
		export const NUMBER = 'number'
		export const STRING = 'string'
	}

}

/**
 * File level keys.
 */
export namespace file {
	export const ENTITY = 'Entity'
	export const TABLE = 'Table'
}

/**
 * Entity configuration keys.
 */
export namespace entity {
	export const DATABASES = 'databases'
}

/**
 * Foreign Key configuration keys.
 */
export namespace foreignkey {
	export const DEFINITION = 'foreignKeyDefinition'
	export const NAME = 'name'
	export const VALUE = 'value'
}

/**
 * Index configuration keys.
 */
export namespace index {
	export const COLUMN_LIST = 'columnList'
	export const NAME = 'name'
	export const UNIQUE = 'unique'
}

/**
 * JoinColumn configuration keys.
 */
export namespace joincolumn {
	export const FOREIGN_KEY = 'foreignKey'
	export const REFERENCED_COLUMN_NAME = 'referencedColumnName'
	export const VALUE = 'value'
}

/**
 * Property annotation keys.
 */
export namespace property {
	export const COLUMN = 'Column'
	export const ENUM_TYPE = 'Enum'
	export const ID = 'Id'
	export const JOIN_COLUMN = 'JoinColumn'
	export const JOIN_COLUMNS = 'JoinColumns'
	export const JSON_TYPE = 'Json'
	export const MANY_TO_ONE = 'ManyToOne'
	export const ONE_TO_MANY = 'OneToMany'
	// R_JOIN_COLUMN(s) are not needed since Repository relations are now
	// standardized - simple (@ManyToOne) and (@OneToMany) suffice.
	// export const R_JOIN_COLUMN    = 'RJoinColumn';
	// export const R_JOIN_COLUMNS   = 'RJoinColumns';
	export const SUB_QUERY = 'SubQuery'
	// export const WHERE_JOIN_TABLE = 'WhereJoinTable';
}

/**
 * OneToMany configuration keys.
 */
export namespace onetomany {
	export const MAPPED_BY = 'mappedBy'
}

/**
 * Table configuration keys.
 */
export namespace table {
	export const INDEXES = 'indexes'
	export const NAME = 'name'
	export const PRIMARY_KEY = 'primaryKey'
	export const APPLICATION = 'application'
}

/**
 * Name of the RepositoryId column
 * @type {string}
 */
export namespace repositoryEntity {
	export const ACTOR_ID = 'ACTOR_ID'
	export const ACTOR_RECORD_ID = 'ACTOR_RECORD_ID'
	export const ENTITY_NAME = 'RepositoryEntity'
	export const FOREIGN_KEY = 'REPOSITORY_ID'
	export const LOCAL_ENTITY_NAME = 'LocalRepositoryEntity'
	export const REPOSITORY_ID = 'REPOSITORY_ID'
	export const ORIGINAL_ACTOR_ID = 'ORIGINAL_ACTOR_ID'
	export const ORIGINAL_ACTOR_RECORD_ID = 'ORIGINAL_ACTOR_RECORD_ID'
	export const ORIGINAL_REPOSITORY_ID = 'ORIGINAL_REPOSITORY_ID'
	export const SYS_WIDE_OP_ID_APPLICATION = 'air____airport___airport_code'
	export const SYS_WIDE_OP_ID_ENTITY = 'SystemWideOperationId'
	export const systemWideOperationId = 'systemWideOperationId'
	export const SYSTEM_WIDE_OPERATION_ID = 'SYSTEM_WIDE_OPERATION_ID'
}
