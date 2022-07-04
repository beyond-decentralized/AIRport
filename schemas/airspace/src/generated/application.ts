/* eslint-disable */
export const APPLICATION = {
	"domain": "air",
	"index": null,
	"name": "@airport/airspace",
	"sinceVersion": 1,
	"versions": [
		{
			"api": {
				"apiObjectMap": {}
			},
			"entities": [
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_RELATION_COLUMN_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneApplication_Index": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "MANY_APPLICATION_COLUMN_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneApplication_Index": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 6,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "ONE_APPLICATION_COLUMN_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 5,
									"oneApplication_Index": null,
									"oneTableIndex": 1,
									"oneRelationIndex": 6,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "MANY_APPLICATION_RELATION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 6,
									"oneApplication_Index": null,
									"oneTableIndex": 1,
									"oneRelationIndex": 7,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "ONE_APPLICATION_RELATION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 7,
									"oneApplication_Index": null,
									"oneTableIndex": 1,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "PARENT_RELATION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 0,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationRelationColumn",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "_localId",
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "manyColumn",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "oneColumn",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "manyRelation",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "oneRelation",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "parentRelation",
							"relationRef": {
								"index": 7
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_RELATION_COLUMNS",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_RELATION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RELATION_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "FOREIGN_KEY",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": "JSON"
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MANY_TO_ONE_ELEMENTS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": "JSON"
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ONE_TO_MANY_ELEMENTS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": "JSON"
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RELATION_TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 9
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 9,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 10
								}
							],
							"sinceVersion": 1,
							"type": "BOOLEAN"
						},
						{
							"index": 10,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneApplication_Index": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_PROPERTY_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 11,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneApplication_Index": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 7,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_ENTITY_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 11
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 12,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 5,
									"oneApplication_Index": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 8,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "RELATION_APPLICATION_ENTITY_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 12
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 1,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationRelation",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "_localId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "property",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 6,
							"isId": false,
							"name": "foreignKey",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 7,
							"isId": false,
							"name": "manyToOneElems",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 7
							},
							"index": 8,
							"isId": false,
							"name": "oneToManyElems",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 8
							},
							"index": 9,
							"isId": false,
							"name": "relationType",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 9
							},
							"index": 10,
							"isId": false,
							"name": "isId",
							"sinceVersion": 1
						},
						{
							"index": 11,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 12,
							"isId": false,
							"name": "relationEntity",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 13,
							"isId": false,
							"name": "manyRelationColumns",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						},
						{
							"index": 14,
							"isId": false,
							"name": "oneRelationColumns",
							"relationRef": {
								"index": 7
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 2,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 11
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 12
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "manyRelation"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 13
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "oneRelation"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 14
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_RELATIONS",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_PROPERTY_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "PROPERTY_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": "BOOLEAN"
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneApplication_Index": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 6,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_ENTITY_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 2,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationProperty",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "_localId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 6,
							"isId": false,
							"name": "isId",
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "propertyColumns",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "relation",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "property"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 3,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "property"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_PROPERTIES",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneApplication_Index": null,
									"oneTableIndex": 4,
									"oneRelationIndex": 4,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_COLUMN_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneApplication_Index": null,
									"oneTableIndex": 2,
									"oneRelationIndex": 4,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_PROPERTY_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						},
						{
							"index": 4
						}
					],
					"index": 3,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationPropertyColumn",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": true,
							"name": "column",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": true,
							"name": "property",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 2,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_PROPERTY_COLUMNS",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_COLUMN_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "COLUMN_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID_INDEX",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_GENERATED",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": "BOOLEAN"
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ALLOCATION_SIZE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 9,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NOT_NULL",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 9
								}
							],
							"sinceVersion": 1,
							"type": "BOOLEAN"
						},
						{
							"index": 10,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "PRECISION",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 10
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 11,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCALE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 11
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 12,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 12
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 13,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneApplication_Index": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 4,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_ENTITY_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 13
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 4,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationColumn",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "_localId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "idIndex",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 6,
							"isId": false,
							"name": "isGenerated",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 7
							},
							"index": 7,
							"isId": false,
							"name": "allocationSize",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 8
							},
							"index": 8,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 9
							},
							"index": 9,
							"isId": false,
							"name": "notNull",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 10
							},
							"index": 10,
							"isId": false,
							"name": "precision",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 11
							},
							"index": 11,
							"isId": false,
							"name": "scale",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 12
							},
							"index": 12,
							"isId": false,
							"name": "type",
							"sinceVersion": 1
						},
						{
							"index": 13,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 14,
							"isId": false,
							"name": "propertyColumns",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 15,
							"isId": false,
							"name": "manyRelationColumns",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 16,
							"isId": false,
							"name": "oneRelationColumns",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 13
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "column"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 14
							},
							"relationTableIndex": 3,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "manyColumn"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 15
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "oneColumn"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 16
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_COLUMNS",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 3,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_OPERATION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TYPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "RULE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": "JSON"
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneApplication_Index": null,
									"oneTableIndex": 6,
									"oneRelationIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_ENTITY_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 5,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationOperation",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "_localId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "type",
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 6,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 7,
							"isId": false,
							"name": "rule",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_OPERATIONS",
						"columnIndexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_ENTITY_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TABLE_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_LOCAL",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "BOOLEAN"
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_AIR_ENTITY",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": "BOOLEAN"
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 8,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TABLE_CONFIGURATION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 8
								}
							],
							"sinceVersion": 1,
							"type": "JSON"
						},
						{
							"index": 9,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 9
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 3
						}
					],
					"index": 6,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationEntity",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": true,
							"name": "_localId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "isLocal",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 6,
							"isId": false,
							"name": "isAirEntity",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 7
							},
							"index": 7,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 8
							},
							"index": 8,
							"isId": false,
							"name": "tableConfig",
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "applicationVersion",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 10,
							"isId": false,
							"name": "columns",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 11,
							"isId": false,
							"name": "operations",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 12,
							"isId": false,
							"name": "properties",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						},
						{
							"index": 13,
							"isId": false,
							"name": "relations",
							"relationRef": {
								"index": 7
							},
							"sinceVersion": 1
						},
						{
							"index": 14,
							"isId": false,
							"name": "relationReferences",
							"relationRef": {
								"index": 8
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "entity"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 10
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "entity"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 11
							},
							"relationTableIndex": 5,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "entity"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 12
							},
							"relationTableIndex": 2,
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "entity"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 13
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "relationEntity"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 14
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_ENTITIES",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REMOVED_IN_APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SINCE_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_REFERENCE_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "OWN_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REFERENCED_APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 4
						},
						{
							"index": 5
						}
					],
					"index": 7,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationReference",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "deprecatedSinceVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "removedInVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "sinceVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": true,
							"name": "ownApplicationVersion",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": true,
							"name": "referencedApplicationVersion",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 5,
							"isId": false,
							"name": "index",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_REFERENCES",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"allocationSize": 100,
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_VERSION_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "INTEGER_VERSION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "VERSION_STRING",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MAJOR_VERSION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "MINOR_VERSION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "PATCH_VERSION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "JSON_APPLICATION",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": "JSON"
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 10,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 8,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationVersion",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "_localId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "integerVersion",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "versionString",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": false,
							"name": "majorVersion",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "minorVersion",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "patchVersion",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 6,
							"isId": false,
							"name": "jsonApplication",
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "application",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "entities",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "references",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 10,
							"isId": false,
							"name": "referencedBy",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "applicationVersion"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "ownApplicationVersion"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "referencedApplicationVersion"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 10
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_VERSIONS",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 10,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneApplication_Index": null,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_VERSION_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 1
						}
					],
					"index": 9,
					"isLocal": true,
					"isAirEntity": false,
					"name": "ApplicationCurrentVersion",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "application",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "applicationVersion",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATION_CURRENT_VERSIONS",
						"columnIndexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_INDEX",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "GUID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SCOPE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "APPLICATION_NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "FULL_APPLICATION_NAME",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "STATUS",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SIGNATURE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplication_Index": null,
									"oneTableIndex": 11,
									"oneRelationIndex": 0,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DOMAIN_LID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 10,
					"isLocal": true,
					"isAirEntity": false,
					"name": "Application",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "index",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "GUID",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "scope",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "fullName",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "status",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 6
							},
							"index": 6,
							"isId": false,
							"name": "signature",
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "domain",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "versions",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "currentVersion",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 11,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "application"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "application"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "APPLICATIONS",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "DOMAIN_LID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NAME",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": "STRING"
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 11,
					"isLocal": true,
					"isAirEntity": false,
					"name": "Domain",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "_localId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "name",
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "applications",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "domain"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "DOMAINS",
						"columnIndexes": []
					},
					"operations": {}
				}
			],
			"integerVersion": 1,
			"referencedApplications": [],
			"versionString": "1.0.0"
		}
	]
};