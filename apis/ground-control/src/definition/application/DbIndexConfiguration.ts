export interface DbIndexConfiguration {
	// The name of the index; defaults to a provider-generated name.
	name?: string,
	//  The names of the columns to be included in the index, in order.
	// Will also accept expressions, with COLLATE and sort order (ASC | DESC)
	columnList: string [];
	// Whether the index is unique.  Default: false
	unique?: boolean;
}