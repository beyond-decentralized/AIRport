import {DbRelation}          from "@airport/ground-control";
import {
	IEntityRelationFrom,
	IQEntityInternal
}                            from "../../../lingo/core/entity/Entity";
import {IQOneToManyRelation} from "../../../lingo/core/entity/OneToManyRelation";
import {QRelation}           from "./Relation";

/**
 * Created by Papa on 10/25/2016.
 */

export class QOneToManyRelation<IERF extends IEntityRelationFrom, QR extends IQEntityInternal>
	extends QRelation<QR>
	implements IQOneToManyRelation<QR> {

	constructor(
		dbRelation: DbRelation,
		parentQ: IQEntityInternal,
	) {
		super(dbRelation, parentQ);
	}

}