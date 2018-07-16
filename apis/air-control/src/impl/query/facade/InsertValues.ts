import {
	JSONEntityRelation,
	JsonInsertValues
}                                from "@airport/ground-control";
import {
	IEntitySelectProperties,
	IQEntity,
	IQEntityInternal
}                                from "../../../lingo/core/entity/Entity";
import {IQOperableFieldInternal} from "../../../lingo/core/field/OperableField";
import {RawInsertValues}         from "../../../lingo/query/facade/InsertValues";
import {QField}                  from "../../core/field/Field";
import {getPrimitiveValue}       from "../../core/field/WrapperFunctions";
import {AbstractInsertValues}    from "./AbstractInsertValues";

/**
 * Created by Papa on 11/17/2016.
 */

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export class InsertValues<IQE extends IQEntity>
	extends AbstractInsertValues<IQE, RawInsertValues<IQE>> {

	toJSON(): JsonInsertValues {
		const insertInto = <JSONEntityRelation>
			(<IQEntityInternal><any>this.rawInsertValues.insertInto)
				.__driver__.getRelationJson(this.columnAliases);
		return {
			II: insertInto,
			C: this.columnIndexes ? this.columnIndexes : this.rawInsertValues.columns.map(
				column =>
					(<IQOperableFieldInternal<any, any, any, any>>column).dbColumn.index
			),
			V: this.valuesToJSON(this.rawInsertValues.values)
		};
	}

}
