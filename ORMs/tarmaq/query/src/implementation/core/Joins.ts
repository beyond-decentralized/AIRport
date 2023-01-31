import { IOC } from '@airport/direction-indicator';
import {
	IFrom,
	IQEntity,
	IQTree
} from '../../definition/core/entity/Entity'
import { IQEntityInternal } from '../../definition/core/entity/IQEntityDriver';
import {
	IJoinFields,
	JoinOperation
} from "../../definition/core/entity/Joins";
import { IQOrderableField } from "../../definition/core/field/Field";
import { RawFieldQuery } from "../../definition/query/facade/FieldQuery";
import {
	ITreeEntity,
	RawTreeQuery
} from "../../definition/query/facade/TreeQuery";
import { ENTITY_UTILS } from '../../injection';
import type { QField } from "./field/Field";

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

	let view = IOC.getSync(ENTITY_UTILS).getQTree([], queryDefinition);
	let customEntity: IME = <IME>queryDefinition.SELECT;
	view = convertMappedEntitySelect(customEntity, queryDefinition, view, view, 'f');

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
		let alias = `${fieldPrefix}${++fieldIndex}`;
		let value: any = customEntity[property];
		if (IOC.getSync(ENTITY_UTILS).isQField(value)) {
			let field = value.getInstance(view as IQEntityInternal);
			field.alias = alias;
			(field as any).q = view;
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
 * Sub-queries in SELECT clause
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
	let customField: IQF = <IQF>queryDefinition.SELECT;
	customField = (<QField<IQF>><any>customField).addSubQuery(queryDefinition);
	// Field query cannot be joined to any other query so don't have set the positional fields
	return customField;

}

export class JoinFields<IF1 extends IFrom, IQE extends IQEntity<any>> implements IJoinFields<IF1, IQE> {

	constructor(
		private joinFrom: IQE,
		private joinTo: IF1,
	) {
		if (!(IOC.getSync(ENTITY_UTILS).isQEntity(this.joinTo))) {
			throw new Error(`Right value in join must be a View or an Entity`)
		}
	}

	ON(joinOperation: JoinOperation<IF1, IQE>): IQE {
		let joinChild: IQEntityInternal = <IQEntityInternal><any>this.joinFrom;
		joinChild.__driver__.joinWhereClause = joinOperation(this.joinFrom, this.joinTo);

		return this.joinFrom;
	}
}
