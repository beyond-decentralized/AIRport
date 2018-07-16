import {
	DbRelation,
	JoinType,
	JSONEntityRelation,
	JSONRelation
}                           from "@airport/ground-control";
import {
	IQEntityDriver,
	IQEntityInternal
}                           from "../../../lingo/core/entity/Entity";
import {IQInternalRelation} from "../../../lingo/core/entity/Relation";
import {IUtils}             from "../../../lingo/utils/Utils";

/**
 * Created by Papa on 4/26/2016.
 */

export abstract class QRelation<IQ extends IQEntityInternal>
	implements IQInternalRelation<IQ> {

	constructor(
		public dbRelation: DbRelation,
		public parentQ: IQEntityInternal,
	) {
	}

	static getPositionAlias(
		rootEntityPrefix: string,
		fromClausePosition: number[]
	) {
		return `${rootEntityPrefix}_${fromClausePosition.join('_')}`;
	}

	static getAlias(jsonRelation: JSONRelation): string {
		return this.getPositionAlias(jsonRelation.rep, jsonRelation.fcp);
	}

	static getParentAlias(jsonRelation: JSONRelation): string {
		let fromClausePosition = jsonRelation.fcp;
		if (fromClausePosition.length === 0) {
			throw `Cannot find alias of a parent entity for the root entity`;
		}
		return this.getPositionAlias(jsonRelation.rep, fromClausePosition.slice(0, fromClausePosition.length - 1));
	}

	static createRelatedQEntity<IQ extends IQEntityInternal>(
		utils: IUtils,
		joinRelation: JSONRelation
	): IQ {
		const dbEntity         = utils.Schema.getDbEntity(joinRelation.si, joinRelation.ti);
		let QEntityConstructor = utils.Schema.getQEntityConstructor(dbEntity);
		return new QEntityConstructor<IQ>(
			dbEntity,
			joinRelation.fcp,
			dbEntity.relations[(<JSONEntityRelation>joinRelation).ri],
			joinRelation.jt);
	}

	static getNextChildJoinPosition(joinParentDriver: IQEntityDriver): number[] {
		let nextChildJoinPosition = joinParentDriver.fromClausePosition.slice();
		nextChildJoinPosition.push(++joinParentDriver.currentChildIndex);

		return nextChildJoinPosition;
	}

	innerJoin(): IQ {
		return this.getNewQEntity(JoinType.INNER_JOIN);
	}

	leftJoin(): IQ {
		return this.getNewQEntity(JoinType.LEFT_JOIN);
	}

	private getNewQEntity(joinType: JoinType): IQ {
		const dbEntity           = this.dbRelation.property.entity;
		const utils              = this.parentQ.__driver__.utils;
		const qEntityConstructor = utils.Schema.getQEntityConstructor(
			this.dbRelation.relationEntity);

		let newQEntity: IQEntityInternal       = new qEntityConstructor(
			dbEntity,
			QRelation.getNextChildJoinPosition(this.parentQ.__driver__),
			this.dbRelation,
			joinType
		);
		newQEntity.__driver__.parentJoinEntity = this.parentQ;
		return <IQ>newQEntity;
	}

}

