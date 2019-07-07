export const SCHEMA = {
	"domain": "npmjs.org",
	"index": null,
	"name": "@airport/moving-walkway",
	"sinceVersion": 1,
	"versions": [
		{
			"entities": [
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "COLUMNINDEX",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SYNCHRONIZATION_CONFLICT_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
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
					"index": 0,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SynchronizationConflictValues",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "synchronizationConflict",
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
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SYNCHRONIZATION_CONFLICT_VALUES",
						"indexes": []
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
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TYPE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 0,
									"oneTableIndex": 10,
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
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 0,
									"oneTableIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "OVERWRITTEN_RECORD_HISTORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": 0,
									"oneTableIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "OVERWRITING_RECORD_HISTORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 1,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SynchronizationConflict",
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
							"index": 1,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "overwrittenRecordHistory",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "overwritingRecordHistory",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "values",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 5,
							"isId": false,
							"name": "type",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 10,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 1,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 1,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"cascade": 1,
								"mappedBy": "SYNCHRONIZATION_CONFLICT_ID"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SYNCHRONIZATION_CONFLICT",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ACKNOWLEDGED",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 1
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SYNC_CONFLICT_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 0,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 1
						},
						{
							"index": 2
						}
					],
					"index": 2,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SynchronizationConflictPendingNotification",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "synchronizationConflict",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "actor",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 2,
							"isId": false,
							"name": "acknowledged",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 7,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SYNC_CONFLICT_PENDING_NOTIFICATION",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ACTOR_RECORD_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "STATUS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 1,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 1,
									"oneTableIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_ENTITY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": 0,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": 0,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 3,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "MissingRecord",
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
							"index": 1,
							"isId": false,
							"name": "schemaVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "actor",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 5,
							"isId": false,
							"name": "actorRecordId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 6,
							"isId": false,
							"name": "status",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 7,
							"relationTableSchemaIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 5,
							"relationTableSchemaIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 10,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 7,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "MISSING_RECORDS",
						"indexes": []
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
									"oneSchemaIndex": null,
									"oneTableIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "MISSING_RECORD_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 16,
									"oneRelationIndex": 5,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_TRANSACTION_BLOCK_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [],
					"index": 4,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "MissingRecordRepoTransBlock",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "missingRecord",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"name": "repositoryTransactionBlock",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 3,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 16,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "MISSING_RECORD_REPO_TRANS_BLOCKS",
						"indexes": []
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
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ACTOR_RECORD_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "UPDATED_VALUE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 7
								}
							],
							"sinceVersion": 1,
							"type": 0
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 1,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_VERSION_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 1,
									"oneTableIndex": 5,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_ENTITY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 2,
									"oneSchemaIndex": 0,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 3,
									"oneSchemaIndex": 0,
									"oneTableIndex": 7,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "ACTOR_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 7,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 4,
									"oneSchemaIndex": 1,
									"oneTableIndex": 0,
									"oneColumnIndex": 3,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_COLUMN_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 5,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RecordUpdateStage",
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
							"index": 1,
							"isId": false,
							"name": "schemaVersion",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"name": "entity",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "actor",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 5,
							"isId": false,
							"name": "actorRecordId",
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "column",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 7,
							"isId": false,
							"name": "updatedValue",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 7,
							"relationTableSchemaIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 5,
							"relationTableSchemaIndex": 1,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 10,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 7,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 0,
							"relationTableSchemaIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "RECORD_UPDATE_STAGE",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SYNC_OUTCOME_TYPE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 6,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepoTransBlockResponseStage",
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
							"name": "syncOutcomeType",
							"sinceVersion": 1
						}
					],
					"relations": [],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPO_TRANS_BLOCK_RESPONSE_STAGE",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "STATUS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 16,
									"oneRelationIndex": 6,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SHARING_MESSAGE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 1,
									"oneTableIndex": 8,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SCHEMA_INDEX",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 1
						},
						{
							"index": 2
						}
					],
					"index": 7,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepoTransBlockSchemaToChange",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "repositoryTransactionBlock",
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
							"isId": false,
							"name": "status",
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": true,
							"name": "schema",
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
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 16,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 2
							},
							"relationTableIndex": 8,
							"relationTableSchemaIndex": 1,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPO_TRANS_BLOCK_SCHEMAS_TO_CHANGE",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_TRANSACTION_HISTORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "BLOCK_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 8,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepositoryTransactionHistoryUpdateStage",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "repositoryTransactionHistoryId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": false,
							"name": "blockId",
							"sinceVersion": 1
						}
					],
					"relations": [],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_TRANSACTION_HISTORY_UPDATE_STAGE",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SYNC_STATUS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 10,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SHARING_NODE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 16,
									"oneRelationIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_TRANSACTION_BLOCK_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 1
						},
						{
							"index": 2
						}
					],
					"index": 9,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SharingNodeRepoTransBlock",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "sharingNode",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "repositoryTransactionBlock",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 2,
							"isId": false,
							"name": "syncStatus",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 16,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SHARING_NODE_REPO_TRANS_BLOCKS",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SHARING_MECHANISM",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "IS_ACTIVE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 1
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SYNC_FREQUENCY",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "CONNECTION_PROTOCOL",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "CONNECTION_URL",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 5
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 10,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SharingNode",
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
							"name": "sharingMechanism",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "isActive",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 3,
							"isId": false,
							"name": "syncFrequency",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 4,
							"isId": false,
							"name": "connectionProtocol",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 5
							},
							"index": 5,
							"isId": false,
							"name": "connectionUrl",
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"name": "messages",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "sharingNodeRepoTransBlocks",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "sharingNode"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 6
							},
							"relationTableIndex": 14,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "sharingNode"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SHARING_NODES",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SHARING_NODE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_TRANSACTION_BLOCK_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SYNC_STATUS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
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
					"index": 11,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SharingNodeRepoTransBlockStage",
					"properties": [
						{
							"columnRef": {
								"index": 0
							},
							"index": 0,
							"isId": true,
							"name": "sharingNodeId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 1,
							"isId": true,
							"name": "repositoryTransactionBlockId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "syncStatus",
							"sinceVersion": 1
						}
					],
					"relations": [],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SHARING_NODE_REPO_TRANS_BLOCK_STAGE",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "AGT_REPOSITORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ADVISED_SYNC_PRIORITY",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_SYNC_STATUS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SHARING_NODE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 0,
									"oneTableIndex": 10,
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
							"type": 4
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
					"index": 12,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SharingNodeRepository",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "sharingNode",
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
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 2,
							"isId": false,
							"name": "agtRepositoryId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 3,
							"isId": false,
							"name": "advisedSyncPriority",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 4,
							"isId": false,
							"name": "repositorySyncStatus",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 10,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SHARING_NODE_REPOSITORIES",
						"primaryKey": [
							"SHARING_NODE_ID",
							"REPOSITORY_ID"
						],
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "AGT_TERMINAL_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TERMINAL_PASSWORD",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "TERMINAL_SYNC_STATUS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SHARING_NODE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 2,
									"oneTableIndex": 3,
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
							"type": 4
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
					"index": 13,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SharingNodeTerminal",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "sharingNode",
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
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 2,
							"isId": false,
							"name": "agtTerminalId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 3,
							"isId": false,
							"name": "agtTerminalPassword",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 4,
							"isId": false,
							"name": "terminalSyncStatus",
							"sinceVersion": 1
						}
					],
					"relations": [
						{
							"index": 0,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 3,
							"relationTableSchemaIndex": 2,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SHARING_NODE_TERMINAL",
						"indexes": []
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
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ORIGIN",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "AGT_SHARING_MESSAGE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SYNC_TIMESTAMP",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 2
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": null,
									"oneTableIndex": 10,
									"oneRelationIndex": 0,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SHARING_NODE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						},
						{
							"index": 4
						}
					],
					"index": 14,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SharingMessage",
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
							"index": 1,
							"isId": true,
							"name": "sharingNode",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 1
							},
							"index": 2,
							"isId": false,
							"name": "origin",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 3,
							"isId": false,
							"name": "agtSharingMessageId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 4,
							"isId": false,
							"name": "syncTimestamp",
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"name": "sharingMessageRepoTransBlocks",
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
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 10,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "sharingMessage"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 5
							},
							"relationTableIndex": 15,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SHARING_MESSAGES",
						"indexes": []
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
									"oneSchemaIndex": null,
									"oneTableIndex": 14,
									"oneRelationIndex": 1,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SHARING_MESSAGE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": null,
									"oneTableIndex": 16,
									"oneRelationIndex": 4,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_TRANSACTION_BLOCK_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
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
					"index": 15,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "SharingMessageRepoTransBlock",
					"properties": [
						{
							"index": 0,
							"isId": true,
							"name": "sharingMessage",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "repositoryTransactionBlock",
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
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 14,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"relationType": 1,
							"propertyRef": {
								"index": 1
							},
							"relationTableIndex": 16,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "SHARING_MESSAGE_REPO_TRANS_BLOCKS",
						"indexes": []
					}
				},
				{
					"columns": [
						{
							"index": 0,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 0
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SOURCE_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 2,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "HASH",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 2
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 3,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "SYNC_OUTCOME_TYPE",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 5
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 4,
							"isGenerated": false,
							"manyRelationColumnRefs": [],
							"name": "CONTENTS",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 6
								}
							],
							"sinceVersion": 1,
							"type": 5
						},
						{
							"index": 5,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 2,
									"oneTableIndex": 3,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "SOURCE_TERMINAL_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 3
								}
							],
							"sinceVersion": 1,
							"type": 4
						},
						{
							"index": 6,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 0,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 4
								}
							],
							"sinceVersion": 1,
							"type": 4
						}
					],
					"idColumnRefs": [
						{
							"index": 0
						}
					],
					"index": 16,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "RepositoryTransactionBlock",
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
							"name": "sourceId",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 2
							},
							"index": 2,
							"isId": false,
							"name": "hash",
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"name": "source",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 3
							},
							"index": 5,
							"isId": false,
							"name": "syncOutcomeType",
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 4
							},
							"index": 6,
							"isId": false,
							"name": "contents",
							"sinceVersion": 1
						},
						{
							"index": 7,
							"isId": false,
							"name": "repositoryTransactionHistory",
							"relationRef": {
								"index": 2
							},
							"sinceVersion": 1
						},
						{
							"index": 8,
							"isId": false,
							"name": "sharingNodeRepoTransBlocks",
							"relationRef": {
								"index": 3
							},
							"sinceVersion": 1
						},
						{
							"index": 9,
							"isId": false,
							"name": "sharingMessageRepoTransBlocks",
							"relationRef": {
								"index": 4
							},
							"sinceVersion": 1
						},
						{
							"index": 10,
							"isId": false,
							"name": "missingRecordRepoTransBlocks",
							"relationRef": {
								"index": 5
							},
							"sinceVersion": 1
						},
						{
							"index": 11,
							"isId": false,
							"name": "repoTransBlockSchemasToChange",
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
							"relationType": 1,
							"propertyRef": {
								"index": 3
							},
							"relationTableIndex": 3,
							"relationTableSchemaIndex": 2,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 4
							},
							"relationTableIndex": 10,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 2,
							"isId": false,
							"relationType": 0,
							"propertyRef": {
								"index": 7
							},
							"relationTableIndex": 5,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 3,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repositoryTransactionBlock"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 8
							},
							"relationTableIndex": 9,
							"sinceVersion": 1
						},
						{
							"index": 4,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repositoryTransactionBlock"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 9
							},
							"relationTableIndex": 15,
							"sinceVersion": 1
						},
						{
							"index": 5,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repositoryTransactionBlock"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 10
							},
							"relationTableIndex": 4,
							"sinceVersion": 1
						},
						{
							"index": 6,
							"isId": false,
							"oneToManyElems": {
								"mappedBy": "repositoryTransactionBlock"
							},
							"relationType": 0,
							"propertyRef": {
								"index": 11
							},
							"relationTableIndex": 7,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "REPOSITORY_TRANSACTION_BLOCKS",
						"indexes": []
					}
				}
			],
			"integerVersion": 1,
			"referencedSchemas": [
				{
					"domain": "npmjs.org",
					"index": 0,
					"name": "@airport/holding-pattern",
					"sinceVersion": 1,
					"versions": [
						{
							"entities": null,
							"integerVersion": 1,
							"referencedSchemas": null,
							"versionString": "1.0.0"
						}
					]
				},
				{
					"domain": "npmjs.org",
					"index": 1,
					"name": "@airport/traffic-pattern",
					"sinceVersion": 1,
					"versions": [
						{
							"entities": null,
							"integerVersion": 1,
							"referencedSchemas": null,
							"versionString": "1.0.0"
						}
					]
				},
				{
					"domain": "npmjs.org",
					"index": 2,
					"name": "@airport/travel-document-checkpoint",
					"sinceVersion": 1,
					"versions": [
						{
							"entities": null,
							"integerVersion": 1,
							"referencedSchemas": null,
							"versionString": "1.0.0"
						}
					]
				}
			],
			"versionString": "1.0.0"
		}
	]
};