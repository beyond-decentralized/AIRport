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
import {AbstractRawInsertValues}         from "../../../lingo/query/facade/InsertValues";
import {QField}                  from "../../core/field/Field";
import {getPrimitiveValue}       from "../../core/field/WrapperFunctions";
import {AbstractQuery}           from "./AbstractQuery";

/**
 * Created by Papa on 11/17/2016.
 */

// FIXME: add support for a full blown INSERT VALUES, with expression support for VALUES
export abstract class AbstractInsertValues<IQE extends IQEntity, ARIV extends AbstractRawInsertValues<IQE>>
	extends AbstractQuery {

	constructor(
		public rawInsertValues: ARIV,
		public columnIndexes?: number[],
	) {
		super();
	}

	protected valuesToJSON(valueSets: any[][]): any[][] {
		// let currentValueIndex = -1;
		// this.values           = [];
		return valueSets.map((valueSet) => {
			return valueSet.map((value) => {
				if (value === undefined) {
					throw `Cannot use 'undefined' in VALUES clause.`;
				}
				if (!(value instanceof QField)) {
					return getPrimitiveValue(value);
					// this.values.push(getPrimitiveValue(value));
					// return ++currentValueIndex;
				} else {
					return (<QField<any>>value).toJSON(this.columnAliases, false);
				}
			});
		});
	}

}
