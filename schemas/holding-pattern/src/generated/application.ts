/* eslint-disable */
export const APPLICATION = {
	"domain": "air",
	"index": null,
	"name": "@airport/holding-pattern",
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
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
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
							"name": "GUID",
							"notNull": true,
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
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplicationIndex": 0,
									"oneTableIndex": 4,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "USER_ID",
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
									"manyRelationIndex": 1,
									"oneApplicationIndex": 0,
									"oneTableIndex": 12,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "TERMINAL_ID",
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
									"manyRelationIndex": 2,
									"oneApplicationIndex": 1,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_INDEX",
							"notNull": false,
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
									"manyRelationIndex": 3,
									"oneApplicationIndex": 0,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "CLIENT_ID",
							"notNull": false,
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
							"index": 0
						}
					],
					"index": 0,
					"isLocal": true,
					"isAirEntity": false,
					"name": "Actor",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
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
							"index": 2,
							"isId": false,
							"name": "user",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "terminal",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "application",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "client",
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
								"index": 2
							},
							"relationTableIndex": 4,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 12,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 10,
							"relationTableApplicationIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 10,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
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
							"name": "COLUMN_INDEX",
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
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "NEW_VALUE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "ANY"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplicationIndex": null,
									"oneTableIndex": 3,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_RECORD_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 0
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
							"index": 2
						}
					],
					"index": 1,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RecordHistoryNewValue",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "recordHistory",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 1,
							"isId": true,
							"name": "columnIndex",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "newValue",
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
							"relationTableIndex": 3,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_RECORD_HISTORY_NEW_VALUES",
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
							"name": "COLUMN_INDEX",
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
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "OLD_VALUE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "ANY"
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplicationIndex": null,
									"oneTableIndex": 3,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_RECORD_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 0
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
							"index": 2
						}
					],
					"index": 2,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RecordHistoryOldValue",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "recordHistory",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 1,
							"isId": true,
							"name": "columnIndex",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "oldValue",
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
							"relationTableIndex": 3,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_RECORD_HISTORY_OLD_VALUES",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"allocationSize": 2000,
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
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
							"name": "ACTOR_RECORD_ID",
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
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplicationIndex": null,
									"oneTableIndex": 0,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
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
									"manyRelationIndex": 1,
									"oneApplicationIndex": null,
									"oneTableIndex": 12,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_OPERATION_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
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
					"index": 3,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RecordHistory",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "actorRecordId",
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "actor",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "operationHistory",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "newValues",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "oldValues",
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
								"index": 2
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 12,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "recordHistory"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "recordHistory"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 2,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_RECORD_HISTORY",
						"columnIndexes": [
							{
								"name": "RCRD_HSTR_TO_OPRTN_HSTR_FX",
								"columnList": [
									"REPOSITORY_OPERATION_HISTORY_ID"
								],
								"unique": false
							}
						]
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
									"oneApplicationIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
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
									"oneApplicationIndex": 0,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "TYPE_ID",
							"notNull": false,
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
					"index": 4,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RepositoryType",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "type",
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
							"relationTableIndex": 9,
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
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_TYPES",
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
									"oneApplicationIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
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
									"oneApplicationIndex": 0,
									"oneTableIndex": 15,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DATABASE_ID",
							"notNull": false,
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
					"index": 5,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RepositoryDatabase",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "database",
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
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 15,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_DATABASES",
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
									"oneApplicationIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
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
									"oneApplicationIndex": 0,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "CLIENT_ID",
							"notNull": false,
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
					"index": 6,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RepositoryClient",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "client",
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
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 10,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_CLIENTS",
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
									"oneApplicationIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 9,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
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
									"oneApplicationIndex": 0,
									"oneTableIndex": 12,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "TERMINAL_ID",
							"notNull": false,
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
					"index": 7,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RepositoryTerminal",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "terminal",
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
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 12,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_TERMINALS",
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
									"oneApplicationIndex": 1,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "APPLICATION_INDEX",
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
									"oneApplicationIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 6,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": false,
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
					"index": 8,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RepositoryApplication",
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
							"name": "repository",
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
							"relationTableApplicationIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_APPLICATIONS",
						"columnIndexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
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
							"name": "AGE_SUITABILITY",
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
							"name": "CREATED_AT",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": "DATE"
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IMMUTABLE",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": "BOOLEAN"
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SOURCE",
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
							"name": "GUID",
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
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplicationIndex": 0,
									"oneTableIndex": 4,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "OWNER_USER_ID",
							"notNull": true,
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
									"manyRelationIndex": 2,
									"oneApplicationIndex": 0,
									"oneTableIndex": 0,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "CONTINENT_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 8
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
									"manyRelationIndex": 3,
									"oneApplicationIndex": 0,
									"oneTableIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "COUNTRY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 9
								}
							],
							"sinceVersion": 1,
							"type": "NUMBER"
						},
						{
							"index": 9,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneApplicationIndex": 0,
									"oneTableIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "STATE_ID",
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
							"index": 10,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 5,
									"oneApplicationIndex": 0,
									"oneTableIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "METRO_AREA_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 11
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
					"index": 9,
					"isLocal": true,
					"isAirEntity": false,
					"name": "Repository",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "ageSuitability",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "createdAt",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": false,
							"name": "immutable",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "source",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "GUID",
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "owner",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "repositoryTransactionHistory",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "continent",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "country",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 10,
							"isId": false,
							"name": "state",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 11,
							"isId": false,
							"name": "metroArea",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 12,
							"isId": false,
							"name": "repositoryApplications",
							"relationRef": {
								"index": 6
							},
							"sinceVersion": 1
						},
						{
							"index": 13,
							"isId": false,
							"name": "repositoryClients",
							"relationRef": {
								"index": 7
							},
							"sinceVersion": 1
						},
						{
							"index": 14,
							"isId": false,
							"name": "repositoryDatabases",
							"relationRef": {
								"index": 8
							},
							"sinceVersion": 1
						},
						{
							"index": 15,
							"isId": false,
							"name": "repositoryTerminals",
							"relationRef": {
								"index": 9
							},
							"sinceVersion": 1
						},
						{
							"index": 16,
							"isId": false,
							"name": "repositoryTypes",
							"relationRef": {
								"index": 10
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
								"index": 6
							},
							"relationTableIndex": 4,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repository"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 11,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 0,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 1,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 10
							},
							"relationTableIndex": 2,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 11
							},
							"relationTableIndex": 3,
							"relationTableApplicationIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repository"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 12
							},
							"relationTableIndex": 8,
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repository"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 13
							},
							"relationTableIndex": 6,
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repository"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 14
							},
							"relationTableIndex": 5,
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repository"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 15
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						},
						{
							"index": 10,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repository"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 16
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"allocationSize": 100,
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
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
							"name": "TRANSACTION_TYPE",
							"notNull": true,
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
					"index": 10,
					"isLocal": true,
					"isAirEntity": false,
					"name": "TransactionHistory",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "transactionType",
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "repositoryTransactionHistories",
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
								"mappedBy": "transactionHistory"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 11,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "TRANSACTION_HISTORY",
						"columnIndexes": []
					}
				},
				{
					"columns": [
						{
							"allocationSize": 200,
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
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
							"name": "REPOSITORY_TRANSACTION_TYPE",
							"notNull": true,
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
							"name": "SAVE_TIMESTAMP",
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
							"name": "SYNC_TIMESTAMP",
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
							"name": "GUID",
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
							"name": "IS_REPOSITORY_CREATION",
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
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneApplicationIndex": null,
									"oneTableIndex": 9,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": true,
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
									"manyRelationIndex": 1,
									"oneApplicationIndex": null,
									"oneTableIndex": 10,
									"oneRelationIndex": 0,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "TRANSACTION_HISTORY_ID",
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
					"index": 11,
					"isLocal": true,
					"isAirEntity": false,
					"name": "RepositoryTransactionHistory",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "repositoryTransactionType",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "saveTimestamp",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": false,
							"name": "syncTimestamp",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "GUID",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "isRepositoryCreation",
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "transactionHistory",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "operationHistory",
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
								"index": 6
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repositoryTransactionHistory"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 12,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_TRANSACTION_HISTORY",
						"columnIndexes": []
					},
					"operations": {}
				},
				{
					"columns": [
						{
							"allocationSize": 600,
							"index": 0,
							"isGenerated": true,
							"manyRelationColumnRefs": [],
							"name": "ID",
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
							"name": "ORDER_NUMBER",
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
							"name": "CHANGE_TYPE",
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
							"name": "SYSTEM_WIDE_OPERATION_ID",
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
									"manyRelationIndex": 0,
									"oneApplicationIndex": 1,
									"oneTableIndex": 6,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "ENTITY_ID",
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
									"manyRelationIndex": 1,
									"oneApplicationIndex": null,
									"oneTableIndex": 0,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
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
									"manyRelationIndex": 2,
									"oneApplicationIndex": null,
									"oneTableIndex": 11,
									"oneRelationIndex": 2,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_TRANSACTION_HISTORY_ID",
							"notNull": true,
							"propertyRefs": [
								{
									"index": 6
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
					"index": 12,
					"isLocal": true,
					"isAirEntity": false,
					"name": "OperationHistory",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "id",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "orderNumber",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "changeType",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": false,
							"name": "systemWideOperationId",
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "actor",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "repositoryTransactionHistory",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "recordHistory",
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
								"index": 4
							},
							"relationTableIndex": 6,
							"relationTableApplicationIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": "MANY_TO_ONE",
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 11,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "operationHistory"
							},
							"relationType": "ONE_TO_MANY",
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 3,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_OPERATION_HISTORY",
						"columnIndexes": []
					}
				}
			],
			"integerVersion": 1,
			"referencedApplications": [
				{
					"domain": "air",
					"index": 0,
					"name": "@airport/travel-document-checkpoint",
					"sinceVersion": 1,
					"versions": [
						{
							"entities": null,
							"integerVersion": 1,
							"referencedApplications": null,
							"versionString": "1.0.0"
						}
					]
				},
				{
					"domain": "air",
					"index": 1,
					"name": "@airport/airspace",
					"sinceVersion": 1,
					"versions": [
						{
							"entities": null,
							"integerVersion": 1,
							"referencedApplications": null,
							"versionString": "1.0.0"
						}
					]
				}
			],
			"versionString": "1.0.0"
		}
	]
};