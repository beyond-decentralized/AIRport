import {
	JSONEntityRelation,
	JsonUpdate
}                                from "@airport/ground-control";
import {JsonEntityUpdateColumns} from "@airport/ground-control";
import {
	IQEntity,
	IQEntityInternal
}                                from "../../../lingo/core/entity/Entity";
import {AbstractRawUpdate}       from "../../../lingo/query/facade/Update";
import {IUtils}                  from "../../../lingo/utils/Utils";
import {AbstractQuery}           from "./AbstractQuery";

export abstract class AbstractUpdate<IQE extends IQEntity, ARE extends AbstractRawUpdate<IQE>>
	extends AbstractQuery {

	constructor(
		public rawUpdate: ARE,
		protected utils: IUtils,
	) {
		super();
	}

	toJSON(): JsonUpdate<JsonEntityUpdateColumns> {
		return {
			U: <JSONEntityRelation>(<IQEntityInternal><any>this.rawUpdate.update)
				.__driver__.getRelationJson(this.columnAliases),
			S: this.setToJSON(this.rawUpdate.set),
			W: this.utils.Query.whereClauseToJSON(this.rawUpdate.where, this.columnAliases)
		};
	}


	protected abstract setToJSON(set: any): JsonEntityUpdateColumns;

}