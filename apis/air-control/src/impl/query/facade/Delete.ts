import {
	JsonDelete,
	JSONEntityRelation
}                      from "@airport/ground-control";
import {
	IQEntity,
	IQEntityInternal
}                      from "../../../lingo/core/entity/Entity";
import {RawDelete}     from "../../../lingo/query/facade/Delete";
import {IUtils}        from "../../../lingo/utils/Utils";
import {AbstractQuery} from "./AbstractQuery";

/**
 * Created by Papa on 10/2/2016.
 */

export class Delete<IQE extends IQEntity> extends AbstractQuery {

	constructor(
		public rawDelete: RawDelete<IQE>,
		private utils: IUtils,
	) {
		super();
	}

	toJSON(): JsonDelete {
		return {
			DF: <JSONEntityRelation>(<IQEntityInternal><any>this.rawDelete.deleteFrom)
				.__driver__.getRelationJson(this.columnAliases),
			W: this.utils.Query.whereClauseToJSON(this.rawDelete.where, this.columnAliases)
		};
	}
}
