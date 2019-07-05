import {
	IFrom,
	IQEntityInternal,
	IQTree
} from '../../lingo/core/entity/Entity'
import {
	IJoinFields,
	JoinOperation
}                         from "../../lingo/core/entity/Joins";
import {IQOrderableField} from "../../lingo/core/field/Field";
import {RawFieldQuery}    from "../../lingo/query/facade/FieldQuery";
import {
	ITreeEntity,
	RawTreeQuery
}                         from "../../lingo/query/facade/TreeQuery";
import {
	QEntity,
	QTree
}                         from "./entity/Entity";
import {QField}           from "./field/Field";

/**
 * Created by Papa on 10/25/2016.
 */

export function tree<IME extends ITreeEntity>(
	query: { (...args: any[]): RawTreeQuery<IME> } | RawTreeQuery<IME>
): IME & IFrom {
	let queryDefinition: RawTreeQuery<IME>;
	if (query instanceof Function) {
		queryDefinition = query();
	} else {
		queryDefinition = <RawTreeQuery<IME>>query;
	}

	let view              = new QTree([], queryDefinition);
	let customEntity: IME = <IME>queryDefinition.select;
	view                  = convertMappedEntitySelect(customEntity, queryDefinition, view, view, 'f');

	return <IME & IFrom><any>view;
}


function convertMappedEntitySelect<IME extends ITreeEntity>(
	customEntity: IME,
	queryDefinition: RawTreeQuery<IME>,
	view: IQTree,
	selectProxy: any,
	fieldPrefix: string
): IQTree {
	let fieldIndex = 0;
	for (let property in customEntity) {
		let alias      = `${fieldPrefix}${++fieldIndex}`;
		let value: any = customEntity[property];
		if (value instanceof QField) {
			let field             = value.getInstance(view as IQEntityInternal);
			field.alias           = alias;
			(field as any).q               = view;
			selectProxy[property] = field;
		} else {
			if (value instanceof Object && !(value instanceof Date)) {
				selectProxy[<string>value] = convertMappedEntitySelect(<any>value, queryDefinition, view, {}, `${alias}_`);
			} else {
				throw new Error(`All SELECT clause entries of a Mapped query must be Fields or Functions`)
			}
		}
	}

	return view;
}

/**
 * Sub-queries in select clause
 * @param query
 * @returns {IQF}
 */
export function field<IQF extends IQOrderableField<IQF>>(
	query: { (...args: any[]): RawFieldQuery<IQF> } | RawFieldQuery<IQF>
): IQF {
	let queryDefinition: RawFieldQuery<IQF>;
	if (query instanceof Function) {
		queryDefinition = query();
	} else {
		queryDefinition = <RawFieldQuery<IQF>>query;
	}
	let customField: IQF = <IQF>queryDefinition.select;
	customField          = (<QField<IQF>><any>customField).addSubQuery(queryDefinition);
	// Field query cannot be joined to any other query so don't have set the positional fields
	return customField;

}

export class JoinFields<IF extends IFrom> implements IJoinFields<IF> {

	constructor(
		private joinTo: IF
	) {
		if (!(this.joinTo instanceof QEntity)) {
			throw new Error(`Right value in join must be a View or an Entity`)
		}
	}

	on(joinOperation: JoinOperation<IF>): IF {
		let joinChild: IQEntityInternal      = <IQEntityInternal><any>this.joinTo;
		joinChild.__driver__.joinWhereClause = joinOperation(this.joinTo);

		return this.joinTo;
	}
}
