/* eslint-disable */
export const SCHEMA = {
	"domain": "air",
	"index": null,
	"name": "@airport/point-of-destination",
	"packageName": "@airport/point-of-destination",
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
							"manyRelationColumnRefs": [],
							"name": "REPOSITORY_DATA",
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
							"index": 1,
							"isGenerated": false,
							"manyRelationColumnRefs": [
								{
									"manyRelationIndex": 1,
									"oneSchemaIndex": 0,
									"oneTableIndex": 9,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								},
								{
									"manyRelationIndex": 0,
									"oneSchemaIndex": 0,
									"oneTableIndex": 10,
									"oneColumnIndex": 2,
									"sinceVersion": 1
								}
							],
							"name": "REPOSITORY_ID",
							"notNull": false,
							"propertyRefs": [
								{
									"index": 1
								},
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
									"manyRelationIndex": 0,
									"oneSchemaIndex": 0,
									"oneTableIndex": 10,
									"oneColumnIndex": 0,
									"sinceVersion": 1
								}
							],
							"name": "DATE_NUMBER",
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
					"index": 0,
					"isLocal": true,
					"isRepositoryEntity": false,
					"name": "DailyArchive",
					"properties": [
						{
							"index": 0,
							"isId": false,
							"name": "repository",
							"relationRef": {
								"index": 1
							},
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": true,
							"name": "dailyArchiveLog",
							"relationRef": {
								"index": 0
							},
							"sinceVersion": 1
						},
						{
							"columnRef": {
								"index": 0
							},
							"index": 2,
							"isId": false,
							"name": "repositoryData",
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
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						},
						{
							"index": 1,
							"isId": false,
							"relationType": 1,
							"propertyRef": {
								"index": 0
							},
							"relationTableIndex": 9,
							"relationTableSchemaIndex": 0,
							"sinceVersion": 1
						}
					],
					"sinceVersion": 1,
					"tableConfig": {
						"name": "DAILY_ARCHIVES",
						"indexes": []
					},
					"operations": {}
				}
			],
			"integerVersion": 1,
			"referencedSchemas": [
				{
					"domain": "air",
					"index": 0,
					"name": "@airport/guideway",
					"packageName": "@airport/guideway",
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