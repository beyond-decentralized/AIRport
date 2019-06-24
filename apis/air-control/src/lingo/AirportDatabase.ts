import {DbSchema}              from '@airport/ground-control'
import {QEntityConstructor}    from '../impl/core/entity/Entity'
import {QRelation}             from '../impl/core/entity/Relation'
import {EntityConstructor}     from './core/entity/Entity'
import {FunctionsAndOperators} from './core/FunctionsAndOperators'
import {INonEntityFind}        from './query/api/NonEntityFind'
import {INonEntityFindOne}     from './query/api/NonEntityFindOne'
import {INonEntitySearch}      from './query/api/NonEntitySearch'
import {INonEntitySearchOne}   from './query/api/NonEntitySearchOne'

export interface FunctionAndOperatorHub {

	functions: FunctionsAndOperators;
	F: FunctionsAndOperators;

}

export interface SchemaHub {

	schemas: DbSchema[];
	S: DbSchema[];

	qSchemas: QSchema[];
	Q: QSchema[];

	QM: { [name: string]: QSchema };

}

export interface IAirportDatabase
	extends SchemaHub,
	        FunctionAndOperatorHub {

	find: INonEntityFind
	findOne: INonEntityFindOne
	search: INonEntitySearch
	searchOne: INonEntitySearchOne

	/*	registerDatabase(
			facade: IDatabaseFacade
		)

		registerQSchemas(
			qSchemas: QSchema[]
		)

		setCurrentDb(dbName: string)

		getDbNames(): string[]

		getDbNameSet(): { [databaseName: string]: boolean }

		db: IDatabaseFacade*/

}

export interface QSchema {
	[name: string]: any;

	domain: string;
	name: string;
}

export interface QSchemaInternal
	extends QSchema {
	__constructors__?: { [name: string]: EntityConstructor }
	__qConstructors__?: { [name: string]: QEntityConstructor };
	__qIdRelationConstructors__?: typeof QRelation[];
	__dbSchema__?: DbSchema;
}
