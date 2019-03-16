import {IDatastructureUtils} from "@airport/ground-control";
import {IEntityUtils}        from "./EntityUtils";
import {IFieldUtils}         from "./FieldUtils";
import {IQMetadataUtils}     from "./QMetadataUtils";
import {IQueryUtils}         from "./QueryUtils";
import {ISchemaUtils}        from "./SchemaUtils";

export interface IUtils
	extends IDatastructureUtils {

	Entity: IEntityUtils;
	Field: IFieldUtils;
	Metadata: IQMetadataUtils;
	Query: IQueryUtils;
	Schema: ISchemaUtils;

	strsToNums(
		strings: string[]
	): number[];

	objectExists(
		object: any
	): boolean;

	valuesEqual(
		value1: any,
		value2: any,
		checkChildObjects?: boolean
	): boolean;

	compareNumbers(
		number1: number,
		number2: number
	): -1 | 0 | 1;

}