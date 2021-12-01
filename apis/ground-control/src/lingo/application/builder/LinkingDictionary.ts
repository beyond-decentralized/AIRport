import {RelationColumnReference} from "./RelationColumnReference";

export interface ILinkingDictionary {
	dbColumnRelationMapByManySide: {
		[domain: string]: {
			[applicationName: string]: {
				[entityIndex: number]: {
					[manyRelationIndex: number]: {
						[manyColumnIndex: number]: RelationColumnReference
					}
				}
			}
		}
	};
	dbColumnRelationMapByOneSide: {
		[domain: string]: {
			[applicationName: string]: {
				[entityIndex: number]: {
					[oneRelationIndex: number]: {
						[oneColumnIndex: number]: RelationColumnReference
					}
				}
			}
		}
	};
}