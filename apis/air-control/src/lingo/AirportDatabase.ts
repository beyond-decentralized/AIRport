import {
	DbSchema,
	JsonSchema
}                              from "@airport/ground-control";
import {QEntityConstructor}    from "../impl/core/entity/Entity";
import {EntityConstructor}     from "./core/entity/Entity";
import {FunctionsAndOperators} from "./core/FunctionsAndOperators";
import {IDatabaseFacade}       from "./core/repository/DatabaseFacade";
import {INonEntityFind}        from "./query/api/NonEntityFind";
import {INonEntityFindOne}     from "./query/api/NonEntityFindOne";
import {INonEntitySearch}      from "./query/api/NonEntitySearch";
import {INonEntitySearchOne}   from "./query/api/NonEntitySearchOne";

export interface FunctionAndOperatorHub {

	functions: FunctionsAndOperators;
	F: FunctionsAndOperators;

}

export interface SchemaHub {

	schemas: DbSchema[];
	S: DbSchema[];
	schemaMapByName: { [name: string]: DbSchema };
	SM: { [name: string]: DbSchema };

	qSchemas: QSchema[];
	Q: QSchema[];
	qSchemaMapByName: { [name: string]: QSchema };
	QM: { [name: string]: QSchema };

}

export interface IAirportDatabase
	extends SchemaHub, FunctionAndOperatorHub {

	registerDatabase(
		facade: IDatabaseFacade
	);

	registerSchema(
		schema: JsonSchema,
		qSchema: QSchema
	);

	setCurrentDb(dbName: string);

	getDbNames(): string[];

	getDbNameSet(): { [databaseName: string]: boolean };

	db: IDatabaseFacade;

	find: INonEntityFind;

	findOne: INonEntityFindOne;

	search: INonEntitySearch;

	searchOne: INonEntitySearchOne;

}

export interface QSchema {
	[name: string]: any;

}

export interface QSchemaInternal {
	__constructors__?: { [name: string]: EntityConstructor }
	__qConstructors__?: { [name: string]: QEntityConstructor };
}
