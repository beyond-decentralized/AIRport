// export interface AddToDatabaseJoinFunction<QOtm extends IQEntity, QMto extends IQEntity> {
// 	(
// 		otm: QOtm, // One-to-Many IQEntity
// 		mto: QMto, // Many-to-One IQEntity
// 		db: IAirportDatabase, // Reference to the Airport functionality
// 		f: FunctionsAndOperators // Reference to all available functions and operators
// 	): JSONBaseOperation;
// }


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
	/**
	 * (Optional) Used to specify whether a foreign key constraint
	 * should be generated when application generation is in effect.
	 *
	 A value of CONSTRAINT will cause the persistence provider to
	 generate a foreign key constraint. If the foreignKeyDefinition
	 element is not specified, the provider will generate a constraint
	 whose update and delete actions it determines most appropriate for
	 the join column(s) to which the foreign key annotation is applied.

	 A value of NO_CONSTRAINT will result in no constraint being generated.

	 A value of PROVIDER_DEFAULT will result in the provider's default
	 behavior (which may or may not result in the generation of a
	 constraint for the given join column(s).
	 */
	// TODO: reevaluate disabling of referential integrity for repository entities
	// value?: ConstraintMode;  // default: ConstraintMode.CONSTRAINT
}


/**
 * One-To-Many relation configuration
 */
export interface DatabaseOneToManyElements {

	// Name of the property on the One side of the relation
	mappedBy?: string;

}

/**
 * Many-To-One relation configuration.
 */
export interface DatabaseManyToOneElements {
	// TODO: see if optional is needed
	// optional?: boolean;

	// Name of the property on the One side of the relation
	mappedBy?: string;
}
