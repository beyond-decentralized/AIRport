import {IRelationColumnReference} from "./IRelationColumnReference";

export interface ILinkingDictionary {
	dbColumnRelationMapByManySide: {
		[domain: string]: {
			[applicationName: string]: {
				[entityIndex: number]: {
					[manyRelationIndex: number]: {
						[manyColumnIndex: number]: IRelationColumnReference
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
						[oneColumnIndex: number]: IRelationColumnReference
					}
				}
			}
		}
	};
}