export const SCHEMA = {
	"domain": "public",
	"entities": [
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 13,
							"oneRelationIndex": 3,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 15,
							"oneRelationIndex": 6,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 2
						},
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "SYNC_RECORD_ADD_DATETIME",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 13,
							"oneRelationIndex": 3,
							"oneColumnIndex": 1
						}
					],
					"name": "DATABASE_SYNC_LOG_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 13,
							"oneRelationIndex": 3,
							"oneColumnIndex": 2
						}
					],
					"name": "DATABASE_SYNC_LOG_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 15,
							"oneRelationIndex": 6,
							"oneColumnIndex": 1
						}
					],
					"name": "SYNC_RECORD_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 6,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 15,
							"oneRelationIndex": 6,
							"oneColumnIndex": 2
						}
					],
					"name": "SYNC_RECORD_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 3
				},
				{
					"index": 4
				},
				{
					"index": 5
				},
				{
					"index": 6
				}
			],
			"index": 0,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "SyncLog",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"index": 2,
					"isId": true,
					"name": "databaseSyncLog",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 3,
					"isId": true,
					"name": "syncRecord",
					"relationRef": {
						"index": 3
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 4,
					"isId": false,
					"name": "syncRecordAddDatetime"
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 2
					},
					"relationTableIndex": 13
				},
				{
					"index": 3,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 15
				}
			],
			"tableConfig": {
				"name": "SYNC_LOG"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 2,
							"oneRelationIndex": 2,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 2,
							"oneRelationIndex": 2,
							"oneColumnIndex": 1
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						},
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": true,
					"manyRelationColumnRefs": [],
					"name": "ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "TYPE",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "START_DATETIME",
					"propertyRefs": [
						{
							"index": 5
						}
					],
					"type": 2
				},
				{
					"index": 5,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "PROCESSED_DATETIME",
					"propertyRefs": [
						{
							"index": 6
						}
					],
					"type": 2
				},
				{
					"index": 6,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "NUMBER_OF_CONNECTIONS",
					"propertyRefs": [
						{
							"index": 7
						}
					],
					"type": 4
				},
				{
					"index": 7,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "NUMBER_OF_SYNC_RECORDS",
					"propertyRefs": [
						{
							"index": 8
						}
					],
					"type": 4
				},
				{
					"index": 8,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "DATA_CHARS_TOTAL",
					"propertyRefs": [
						{
							"index": 9
						}
					],
					"type": 4
				},
				{
					"index": 9,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 2,
							"oneRelationIndex": 2,
							"oneColumnIndex": 2
						}
					],
					"name": "SERVER_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				}
			],
			"index": 1,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "ServerSyncLog",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "id"
				},
				{
					"index": 3,
					"isId": false,
					"name": "server",
					"relationRef": {
						"index": 2
					}
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 4,
					"isId": false,
					"name": "type"
				},
				{
					"columnRef": {
						"index": 4
					},
					"index": 5,
					"isId": false,
					"name": "startDatetime"
				},
				{
					"columnRef": {
						"index": 5
					},
					"index": 6,
					"isId": false,
					"name": "endDatetime"
				},
				{
					"columnRef": {
						"index": 6
					},
					"index": 7,
					"isId": false,
					"name": "numberOfConnections"
				},
				{
					"columnRef": {
						"index": 7
					},
					"index": 8,
					"isId": false,
					"name": "numberOfRecords"
				},
				{
					"columnRef": {
						"index": 8
					},
					"index": 9,
					"isId": false,
					"name": "dataCharsTotal"
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 2
				}
			],
			"tableConfig": {
				"name": "SERVER_SYNC_LOG"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "SERVERTYPE",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
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
			"name": "Server",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "id"
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 3,
					"isId": false,
					"name": "serverType"
				},
				{
					"index": 4,
					"isId": false,
					"name": "serverSyncLogs",
					"relationRef": {
						"index": 2
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 1
				}
			],
			"tableConfig": {
				"name": "SERVERS"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 4,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 4,
							"oneColumnIndex": 1
						}
					],
					"name": "DATABASE_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 4,
							"oneColumnIndex": 2
						}
					],
					"name": "DATABASE_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneColumnIndex": 0
						}
					],
					"name": "REPOSITORY_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						},
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneColumnIndex": 1
						}
					],
					"name": "REPOSITORY_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 6,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneColumnIndex": 2
						}
					],
					"name": "REPOSITORY_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				},
				{
					"index": 3
				},
				{
					"index": 4
				},
				{
					"index": 5
				},
				{
					"index": 6
				}
			],
			"index": 3,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "DatabaseRepository",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"index": 2,
					"isId": true,
					"name": "database",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 3,
					"isId": true,
					"name": "repositoryShard",
					"relationRef": {
						"index": 3
					}
				},
				{
					"index": 4,
					"isId": true,
					"name": "repository",
					"relationRef": {
						"index": 4
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 2
					},
					"relationTableIndex": 14
				},
				{
					"index": 3,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 4,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 16
				}
			],
			"tableConfig": {
				"name": "DATABASE_REPOSITORIES"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneRelationIndex": 3,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneRelationIndex": 3,
							"oneColumnIndex": 1
						}
					],
					"name": "REPOSITORY_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneRelationIndex": 3,
							"oneColumnIndex": 2
						}
					],
					"name": "REPOSITORY_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneColumnIndex": 0
						}
					],
					"name": "DATABASE_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						},
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneColumnIndex": 1
						}
					],
					"name": "DATABASE_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 6,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneColumnIndex": 2
						}
					],
					"name": "DATABASE_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				},
				{
					"index": 3
				},
				{
					"index": 4
				},
				{
					"index": 5
				},
				{
					"index": 6
				}
			],
			"index": 4,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "RepositoryDatabase",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"index": 2,
					"isId": true,
					"name": "repository",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 3,
					"isId": true,
					"name": "databaseShard",
					"relationRef": {
						"index": 3
					}
				},
				{
					"index": 4,
					"isId": true,
					"name": "database",
					"relationRef": {
						"index": 4
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 2
					},
					"relationTableIndex": 16
				},
				{
					"index": 3,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 4,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 14
				}
			],
			"tableConfig": {
				"name": "REPOSITORY_DATABASES"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "SERVER_ID",
					"propertyRefs": [
						{
							"index": 0
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "VERIFICATION_RUN_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 7,
							"oneColumnIndex": 1
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 3,
							"oneColumnIndex": 2
						},
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 4,
							"oneColumnIndex": 5
						}
					],
					"name": "DATABASE_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						},
						{
							"index": 5
						},
						{
							"index": 6
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 7,
							"oneColumnIndex": 2
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 3,
							"oneColumnIndex": 3
						},
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 4,
							"oneColumnIndex": 6
						}
					],
					"name": "DATABASE_ID",
					"propertyRefs": [
						{
							"index": 3
						},
						{
							"index": 5
						},
						{
							"index": 6
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneRelationIndex": 5,
							"oneColumnIndex": 1
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 3,
							"oneColumnIndex": 5
						},
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 4,
							"oneColumnIndex": 2
						}
					],
					"name": "REPOSITORY_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 4
						},
						{
							"index": 5
						},
						{
							"index": 6
						}
					],
					"type": 4
				},
				{
					"index": 6,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneRelationIndex": 5,
							"oneColumnIndex": 2
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 3,
							"oneColumnIndex": 6
						},
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 4,
							"oneColumnIndex": 3
						}
					],
					"name": "REPOSITORY_ID",
					"propertyRefs": [
						{
							"index": 4
						},
						{
							"index": 5
						},
						{
							"index": 6
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				},
				{
					"index": 3
				},
				{
					"index": 4
				},
				{
					"index": 5
				},
				{
					"index": 6
				}
			],
			"index": 5,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "DatabaseRepositoryVerificationStage",
			"properties": [
				{
					"columnRef": {
						"index": 0
					},
					"index": 0,
					"isId": true,
					"name": "serverId"
				},
				{
					"columnRef": {
						"index": 1
					},
					"index": 1,
					"isId": true,
					"name": "runId"
				},
				{
					"index": 2,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 3,
					"isId": true,
					"name": "database",
					"relationRef": {
						"index": 1
					}
				},
				{
					"index": 4,
					"isId": true,
					"name": "repository",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 5,
					"isId": true,
					"name": "databaseRepository",
					"relationRef": {
						"index": 3
					}
				},
				{
					"index": 6,
					"isId": true,
					"name": "repositoryDatabase",
					"relationRef": {
						"index": 4
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 2
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 14
				},
				{
					"index": 2,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 16
				},
				{
					"index": 3,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 5
					},
					"relationTableIndex": 3
				},
				{
					"index": 4,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 6
					},
					"relationTableIndex": 4
				}
			],
			"tableConfig": {
				"name": "DATABASE_REPOSITORY_VERIFICATION_STAGE"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "SERVER_ID",
					"propertyRefs": [
						{
							"index": 0
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "VERIFICATION_RUN_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": null,
							"oneTableIndex": 13,
							"oneColumnIndex": 1
						}
					],
					"name": "DATABASE_SYNC_LOG_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": null,
							"oneTableIndex": 13,
							"oneColumnIndex": 2
						}
					],
					"name": "DATABASE_SYNC_LOG_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneColumnIndex": 1
						}
					],
					"name": "DATABASE_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 6,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneColumnIndex": 2
						}
					],
					"name": "DATABASE_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				},
				{
					"index": 3
				},
				{
					"index": 4
				},
				{
					"index": 5
				},
				{
					"index": 6
				}
			],
			"index": 6,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "DatabaseSyncLogVerificationStage",
			"properties": [
				{
					"columnRef": {
						"index": 0
					},
					"index": 0,
					"isId": true,
					"name": "serverId"
				},
				{
					"columnRef": {
						"index": 1
					},
					"index": 1,
					"isId": true,
					"name": "runId"
				},
				{
					"index": 2,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 3,
					"isId": true,
					"name": "databaseSyncLog",
					"relationRef": {
						"index": 1
					}
				},
				{
					"index": 4,
					"isId": true,
					"name": "database",
					"relationRef": {
						"index": 2
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 2
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 13
				},
				{
					"index": 2,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 14
				}
			],
			"tableConfig": {
				"name": "DATABASE_SYNC_LOG_VERIFICATION_STAGE"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "SERVER_ID",
					"propertyRefs": [
						{
							"index": 0
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "VERIFICATION_RUN_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 6,
							"oneColumnIndex": 1
						}
					],
					"name": "DATABASE_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 6,
							"oneColumnIndex": 2
						}
					],
					"name": "DATABASE_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				},
				{
					"index": 3
				},
				{
					"index": 4
				}
			],
			"index": 7,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "DatabaseVerificationStage",
			"properties": [
				{
					"columnRef": {
						"index": 0
					},
					"index": 0,
					"isId": true,
					"name": "serverId"
				},
				{
					"columnRef": {
						"index": 1
					},
					"index": 1,
					"isId": true,
					"name": "runId"
				},
				{
					"index": 2,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 3,
					"isId": true,
					"name": "database",
					"relationRef": {
						"index": 1
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 2
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 14
				}
			],
			"tableConfig": {
				"name": "DATABASE_VERIFICATION_STAGE"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 3,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "PERMISSION",
					"propertyRefs": [
						{
							"index": 5
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "REPOSITORY_SHARD_ID",
					"propertyRefs": [
						{
							"index": 2
						},
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneColumnIndex": 2
						}
					],
					"name": "REPOSITORY_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 3,
							"oneColumnIndex": 2
						}
					],
					"name": "USER_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 3
				},
				{
					"index": 4
				},
				{
					"index": 5
				}
			],
			"index": 8,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "UserRepository",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"index": 2,
					"isId": true,
					"name": "repository",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 3,
					"isId": true,
					"name": "repositoryShard",
					"relationRef": {
						"index": 3
					}
				},
				{
					"index": 4,
					"isId": true,
					"name": "user",
					"relationRef": {
						"index": 4
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 5,
					"isId": false,
					"name": "permission"
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 2
					},
					"relationTableIndex": 16
				},
				{
					"index": 3,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 4,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 9
				}
			],
			"tableConfig": {
				"name": "USER_REPOSITORIES"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": true,
					"manyRelationColumnRefs": [],
					"name": "ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "HASH",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 5
				},
				{
					"index": 4,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "EMAIL",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 5
				},
				{
					"index": 5,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "IS_INVITATION",
					"propertyRefs": [
						{
							"index": 5
						}
					],
					"type": 1
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
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
			"name": "User",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "id"
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 3,
					"isId": false,
					"name": "hash"
				},
				{
					"columnRef": {
						"index": 4
					},
					"index": 4,
					"isId": false,
					"name": "email"
				},
				{
					"columnRef": {
						"index": 5
					},
					"index": 5,
					"isId": false,
					"name": "isInvitation"
				},
				{
					"index": 6,
					"isId": false,
					"name": "securityAnswers",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 7,
					"isId": false,
					"name": "userRepositories",
					"relationRef": {
						"index": 3
					}
				},
				{
					"index": 8,
					"isId": false,
					"name": "databases",
					"relationRef": {
						"index": 4
					}
				},
				{
					"index": 9,
					"isId": false,
					"name": "syncRecords",
					"relationRef": {
						"index": 5
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 6
					},
					"relationTableIndex": 11
				},
				{
					"index": 3,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 7
					},
					"relationTableIndex": 8
				},
				{
					"index": 4,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 8
					},
					"relationTableIndex": 14
				},
				{
					"index": 5,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 9
					},
					"relationTableIndex": 15
				}
			],
			"tableConfig": {
				"name": "USERS"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "QUESTION",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 5
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				}
			],
			"index": 10,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "SecurityQuestion",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "id"
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 3,
					"isId": false,
					"name": "question"
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				}
			],
			"tableConfig": {
				"name": "SECURITY_QUESTIONS"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 2,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 10,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 2
						},
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "ANSWER",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 5
				},
				{
					"index": 3,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 2,
							"oneColumnIndex": 2
						}
					],
					"name": "USER_ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 10,
							"oneColumnIndex": 2
						}
					],
					"name": "SECURITY_QUESTION_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 3
				},
				{
					"index": 4
				}
			],
			"index": 11,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "SecurityAnswer",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"index": 2,
					"isId": true,
					"name": "user",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 3,
					"isId": true,
					"name": "securityQuestion",
					"relationRef": {
						"index": 3
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 4,
					"isId": false,
					"name": "answer"
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 2
					},
					"relationTableIndex": 9
				},
				{
					"index": 3,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 10
				}
			],
			"tableConfig": {
				"name": "SECURITY_ANSWERS"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "SERVER_TYPE",
					"propertyRefs": [
						{
							"index": 0
						}
					],
					"type": 5
				},
				{
					"index": 1,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "PARAMETER_GROUP",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 5
				},
				{
					"index": 2,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "PARAMETER_NAME",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 5
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "PARAMETER_VALUE",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 5
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				}
			],
			"index": 12,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "TuningParameters",
			"properties": [
				{
					"columnRef": {
						"index": 0
					},
					"index": 0,
					"isId": true,
					"name": "serverType"
				},
				{
					"columnRef": {
						"index": 1
					},
					"index": 1,
					"isId": true,
					"name": "parameterGroup"
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "parameterName"
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 3,
					"isId": false,
					"name": "parameterValue"
				}
			],
			"relations": [],
			"tableConfig": {
				"name": "TUNING_PARAMETERS"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 5,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": true,
					"manyRelationColumnRefs": [],
					"name": "ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "STATE",
					"propertyRefs": [
						{
							"index": 5
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 5,
							"oneColumnIndex": 1
						}
					],
					"name": "DATABASE_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneRelationIndex": 5,
							"oneColumnIndex": 2
						}
					],
					"name": "SYNCED_DATABASE_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				}
			],
			"index": 13,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "DatabaseSyncLog",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "id"
				},
				{
					"index": 3,
					"isId": false,
					"name": "database",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 4,
					"isId": false,
					"name": "syncLogs",
					"relationRef": {
						"index": 3
					}
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 5,
					"isId": false,
					"name": "state"
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 14
				},
				{
					"index": 3,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 0
				}
			],
			"tableConfig": {
				"name": "DATABASE_SYNC_LOG"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 4,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 7
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 4,
							"oneColumnIndex": 1
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						},
						{
							"index": 7
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": true,
					"manyRelationColumnRefs": [],
					"name": "ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "HASH",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 5
				},
				{
					"index": 4,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "LAST_POLL_CONNECTION_DATETIME",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "LAST_SSE_CONNECTION_DATETIME",
					"propertyRefs": [
						{
							"index": 5
						}
					],
					"type": 4
				},
				{
					"index": 6,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "CURRENT_SHARD_ID",
					"propertyRefs": [
						{
							"index": 6
						}
					],
					"type": 4
				},
				{
					"index": 7,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 4,
							"oneColumnIndex": 2
						}
					],
					"name": "USER_ID",
					"propertyRefs": [
						{
							"index": 7
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				}
			],
			"index": 14,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "Database",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "id"
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 3,
					"isId": false,
					"name": "hash"
				},
				{
					"columnRef": {
						"index": 4
					},
					"index": 4,
					"isId": false,
					"name": "lastPollConnectionDatetime"
				},
				{
					"columnRef": {
						"index": 5
					},
					"index": 5,
					"isId": false,
					"name": "lastSseConnectionDatetime"
				},
				{
					"index": 6,
					"isId": false,
					"name": "currentShard",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 7,
					"isId": false,
					"name": "user",
					"relationRef": {
						"index": 3
					}
				},
				{
					"index": 8,
					"isId": false,
					"name": "databaseRepositories",
					"relationRef": {
						"index": 4
					}
				},
				{
					"index": 9,
					"isId": false,
					"name": "databaseSyncLogs",
					"relationRef": {
						"index": 5
					}
				},
				{
					"index": 10,
					"isId": false,
					"name": "verificationStage",
					"relationRef": {
						"index": 6
					}
				},
				{
					"index": 11,
					"isId": false,
					"name": "repositoryVerificationStage",
					"relationRef": {
						"index": 7
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 6
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 3,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 7
					},
					"relationTableIndex": 9
				},
				{
					"index": 4,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 8
					},
					"relationTableIndex": 3
				},
				{
					"index": 5,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 9
					},
					"relationTableIndex": 13
				},
				{
					"index": 6,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 10
					},
					"relationTableIndex": 7
				},
				{
					"index": 7,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 11
					},
					"relationTableIndex": 5
				}
			],
			"tableConfig": {
				"name": "DATABASES"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 5,
							"oneColumnIndex": 0
						},
						{
							"manyRelationIndex": 5,
							"oneSchemaIndex": null,
							"oneTableIndex": 2,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						},
						{
							"index": 4
						},
						{
							"index": 5
						},
						{
							"index": 6
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "ARCHIVING_STATUS",
					"propertyRefs": [
						{
							"index": 7
						}
					],
					"type": 4
				},
				{
					"index": 4,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "ADD_DATETIME",
					"propertyRefs": [
						{
							"index": 9
						}
					],
					"type": 4
				},
				{
					"index": 5,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "IS_REALTIME",
					"propertyRefs": [
						{
							"index": 10
						}
					],
					"type": 1
				},
				{
					"index": 6,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "TRANSACTION_DATA",
					"propertyRefs": [
						{
							"index": 11
						}
					],
					"type": 5
				},
				{
					"index": 7,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneRelationIndex": 4,
							"oneColumnIndex": 0
						}
					],
					"name": "REPOSITORY_CURRENT_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 8,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneRelationIndex": 4,
							"oneColumnIndex": 1
						}
					],
					"name": "REPOSITORY_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 9,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": null,
							"oneTableIndex": 16,
							"oneRelationIndex": 4,
							"oneColumnIndex": 2
						}
					],
					"name": "REPOSITORY_ID",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 4
				},
				{
					"index": 10,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneColumnIndex": 1
						}
					],
					"name": "DATABASE_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 11,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 3,
							"oneSchemaIndex": null,
							"oneTableIndex": 14,
							"oneColumnIndex": 2
						}
					],
					"name": "DATABASE_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				},
				{
					"index": 12,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 5,
							"oneColumnIndex": 1
						}
					],
					"name": "USER_ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 5
						}
					],
					"type": 4
				},
				{
					"index": 13,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 4,
							"oneSchemaIndex": null,
							"oneTableIndex": 9,
							"oneRelationIndex": 5,
							"oneColumnIndex": 2
						}
					],
					"name": "USER_ID",
					"propertyRefs": [
						{
							"index": 5
						}
					],
					"type": 4
				},
				{
					"index": 14,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 5,
							"oneSchemaIndex": null,
							"oneTableIndex": 2,
							"oneColumnIndex": 2
						}
					],
					"name": "ARCHIVING_SERVER_ID",
					"propertyRefs": [
						{
							"index": 6
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				}
			],
			"index": 15,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "SyncRecord",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "id"
				},
				{
					"index": 3,
					"isId": false,
					"name": "repository",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 4,
					"isId": false,
					"name": "database",
					"relationRef": {
						"index": 3
					}
				},
				{
					"index": 5,
					"isId": false,
					"name": "user",
					"relationRef": {
						"index": 4
					}
				},
				{
					"index": 6,
					"isId": false,
					"name": "archivingServer",
					"relationRef": {
						"index": 5
					}
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 7,
					"isId": false,
					"name": "archivingStatus"
				},
				{
					"index": 8,
					"isId": false,
					"name": "syncLogs",
					"relationRef": {
						"index": 6
					}
				},
				{
					"columnRef": {
						"index": 4
					},
					"index": 9,
					"isId": false,
					"name": "addDatetime"
				},
				{
					"columnRef": {
						"index": 5
					},
					"index": 10,
					"isId": false,
					"name": "isRealtime"
				},
				{
					"columnRef": {
						"index": 6
					},
					"index": 11,
					"isId": false,
					"name": "transactionData"
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 3
					},
					"relationTableIndex": 16
				},
				{
					"index": 3,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 14
				},
				{
					"index": 4,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 5
					},
					"relationTableIndex": 9
				},
				{
					"index": 5,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 6
					},
					"relationTableIndex": 2
				},
				{
					"index": 6,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 8
					},
					"relationTableIndex": 0
				}
			],
			"tableConfig": {
				"name": "SYNC_RECORDS"
			}
		},
		{
			"columns": [
				{
					"index": 0,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 0,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "SHARD_ID",
					"propertyRefs": [
						{
							"index": 0
						}
					],
					"type": 4
				},
				{
					"index": 1,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 1,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "ORIGINAL_SHARD_ID",
					"propertyRefs": [
						{
							"index": 1
						}
					],
					"type": 4
				},
				{
					"index": 2,
					"isGenerated": true,
					"manyRelationColumnRefs": [],
					"name": "ID",
					"propertyRefs": [
						{
							"index": 2
						}
					],
					"type": 4
				},
				{
					"index": 3,
					"isGenerated": false,
					"manyRelationColumnRefs": [],
					"name": "LAST_UPDATE_DATETIME",
					"propertyRefs": [
						{
							"index": 3
						}
					],
					"type": 2
				},
				{
					"index": 4,
					"manyRelationColumnRefs": [
						{
							"manyRelationIndex": 2,
							"oneSchemaIndex": 0,
							"oneTableIndex": 0,
							"oneColumnIndex": 0
						}
					],
					"name": "CURRENT_SHARD_ID",
					"propertyRefs": [
						{
							"index": 4
						}
					],
					"type": 4
				}
			],
			"idColumnRefs": [
				{
					"index": 0
				},
				{
					"index": 1
				},
				{
					"index": 2
				}
			],
			"index": 16,
			"isLocal": true,
			"isRepositoryEntity": false,
			"name": "Repository",
			"properties": [
				{
					"index": 0,
					"isId": true,
					"name": "shard",
					"relationRef": {
						"index": 0
					}
				},
				{
					"index": 1,
					"isId": true,
					"name": "originalShard",
					"relationRef": {
						"index": 1
					}
				},
				{
					"columnRef": {
						"index": 2
					},
					"index": 2,
					"isId": true,
					"name": "id"
				},
				{
					"columnRef": {
						"index": 3
					},
					"index": 3,
					"isId": false,
					"name": "lastUpdateTime"
				},
				{
					"index": 4,
					"isId": false,
					"name": "currentShard",
					"relationRef": {
						"index": 2
					}
				},
				{
					"index": 5,
					"isId": false,
					"name": "repositoryDatabases",
					"relationRef": {
						"index": 3
					}
				},
				{
					"index": 6,
					"isId": false,
					"name": "syncRecords",
					"relationRef": {
						"index": 4
					}
				},
				{
					"index": 7,
					"isId": false,
					"name": "databaseVerificationStage",
					"relationRef": {
						"index": 5
					}
				}
			],
			"relations": [
				{
					"index": 0,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 0
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 1,
					"isId": true,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 1
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 2,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 1,
					"propertyRef": {
						"index": 4
					},
					"relationTableIndex": 0,
					"relationTableSchemaIndex": 0
				},
				{
					"index": 3,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 5
					},
					"relationTableIndex": 4
				},
				{
					"index": 4,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 6
					},
					"relationTableIndex": 15
				},
				{
					"index": 5,
					"isId": false,
					"isRepositoryJoin": false,
					"joinFunctionWithOperator": 0,
					"relationType": 0,
					"propertyRef": {
						"index": 7
					},
					"relationTableIndex": 5
				}
			],
			"tableConfig": {
				"name": "REPOSITORIES"
			}
		}
	],
	"index": null,
	"name": "@airport/guideway",
	"referencedSchemas": [],
	"version": "1.0.0"
};