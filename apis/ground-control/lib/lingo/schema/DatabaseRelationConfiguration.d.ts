export interface DatabaseForeignKey {
    /**
     * The foreign key constraint definition.
     *
     * The syntax used in the foreignKeyDefinition element should
     * follow the SQL syntax used by the target terminal for foreign
     * key constraints. For example, this may be similar the following:
     *
     FOREIGN KEY
     ( <COLUMN expression> {, <COLUMN expression>}... )
     REFERENCES <TABLE identifier>
     (<COLUMN expression> {, <COLUMN expression>}... )
     [ ON UPDATE <referential action> ]
     [ ON DELETE <referential action> ]
     */
    foreignKeyDefinition?: string;
    /**
     * (Optional) The name of the foreign key constraint. If this is
     * not specified, it defaults to a provider-generated name.
     */
    name?: string;
}
export declare enum CascadeType {
    NONE = 0,
    ALL = 1,
    PERSIST = 2,
    REMOVE = 3
}
export declare enum CascadeOverwrite {
    ALWAYS = 0,
    DEFAULT = 1,
    NEVER = 2
}
/**
 * One-To-Many relation configuration
 */
export interface DatabaseOneToManyElements {
    cascade?: CascadeType;
    mappedBy?: string;
}
/**
 * Many-To-One relation configuration.
 */
export interface DatabaseManyToOneElements {
}
