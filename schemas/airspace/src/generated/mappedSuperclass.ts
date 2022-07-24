/* eslint-disable */
export const MAPPED_SUPERCLASS = [
	{
		"type": "VersionedApplicationObject",
		"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\VersionedApplicationObject.ts",
		"parentClassName": null,
		"isSuperclass": true,
		"ids": [],
		"docEntry": {
			"decorators": [
				{
					"name": "MappedSuperclass",
					"values": []
				}
			],
			"isGenerated": false,
			"isId": false,
			"isMappedSuperclass": true,
			"isTransient": false,
			"name": "VersionedApplicationObject",
			"optional": false,
			"type": "typeof VersionedApplicationObject",
			"fileImports": {
				"importMapByObjectAsName": {
					"JoinColumn": {
						"fileImports": null,
						"isLocal": false,
						"objectMapByAsName": {
							"JoinColumn": {
								"asName": "JoinColumn",
								"moduleImport": null,
								"sourceName": "JoinColumn"
							},
							"ManyToOne": {
								"asName": "ManyToOne",
								"moduleImport": null,
								"sourceName": "ManyToOne"
							},
							"MappedSuperclass": {
								"asName": "MappedSuperclass",
								"moduleImport": null,
								"sourceName": "MappedSuperclass"
							}
						},
						"path": "@airport/tarmaq-entity"
					},
					"ManyToOne": null,
					"MappedSuperclass": null,
					"ApplicationVersion": {
						"fileImports": null,
						"isLocal": true,
						"objectMapByAsName": {
							"ApplicationVersion": {
								"asName": "ApplicationVersion",
								"moduleImport": null,
								"sourceName": "ApplicationVersion"
							}
						},
						"path": "./ApplicationVersion"
					}
				},
				"importMapByModulePath": {
					"@airport/tarmaq-entity": null,
					"./ApplicationVersion": null
				}
			},
			"properties": [
				{
					"decorators": [
						{
							"name": "ManyToOne",
							"values": []
						},
						{
							"name": "JoinColumn",
							"values": [
								{
									"name": "DEPRECATED_SINCE_APPLICATION_VERSION_LID",
									"referencedColumnName": "APPLICATION_VERSION_LID"
								}
							]
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "deprecatedSinceVersion",
					"optional": true,
					"type": "ApplicationVersion",
					"ownerEntity": null,
					"nonArrayType": "ApplicationVersion",
					"entity": {
						"type": "ApplicationVersion",
						"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationVersion.ts",
						"parentClassName": null,
						"isSuperclass": false,
						"ids": [
							{
								"allocationSize": 100,
								"decorators": [
									{
										"name": "DbNumber",
										"values": []
									},
									{
										"name": "Id",
										"values": []
									},
									{
										"name": "SequenceGenerator",
										"values": [
											{
												"allocationSize": 100
											}
										]
									},
									{
										"name": "Column",
										"values": [
											{
												"name": "APPLICATION_VERSION_LID"
											}
										]
									}
								],
								"isGenerated": false,
								"isId": true,
								"isMappedSuperclass": false,
								"isTransient": false,
								"name": "_localId",
								"optional": false,
								"type": "ApplicationVersion_LocalId",
								"ownerEntity": null,
								"nonArrayType": "ApplicationVersion_LocalId",
								"primitive": "number",
								"index": 0
							}
						],
						"docEntry": {
							"decorators": [
								{
									"name": "Entity",
									"values": []
								},
								{
									"name": "Table",
									"values": [
										{
											"name": "APPLICATION_VERSIONS"
										}
									]
								}
							],
							"isGenerated": false,
							"isId": false,
							"isMappedSuperclass": false,
							"isTransient": false,
							"name": "ApplicationVersion",
							"optional": false,
							"type": "typeof ApplicationVersion",
							"fileImports": {
								"importMapByObjectAsName": {
									"Column": {
										"fileImports": null,
										"isLocal": false,
										"objectMapByAsName": {
											"Column": {
												"asName": "Column",
												"moduleImport": null,
												"sourceName": "Column"
											},
											"DbNumber": {
												"asName": "DbNumber",
												"moduleImport": null,
												"sourceName": "DbNumber"
											},
											"DbString": {
												"asName": "DbString",
												"moduleImport": null,
												"sourceName": "DbString"
											},
											"Entity": {
												"asName": "Entity",
												"moduleImport": null,
												"sourceName": "Entity"
											},
											"Id": {
												"asName": "Id",
												"moduleImport": null,
												"sourceName": "Id"
											},
											"JoinColumn": {
												"asName": "JoinColumn",
												"moduleImport": null,
												"sourceName": "JoinColumn"
											},
											"Json": {
												"asName": "Json",
												"moduleImport": null,
												"sourceName": "Json"
											},
											"ManyToOne": {
												"asName": "ManyToOne",
												"moduleImport": null,
												"sourceName": "ManyToOne"
											},
											"OneToMany": {
												"asName": "OneToMany",
												"moduleImport": null,
												"sourceName": "OneToMany"
											},
											"SequenceGenerator": {
												"asName": "SequenceGenerator",
												"moduleImport": null,
												"sourceName": "SequenceGenerator"
											},
											"Table": {
												"asName": "Table",
												"moduleImport": null,
												"sourceName": "Table"
											},
											"Transient": {
												"asName": "Transient",
												"moduleImport": null,
												"sourceName": "Transient"
											}
										},
										"path": "@airport/tarmaq-entity"
									},
									"DbNumber": null,
									"DbString": null,
									"Entity": null,
									"Id": null,
									"JoinColumn": null,
									"Json": null,
									"ManyToOne": null,
									"OneToMany": null,
									"SequenceGenerator": null,
									"Table": null,
									"Transient": null,
									"ApplicationVersion_LocalId": {
										"fileImports": null,
										"isLocal": false,
										"objectMapByAsName": {
											"ApplicationVersion_LocalId": {
												"asName": "ApplicationVersion_LocalId",
												"moduleImport": null,
												"sourceName": "ApplicationVersion_LocalId"
											},
											"ApplicationVersion_IntegerVersion": {
												"asName": "ApplicationVersion_IntegerVersion",
												"moduleImport": null,
												"sourceName": "ApplicationVersion_IntegerVersion"
											},
											"ApplicationVersion_MajorVersion": {
												"asName": "ApplicationVersion_MajorVersion",
												"moduleImport": null,
												"sourceName": "ApplicationVersion_MajorVersion"
											},
											"ApplicationVersion_MinorVersion": {
												"asName": "ApplicationVersion_MinorVersion",
												"moduleImport": null,
												"sourceName": "ApplicationVersion_MinorVersion"
											},
											"ApplicationVersion_PatchVersion": {
												"asName": "ApplicationVersion_PatchVersion",
												"moduleImport": null,
												"sourceName": "ApplicationVersion_PatchVersion"
											},
											"ApplicationVersion_VersionString": {
												"asName": "ApplicationVersion_VersionString",
												"moduleImport": null,
												"sourceName": "ApplicationVersion_VersionString"
											}
										},
										"path": "@airport/ground-control"
									},
									"ApplicationVersion_IntegerVersion": null,
									"ApplicationVersion_MajorVersion": null,
									"ApplicationVersion_MinorVersion": null,
									"ApplicationVersion_PatchVersion": null,
									"ApplicationVersion_VersionString": null,
									"Application": {
										"fileImports": null,
										"isLocal": true,
										"objectMapByAsName": {
											"Application": {
												"asName": "Application",
												"moduleImport": null,
												"sourceName": "Application"
											}
										},
										"path": "./Application"
									},
									"ApplicationEntity": {
										"fileImports": null,
										"isLocal": true,
										"objectMapByAsName": {
											"ApplicationEntity": {
												"asName": "ApplicationEntity",
												"moduleImport": null,
												"sourceName": "ApplicationEntity"
											}
										},
										"path": "./ApplicationEntity"
									},
									"ApplicationReference": {
										"fileImports": null,
										"isLocal": true,
										"objectMapByAsName": {
											"ApplicationReference": {
												"asName": "ApplicationReference",
												"moduleImport": null,
												"sourceName": "ApplicationReference"
											}
										},
										"path": "./ApplicationReference"
									},
									"IApplicationEntity": {
										"fileImports": null,
										"isLocal": true,
										"objectMapByAsName": {
											"IApplicationEntity": {
												"asName": "IApplicationEntity",
												"moduleImport": null,
												"sourceName": "IApplicationEntity"
											}
										},
										"path": "../../generated/application/applicationentity"
									},
									"IApplicationReference": {
										"fileImports": null,
										"isLocal": true,
										"objectMapByAsName": {
											"IApplicationReference": {
												"asName": "IApplicationReference",
												"moduleImport": null,
												"sourceName": "IApplicationReference"
											}
										},
										"path": "../../generated/application/applicationreference"
									},
									"JsonApplicationWithLastIds": {
										"fileImports": null,
										"isLocal": false,
										"objectMapByAsName": {
											"JsonApplicationWithLastIds": {
												"asName": "JsonApplicationWithLastIds",
												"moduleImport": null,
												"sourceName": "JsonApplicationWithLastIds"
											}
										},
										"path": "@airport/apron"
									}
								},
								"importMapByModulePath": {
									"@airport/tarmaq-entity": null,
									"@airport/ground-control": null,
									"./Application": null,
									"./ApplicationEntity": null,
									"./ApplicationReference": null,
									"../../generated/application/applicationentity": null,
									"../../generated/application/applicationreference": null,
									"@airport/apron": null
								}
							},
							"properties": [
								{
									"allocationSize": 100,
									"decorators": [
										{
											"name": "DbNumber",
											"values": []
										},
										{
											"name": "Id",
											"values": []
										},
										{
											"name": "SequenceGenerator",
											"values": [
												{
													"allocationSize": 100
												}
											]
										},
										{
											"name": "Column",
											"values": [
												{
													"name": "APPLICATION_VERSION_LID"
												}
											]
										}
									],
									"isGenerated": false,
									"isId": true,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "_localId",
									"optional": false,
									"type": "ApplicationVersion_LocalId",
									"ownerEntity": null,
									"nonArrayType": "ApplicationVersion_LocalId",
									"primitive": "number",
									"index": 0
								},
								{
									"decorators": [
										{
											"name": "Column",
											"values": [
												{
													"name": "INTEGER_VERSION",
													"nullable": false
												}
											]
										},
										{
											"name": "DbNumber",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "integerVersion",
									"optional": false,
									"type": "ApplicationVersion_IntegerVersion",
									"ownerEntity": null,
									"nonArrayType": "ApplicationVersion_IntegerVersion",
									"primitive": "number",
									"index": 1
								},
								{
									"decorators": [
										{
											"name": "Column",
											"values": [
												{
													"name": "VERSION_STRING",
													"nullable": false
												}
											]
										},
										{
											"name": "DbString",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "versionString",
									"optional": false,
									"type": "ApplicationVersion_VersionString",
									"ownerEntity": null,
									"nonArrayType": "ApplicationVersion_VersionString",
									"primitive": "string",
									"index": 2
								},
								{
									"decorators": [
										{
											"name": "Column",
											"values": [
												{
													"name": "MAJOR_VERSION",
													"nullable": false
												}
											]
										},
										{
											"name": "DbNumber",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "majorVersion",
									"optional": false,
									"type": "ApplicationVersion_MajorVersion",
									"ownerEntity": null,
									"nonArrayType": "ApplicationVersion_MajorVersion",
									"primitive": "number",
									"index": 3
								},
								{
									"decorators": [
										{
											"name": "Column",
											"values": [
												{
													"name": "MINOR_VERSION",
													"nullable": false
												}
											]
										},
										{
											"name": "DbNumber",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "minorVersion",
									"optional": false,
									"type": "ApplicationVersion_MinorVersion",
									"ownerEntity": null,
									"nonArrayType": "ApplicationVersion_MinorVersion",
									"primitive": "number",
									"index": 4
								},
								{
									"decorators": [
										{
											"name": "Column",
											"values": [
												{
													"name": "PATCH_VERSION",
													"nullable": false
												}
											]
										},
										{
											"name": "DbNumber",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "patchVersion",
									"optional": false,
									"type": "ApplicationVersion_PatchVersion",
									"ownerEntity": null,
									"nonArrayType": "ApplicationVersion_PatchVersion",
									"primitive": "number",
									"index": 5
								},
								{
									"decorators": [
										{
											"name": "Column",
											"values": [
												{
													"name": "JSON_APPLICATION",
													"nullable": false
												}
											]
										},
										{
											"name": "Json",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "jsonApplication",
									"optional": false,
									"type": "JsonApplicationWithLastIds",
									"ownerEntity": null,
									"nonArrayType": "JsonApplicationWithLastIds",
									"primitive": "Json",
									"index": 6
								},
								{
									"decorators": [
										{
											"name": "ManyToOne",
											"values": []
										},
										{
											"name": "JoinColumn",
											"values": [
												{
													"name": "APPLICATION_INDEX",
													"nullable": false
												}
											]
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "application",
									"optional": false,
									"type": "Application",
									"ownerEntity": null,
									"nonArrayType": "Application",
									"entity": {
										"type": "Application",
										"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\Application.ts",
										"parentClassName": null,
										"isSuperclass": false,
										"ids": [
											{
												"decorators": [
													{
														"name": "Id",
														"values": []
													},
													{
														"name": "DbNumber",
														"values": []
													},
													{
														"name": "Column",
														"values": [
															{
																"name": "APPLICATION_INDEX",
																"nullable": false
															}
														]
													}
												],
												"isGenerated": false,
												"isId": true,
												"isMappedSuperclass": false,
												"isTransient": false,
												"name": "index",
												"optional": false,
												"type": "Application_Index",
												"ownerEntity": null,
												"nonArrayType": "Application_Index",
												"primitive": "number",
												"index": 0
											}
										],
										"docEntry": {
											"decorators": [
												{
													"name": "Entity",
													"values": []
												},
												{
													"name": "Table",
													"values": [
														{
															"name": "APPLICATIONS"
														}
													]
												}
											],
											"isGenerated": false,
											"isId": false,
											"isMappedSuperclass": false,
											"isTransient": false,
											"name": "Application",
											"optional": false,
											"type": "typeof Application",
											"fileImports": {
												"importMapByObjectAsName": {
													"Column": {
														"fileImports": null,
														"isLocal": false,
														"objectMapByAsName": {
															"Column": {
																"asName": "Column",
																"moduleImport": null,
																"sourceName": "Column"
															},
															"DbNumber": {
																"asName": "DbNumber",
																"moduleImport": null,
																"sourceName": "DbNumber"
															},
															"DbString": {
																"asName": "DbString",
																"moduleImport": null,
																"sourceName": "DbString"
															},
															"Entity": {
																"asName": "Entity",
																"moduleImport": null,
																"sourceName": "Entity"
															},
															"Id": {
																"asName": "Id",
																"moduleImport": null,
																"sourceName": "Id"
															},
															"JoinColumn": {
																"asName": "JoinColumn",
																"moduleImport": null,
																"sourceName": "JoinColumn"
															},
															"ManyToOne": {
																"asName": "ManyToOne",
																"moduleImport": null,
																"sourceName": "ManyToOne"
															},
															"OneToMany": {
																"asName": "OneToMany",
																"moduleImport": null,
																"sourceName": "OneToMany"
															},
															"Table": {
																"asName": "Table",
																"moduleImport": null,
																"sourceName": "Table"
															}
														},
														"path": "@airport/tarmaq-entity"
													},
													"DbNumber": null,
													"DbString": null,
													"Entity": null,
													"Id": null,
													"JoinColumn": null,
													"ManyToOne": null,
													"OneToMany": null,
													"Table": null,
													"Application_Index": {
														"fileImports": null,
														"isLocal": false,
														"objectMapByAsName": {
															"Application_Index": {
																"asName": "Application_Index",
																"moduleImport": null,
																"sourceName": "Application_Index"
															},
															"FullApplication_Name": {
																"asName": "FullApplication_Name",
																"moduleImport": null,
																"sourceName": "FullApplication_Name"
															},
															"Application_Scope": {
																"asName": "Application_Scope",
																"moduleImport": null,
																"sourceName": "Application_Scope"
															},
															"ApplicationStatus": {
																"asName": "ApplicationStatus",
																"moduleImport": null,
																"sourceName": "ApplicationStatus"
															},
															"Application_Name": {
																"asName": "Application_Name",
																"moduleImport": null,
																"sourceName": "Application_Name"
															}
														},
														"path": "@airport/ground-control"
													},
													"FullApplication_Name": null,
													"Application_Scope": null,
													"ApplicationStatus": null,
													"Application_Name": null,
													"Domain": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"Domain": {
																"asName": "Domain",
																"moduleImport": null,
																"sourceName": "Domain"
															}
														},
														"path": "./Domain"
													},
													"ApplicationCurrentVersion": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"ApplicationCurrentVersion": {
																"asName": "ApplicationCurrentVersion",
																"moduleImport": null,
																"sourceName": "ApplicationCurrentVersion"
															}
														},
														"path": "./ApplicationCurrentVersion"
													},
													"ApplicationVersion": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"ApplicationVersion": {
																"asName": "ApplicationVersion",
																"moduleImport": null,
																"sourceName": "ApplicationVersion"
															}
														},
														"path": "./ApplicationVersion"
													}
												},
												"importMapByModulePath": {
													"@airport/tarmaq-entity": null,
													"@airport/ground-control": null,
													"./Domain": null,
													"./ApplicationCurrentVersion": null,
													"./ApplicationVersion": null
												}
											},
											"properties": [
												{
													"decorators": [
														{
															"name": "Id",
															"values": []
														},
														{
															"name": "DbNumber",
															"values": []
														},
														{
															"name": "Column",
															"values": [
																{
																	"name": "APPLICATION_INDEX",
																	"nullable": false
																}
															]
														}
													],
													"isGenerated": false,
													"isId": true,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "index",
													"optional": false,
													"type": "Application_Index",
													"ownerEntity": null,
													"nonArrayType": "Application_Index",
													"primitive": "number",
													"index": 0
												},
												{
													"decorators": [],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "GUID",
													"optional": true,
													"type": "string",
													"ownerEntity": null,
													"nonArrayType": "string",
													"primitive": "string",
													"index": 1
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "SCOPE",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbString",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "scope",
													"optional": false,
													"type": "string",
													"ownerEntity": null,
													"nonArrayType": "string",
													"primitive": "string",
													"index": 2
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "APPLICATION_NAME",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbString",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "name",
													"optional": false,
													"type": "Application_Name",
													"ownerEntity": null,
													"nonArrayType": "Application_Name",
													"primitive": "string",
													"index": 3
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "FULL_APPLICATION_NAME",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbString",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "fullName",
													"optional": false,
													"type": "FullApplication_Name",
													"ownerEntity": null,
													"nonArrayType": "FullApplication_Name",
													"primitive": "string",
													"index": 4
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "STATUS",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbString",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "status",
													"optional": false,
													"type": "ApplicationStatus",
													"ownerEntity": null,
													"nonArrayType": "ApplicationStatus",
													"primitive": "string",
													"index": 5
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "SIGNATURE",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbString",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "signature",
													"optional": false,
													"type": "string",
													"ownerEntity": null,
													"nonArrayType": "string",
													"primitive": "string",
													"index": 6
												},
												{
													"decorators": [
														{
															"name": "ManyToOne",
															"values": []
														},
														{
															"name": "JoinColumn",
															"values": [
																{
																	"name": "DOMAIN_LID",
																	"referencedColumnName": "DOMAIN_LID",
																	"nullable": false
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "domain",
													"optional": false,
													"type": "Domain",
													"ownerEntity": null,
													"nonArrayType": "Domain",
													"entity": {
														"type": "Domain",
														"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\Domain.ts",
														"parentClassName": null,
														"isSuperclass": false,
														"ids": [
															{
																"decorators": [
																	{
																		"name": "Id",
																		"values": []
																	},
																	{
																		"name": "DbNumber",
																		"values": []
																	},
																	{
																		"name": "Column",
																		"values": [
																			{
																				"name": "DOMAIN_LID"
																			}
																		]
																	}
																],
																"isGenerated": false,
																"isId": true,
																"isMappedSuperclass": false,
																"isTransient": false,
																"name": "_localId",
																"optional": false,
																"type": "Domain_LocalId",
																"ownerEntity": null,
																"nonArrayType": "Domain_LocalId",
																"primitive": "number",
																"index": 0
															}
														],
														"docEntry": {
															"decorators": [
																{
																	"name": "Entity",
																	"values": []
																},
																{
																	"name": "Table",
																	"values": [
																		{
																			"name": "DOMAINS"
																		}
																	]
																}
															],
															"isGenerated": false,
															"isId": false,
															"isMappedSuperclass": false,
															"isTransient": false,
															"name": "Domain",
															"optional": false,
															"type": "typeof Domain",
															"fileImports": {
																"importMapByObjectAsName": {
																	"Column": {
																		"fileImports": null,
																		"isLocal": false,
																		"objectMapByAsName": {
																			"Column": {
																				"asName": "Column",
																				"moduleImport": null,
																				"sourceName": "Column"
																			},
																			"DbNumber": {
																				"asName": "DbNumber",
																				"moduleImport": null,
																				"sourceName": "DbNumber"
																			},
																			"DbString": {
																				"asName": "DbString",
																				"moduleImport": null,
																				"sourceName": "DbString"
																			},
																			"Entity": {
																				"asName": "Entity",
																				"moduleImport": null,
																				"sourceName": "Entity"
																			},
																			"Id": {
																				"asName": "Id",
																				"moduleImport": null,
																				"sourceName": "Id"
																			},
																			"OneToMany": {
																				"asName": "OneToMany",
																				"moduleImport": null,
																				"sourceName": "OneToMany"
																			},
																			"Table": {
																				"asName": "Table",
																				"moduleImport": null,
																				"sourceName": "Table"
																			}
																		},
																		"path": "@airport/tarmaq-entity"
																	},
																	"DbNumber": null,
																	"DbString": null,
																	"Entity": null,
																	"Id": null,
																	"OneToMany": null,
																	"Table": null,
																	"Domain_LocalId": {
																		"fileImports": null,
																		"isLocal": false,
																		"objectMapByAsName": {
																			"Domain_LocalId": {
																				"asName": "Domain_LocalId",
																				"moduleImport": null,
																				"sourceName": "Domain_LocalId"
																			},
																			"Domain_Name": {
																				"asName": "Domain_Name",
																				"moduleImport": null,
																				"sourceName": "Domain_Name"
																			}
																		},
																		"path": "@airport/ground-control"
																	},
																	"Domain_Name": null,
																	"Application": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"Application": {
																				"asName": "Application",
																				"moduleImport": null,
																				"sourceName": "Application"
																			}
																		},
																		"path": "./Application"
																	}
																},
																"importMapByModulePath": {
																	"@airport/tarmaq-entity": null,
																	"@airport/ground-control": null,
																	"./Application": null
																}
															},
															"properties": [
																{
																	"decorators": [
																		{
																			"name": "Id",
																			"values": []
																		},
																		{
																			"name": "DbNumber",
																			"values": []
																		},
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "DOMAIN_LID"
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": true,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "_localId",
																	"optional": false,
																	"type": "Domain_LocalId",
																	"ownerEntity": null,
																	"nonArrayType": "Domain_LocalId",
																	"primitive": "number",
																	"index": 0
																},
																{
																	"decorators": [
																		{
																			"name": "DbString",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "name",
																	"optional": false,
																	"type": "Domain_Name",
																	"ownerEntity": null,
																	"nonArrayType": "Domain_Name",
																	"primitive": "string",
																	"index": 1
																},
																{
																	"decorators": [
																		{
																			"name": "OneToMany",
																			"values": [
																				{
																					"mappedBy": "domain"
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "applications",
																	"optional": false,
																	"type": "Application[]",
																	"ownerEntity": null,
																	"isArray": true,
																	"nonArrayType": "Application",
																	"entity": null,
																	"index": 2
																}
															],
															"methodSignatures": [],
															"constructors": [
																{
																	"parameters": [],
																	"returnType": "Domain"
																}
															]
														},
														"implementedInterfaceNames": []
													},
													"index": 7
												},
												{
													"decorators": [
														{
															"name": "OneToMany",
															"values": [
																{
																	"mappedBy": "application"
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "versions",
													"optional": false,
													"type": "ApplicationVersion[]",
													"ownerEntity": null,
													"isArray": true,
													"nonArrayType": "ApplicationVersion",
													"entity": null,
													"index": 8
												},
												{
													"decorators": [
														{
															"name": "OneToMany",
															"values": [
																{
																	"mappedBy": "application"
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "currentVersion",
													"optional": false,
													"type": "ApplicationCurrentVersion[]",
													"ownerEntity": null,
													"isArray": true,
													"nonArrayType": "ApplicationCurrentVersion",
													"entity": {
														"type": "ApplicationCurrentVersion",
														"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationCurrentVersion.ts",
														"parentClassName": null,
														"isSuperclass": false,
														"ids": [
															{
																"decorators": [
																	{
																		"name": "Id",
																		"values": []
																	},
																	{
																		"name": "ManyToOne",
																		"values": []
																	},
																	{
																		"name": "JoinColumn",
																		"values": [
																			{
																				"name": "APPLICATION_INDEX",
																				"referencedColumnName": "APPLICATION_INDEX",
																				"nullable": false
																			}
																		]
																	}
																],
																"isGenerated": false,
																"isId": true,
																"isMappedSuperclass": false,
																"isTransient": false,
																"name": "application",
																"optional": false,
																"type": "Application",
																"ownerEntity": null,
																"nonArrayType": "Application",
																"entity": null,
																"index": 0
															},
															{
																"decorators": [
																	{
																		"name": "Id",
																		"values": []
																	},
																	{
																		"name": "ManyToOne",
																		"values": []
																	},
																	{
																		"name": "JoinColumn",
																		"values": [
																			{
																				"name": "APPLICATION_VERSION_LID",
																				"referencedColumnName": "APPLICATION_VERSION_LID",
																				"nullable": false
																			}
																		]
																	}
																],
																"isGenerated": false,
																"isId": true,
																"isMappedSuperclass": false,
																"isTransient": false,
																"name": "applicationVersion",
																"optional": false,
																"type": "ApplicationVersion",
																"ownerEntity": null,
																"nonArrayType": "ApplicationVersion",
																"entity": null,
																"index": 1
															}
														],
														"docEntry": {
															"decorators": [
																{
																	"name": "Entity",
																	"values": []
																},
																{
																	"name": "Table",
																	"values": [
																		{
																			"name": "APPLICATION_CURRENT_VERSIONS"
																		}
																	]
																}
															],
															"isGenerated": false,
															"isId": false,
															"isMappedSuperclass": false,
															"isTransient": false,
															"name": "ApplicationCurrentVersion",
															"optional": false,
															"type": "typeof ApplicationCurrentVersion",
															"fileImports": {
																"importMapByObjectAsName": {
																	"Entity": {
																		"fileImports": null,
																		"isLocal": false,
																		"objectMapByAsName": {
																			"Entity": {
																				"asName": "Entity",
																				"moduleImport": null,
																				"sourceName": "Entity"
																			},
																			"Id": {
																				"asName": "Id",
																				"moduleImport": null,
																				"sourceName": "Id"
																			},
																			"JoinColumn": {
																				"asName": "JoinColumn",
																				"moduleImport": null,
																				"sourceName": "JoinColumn"
																			},
																			"ManyToOne": {
																				"asName": "ManyToOne",
																				"moduleImport": null,
																				"sourceName": "ManyToOne"
																			},
																			"Table": {
																				"asName": "Table",
																				"moduleImport": null,
																				"sourceName": "Table"
																			}
																		},
																		"path": "@airport/tarmaq-entity"
																	},
																	"Id": null,
																	"JoinColumn": null,
																	"ManyToOne": null,
																	"Table": null,
																	"Application": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"Application": {
																				"asName": "Application",
																				"moduleImport": null,
																				"sourceName": "Application"
																			}
																		},
																		"path": "./Application"
																	},
																	"ApplicationVersion": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"ApplicationVersion": {
																				"asName": "ApplicationVersion",
																				"moduleImport": null,
																				"sourceName": "ApplicationVersion"
																			}
																		},
																		"path": "./ApplicationVersion"
																	}
																},
																"importMapByModulePath": {
																	"@airport/tarmaq-entity": null,
																	"./Application": null,
																	"./ApplicationVersion": null
																}
															},
															"properties": [
																{
																	"decorators": [
																		{
																			"name": "Id",
																			"values": []
																		},
																		{
																			"name": "ManyToOne",
																			"values": []
																		},
																		{
																			"name": "JoinColumn",
																			"values": [
																				{
																					"name": "APPLICATION_INDEX",
																					"referencedColumnName": "APPLICATION_INDEX",
																					"nullable": false
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": true,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "application",
																	"optional": false,
																	"type": "Application",
																	"ownerEntity": null,
																	"nonArrayType": "Application",
																	"entity": null,
																	"index": 0
																},
																{
																	"decorators": [
																		{
																			"name": "Id",
																			"values": []
																		},
																		{
																			"name": "ManyToOne",
																			"values": []
																		},
																		{
																			"name": "JoinColumn",
																			"values": [
																				{
																					"name": "APPLICATION_VERSION_LID",
																					"referencedColumnName": "APPLICATION_VERSION_LID",
																					"nullable": false
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": true,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "applicationVersion",
																	"optional": false,
																	"type": "ApplicationVersion",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationVersion",
																	"entity": null,
																	"index": 1
																}
															],
															"methodSignatures": [],
															"constructors": [
																{
																	"parameters": [],
																	"returnType": "ApplicationCurrentVersion"
																}
															]
														},
														"implementedInterfaceNames": []
													},
													"index": 9
												}
											],
											"methodSignatures": [],
											"constructors": [
												{
													"parameters": [],
													"returnType": "Application"
												}
											]
										},
										"implementedInterfaceNames": []
									},
									"index": 7
								},
								{
									"decorators": [
										{
											"name": "OneToMany",
											"values": [
												{
													"mappedBy": "applicationVersion"
												}
											]
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "entities",
									"optional": false,
									"type": "ApplicationEntity[]",
									"ownerEntity": null,
									"isArray": true,
									"nonArrayType": "ApplicationEntity",
									"entity": {
										"type": "ApplicationEntity",
										"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationEntity.ts",
										"parentClassName": "VersionedApplicationObject",
										"location": "./VersionedApplicationObject",
										"isSuperclass": false,
										"ids": [
											{
												"decorators": [
													{
														"name": "DbNumber",
														"values": []
													},
													{
														"name": "Id",
														"values": []
													},
													{
														"name": "Column",
														"values": [
															{
																"name": "APPLICATION_ENTITY_LID"
															}
														]
													}
												],
												"isGenerated": false,
												"isId": true,
												"isMappedSuperclass": false,
												"isTransient": false,
												"name": "_localId",
												"optional": false,
												"type": "ApplicationEntity_LocalId",
												"ownerEntity": null,
												"nonArrayType": "ApplicationEntity_LocalId",
												"primitive": "number",
												"index": 0
											}
										],
										"docEntry": {
											"decorators": [
												{
													"name": "Entity",
													"values": []
												},
												{
													"name": "Table",
													"values": [
														{
															"name": "APPLICATION_ENTITIES"
														}
													]
												}
											],
											"isGenerated": false,
											"isId": false,
											"isMappedSuperclass": false,
											"isTransient": false,
											"name": "ApplicationEntity",
											"optional": false,
											"type": "typeof ApplicationEntity",
											"fileImports": {
												"importMapByObjectAsName": {
													"Column": {
														"fileImports": null,
														"isLocal": false,
														"objectMapByAsName": {
															"Column": {
																"asName": "Column",
																"moduleImport": null,
																"sourceName": "Column"
															},
															"DbBoolean": {
																"asName": "DbBoolean",
																"moduleImport": null,
																"sourceName": "DbBoolean"
															},
															"DbNumber": {
																"asName": "DbNumber",
																"moduleImport": null,
																"sourceName": "DbNumber"
															},
															"DbString": {
																"asName": "DbString",
																"moduleImport": null,
																"sourceName": "DbString"
															},
															"Entity": {
																"asName": "Entity",
																"moduleImport": null,
																"sourceName": "Entity"
															},
															"Id": {
																"asName": "Id",
																"moduleImport": null,
																"sourceName": "Id"
															},
															"JoinColumn": {
																"asName": "JoinColumn",
																"moduleImport": null,
																"sourceName": "JoinColumn"
															},
															"Json": {
																"asName": "Json",
																"moduleImport": null,
																"sourceName": "Json"
															},
															"ManyToOne": {
																"asName": "ManyToOne",
																"moduleImport": null,
																"sourceName": "ManyToOne"
															},
															"OneToMany": {
																"asName": "OneToMany",
																"moduleImport": null,
																"sourceName": "OneToMany"
															},
															"Table": {
																"asName": "Table",
																"moduleImport": null,
																"sourceName": "Table"
															},
															"ApplicationEntity_TableConfiguration": {
																"asName": "ApplicationEntity_TableConfiguration",
																"moduleImport": null,
																"sourceName": "ApplicationEntity_TableConfiguration"
															},
															"Transient": {
																"asName": "Transient",
																"moduleImport": null,
																"sourceName": "Transient"
															}
														},
														"path": "@airport/tarmaq-entity"
													},
													"DbBoolean": null,
													"DbNumber": null,
													"DbString": null,
													"Entity": null,
													"Id": null,
													"JoinColumn": null,
													"Json": null,
													"ManyToOne": null,
													"OneToMany": null,
													"Table": null,
													"ApplicationEntity_TableConfiguration": null,
													"Transient": null,
													"ApplicationEntity_LocalId": {
														"fileImports": null,
														"isLocal": false,
														"objectMapByAsName": {
															"ApplicationEntity_LocalId": {
																"asName": "ApplicationEntity_LocalId",
																"moduleImport": null,
																"sourceName": "ApplicationEntity_LocalId"
															},
															"ApplicationEntity_IsLocal": {
																"asName": "ApplicationEntity_IsLocal",
																"moduleImport": null,
																"sourceName": "ApplicationEntity_IsLocal"
															},
															"ApplicationEntity_IsAirEntity": {
																"asName": "ApplicationEntity_IsAirEntity",
																"moduleImport": null,
																"sourceName": "ApplicationEntity_IsAirEntity"
															},
															"ApplicationEntity_Name": {
																"asName": "ApplicationEntity_Name",
																"moduleImport": null,
																"sourceName": "ApplicationEntity_Name"
															},
															"ApplicationEntity_TableIndex": {
																"asName": "ApplicationEntity_TableIndex",
																"moduleImport": null,
																"sourceName": "ApplicationEntity_TableIndex"
															}
														},
														"path": "@airport/ground-control"
													},
													"ApplicationEntity_IsLocal": null,
													"ApplicationEntity_IsAirEntity": null,
													"ApplicationEntity_Name": null,
													"ApplicationEntity_TableIndex": null,
													"ApplicationColumn": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"ApplicationColumn": {
																"asName": "ApplicationColumn",
																"moduleImport": null,
																"sourceName": "ApplicationColumn"
															}
														},
														"path": "./ApplicationColumn"
													},
													"ApplicationOperation": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"ApplicationOperation": {
																"asName": "ApplicationOperation",
																"moduleImport": null,
																"sourceName": "ApplicationOperation"
															}
														},
														"path": "./ApplicationOperation"
													},
													"ApplicationProperty": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"ApplicationProperty": {
																"asName": "ApplicationProperty",
																"moduleImport": null,
																"sourceName": "ApplicationProperty"
															}
														},
														"path": "./ApplicationProperty"
													},
													"ApplicationRelation": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"ApplicationRelation": {
																"asName": "ApplicationRelation",
																"moduleImport": null,
																"sourceName": "ApplicationRelation"
															}
														},
														"path": "./ApplicationRelation"
													},
													"ApplicationVersion": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"ApplicationVersion": {
																"asName": "ApplicationVersion",
																"moduleImport": null,
																"sourceName": "ApplicationVersion"
															}
														},
														"path": "./ApplicationVersion"
													},
													"VersionedApplicationObject": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"VersionedApplicationObject": {
																"asName": "VersionedApplicationObject",
																"moduleImport": null,
																"sourceName": "VersionedApplicationObject"
															}
														},
														"path": "./VersionedApplicationObject"
													},
													"IApplicationColumn": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"IApplicationColumn": {
																"asName": "IApplicationColumn",
																"moduleImport": null,
																"sourceName": "IApplicationColumn"
															}
														},
														"path": "../../generated/application/applicationcolumn"
													},
													"IApplicationProperty": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"IApplicationProperty": {
																"asName": "IApplicationProperty",
																"moduleImport": null,
																"sourceName": "IApplicationProperty"
															}
														},
														"path": "../../generated/application/applicationproperty"
													}
												},
												"importMapByModulePath": {
													"@airport/tarmaq-entity": null,
													"@airport/ground-control": null,
													"./ApplicationColumn": null,
													"./ApplicationOperation": null,
													"./ApplicationProperty": null,
													"./ApplicationRelation": null,
													"./ApplicationVersion": null,
													"./VersionedApplicationObject": null,
													"../../generated/application/applicationcolumn": null,
													"../../generated/application/applicationproperty": null
												}
											},
											"properties": [
												{
													"decorators": [
														{
															"name": "DbNumber",
															"values": []
														},
														{
															"name": "Id",
															"values": []
														},
														{
															"name": "Column",
															"values": [
																{
																	"name": "APPLICATION_ENTITY_LID"
																}
															]
														}
													],
													"isGenerated": false,
													"isId": true,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "_localId",
													"optional": false,
													"type": "ApplicationEntity_LocalId",
													"ownerEntity": null,
													"nonArrayType": "ApplicationEntity_LocalId",
													"primitive": "number",
													"index": 0
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "TABLE_INDEX",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbNumber",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "index",
													"optional": false,
													"type": "ApplicationEntity_TableIndex",
													"ownerEntity": null,
													"nonArrayType": "ApplicationEntity_TableIndex",
													"primitive": "number",
													"index": 1
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "IS_LOCAL",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbBoolean",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "isLocal",
													"optional": false,
													"type": "ApplicationEntity_IsLocal",
													"ownerEntity": null,
													"nonArrayType": "ApplicationEntity_IsLocal",
													"primitive": "boolean",
													"index": 2
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "IS_AIR_ENTITY",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbBoolean",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "isAirEntity",
													"optional": false,
													"type": "ApplicationEntity_IsAirEntity",
													"ownerEntity": null,
													"nonArrayType": "ApplicationEntity_IsAirEntity",
													"primitive": "boolean",
													"index": 3
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "NAME",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbString",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "name",
													"optional": false,
													"type": "ApplicationEntity_Name",
													"ownerEntity": null,
													"nonArrayType": "ApplicationEntity_Name",
													"primitive": "string",
													"index": 4
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "TABLE_CONFIGURATION",
																	"nullable": false
																}
															]
														},
														{
															"name": "Json",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "tableConfig",
													"optional": false,
													"type": "ApplicationEntity_TableConfiguration",
													"ownerEntity": null,
													"nonArrayType": "ApplicationEntity_TableConfiguration",
													"primitive": "Json",
													"index": 5
												},
												{
													"decorators": [
														{
															"name": "ManyToOne",
															"values": []
														},
														{
															"name": "JoinColumn",
															"values": [
																{
																	"name": "APPLICATION_VERSION_LID",
																	"referencedColumnName": "APPLICATION_VERSION_LID",
																	"nullable": false
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "applicationVersion",
													"optional": false,
													"type": "ApplicationVersion",
													"ownerEntity": null,
													"nonArrayType": "ApplicationVersion",
													"entity": null,
													"index": 6
												},
												{
													"decorators": [
														{
															"name": "OneToMany",
															"values": [
																{
																	"mappedBy": "entity"
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "columns",
													"optional": false,
													"type": "ApplicationColumn[]",
													"ownerEntity": null,
													"isArray": true,
													"nonArrayType": "ApplicationColumn",
													"entity": {
														"type": "ApplicationColumn",
														"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationColumn.ts",
														"parentClassName": "VersionedApplicationObject",
														"location": "./VersionedApplicationObject",
														"isSuperclass": false,
														"ids": [
															{
																"decorators": [
																	{
																		"name": "DbNumber",
																		"values": []
																	},
																	{
																		"name": "Id",
																		"values": []
																	},
																	{
																		"name": "Column",
																		"values": [
																			{
																				"name": "APPLICATION_COLUMN_LID"
																			}
																		]
																	}
																],
																"isGenerated": false,
																"isId": true,
																"isMappedSuperclass": false,
																"isTransient": false,
																"name": "_localId",
																"optional": false,
																"type": "ApplicationColumn_LocalId",
																"ownerEntity": null,
																"nonArrayType": "ApplicationColumn_LocalId",
																"primitive": "number",
																"index": 0
															}
														],
														"docEntry": {
															"decorators": [
																{
																	"name": "Entity",
																	"values": []
																},
																{
																	"name": "Table",
																	"values": [
																		{
																			"name": "APPLICATION_COLUMNS"
																		}
																	]
																}
															],
															"isGenerated": false,
															"isId": false,
															"isMappedSuperclass": false,
															"isTransient": false,
															"name": "ApplicationColumn",
															"optional": false,
															"type": "typeof ApplicationColumn",
															"fileImports": {
																"importMapByObjectAsName": {
																	"Column": {
																		"fileImports": null,
																		"isLocal": false,
																		"objectMapByAsName": {
																			"Column": {
																				"asName": "Column",
																				"moduleImport": null,
																				"sourceName": "Column"
																			},
																			"DbBoolean": {
																				"asName": "DbBoolean",
																				"moduleImport": null,
																				"sourceName": "DbBoolean"
																			},
																			"DbNumber": {
																				"asName": "DbNumber",
																				"moduleImport": null,
																				"sourceName": "DbNumber"
																			},
																			"DbString": {
																				"asName": "DbString",
																				"moduleImport": null,
																				"sourceName": "DbString"
																			},
																			"Entity": {
																				"asName": "Entity",
																				"moduleImport": null,
																				"sourceName": "Entity"
																			},
																			"Id": {
																				"asName": "Id",
																				"moduleImport": null,
																				"sourceName": "Id"
																			},
																			"JoinColumn": {
																				"asName": "JoinColumn",
																				"moduleImport": null,
																				"sourceName": "JoinColumn"
																			},
																			"ManyToOne": {
																				"asName": "ManyToOne",
																				"moduleImport": null,
																				"sourceName": "ManyToOne"
																			},
																			"OneToMany": {
																				"asName": "OneToMany",
																				"moduleImport": null,
																				"sourceName": "OneToMany"
																			},
																			"Table": {
																				"asName": "Table",
																				"moduleImport": null,
																				"sourceName": "Table"
																			}
																		},
																		"path": "@airport/tarmaq-entity"
																	},
																	"DbBoolean": null,
																	"DbNumber": null,
																	"DbString": null,
																	"Entity": null,
																	"Id": null,
																	"JoinColumn": null,
																	"ManyToOne": null,
																	"OneToMany": null,
																	"Table": null,
																	"ApplicationColumn_LocalId": {
																		"fileImports": null,
																		"isLocal": false,
																		"objectMapByAsName": {
																			"ApplicationColumn_LocalId": {
																				"asName": "ApplicationColumn_LocalId",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_LocalId"
																			},
																			"ApplicationColumn_Index": {
																				"asName": "ApplicationColumn_Index",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_Index"
																			},
																			"ApplicationColumn_Name": {
																				"asName": "ApplicationColumn_Name",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_Name"
																			},
																			"ApplicationColumn_NotNull": {
																				"asName": "ApplicationColumn_NotNull",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_NotNull"
																			},
																			"ApplicationColumn_Precision": {
																				"asName": "ApplicationColumn_Precision",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_Precision"
																			},
																			"ApplicationColumn_Scale": {
																				"asName": "ApplicationColumn_Scale",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_Scale"
																			},
																			"ApplicationColumn_IdIndex": {
																				"asName": "ApplicationColumn_IdIndex",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_IdIndex"
																			},
																			"ApplicationColumn_AllocationSize": {
																				"asName": "ApplicationColumn_AllocationSize",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_AllocationSize"
																			},
																			"ApplicationColumn_IsGenerated": {
																				"asName": "ApplicationColumn_IsGenerated",
																				"moduleImport": null,
																				"sourceName": "ApplicationColumn_IsGenerated"
																			},
																			"SQLDataType": {
																				"asName": "SQLDataType",
																				"moduleImport": null,
																				"sourceName": "SQLDataType"
																			}
																		},
																		"path": "@airport/ground-control"
																	},
																	"ApplicationColumn_Index": null,
																	"ApplicationColumn_Name": null,
																	"ApplicationColumn_NotNull": null,
																	"ApplicationColumn_Precision": null,
																	"ApplicationColumn_Scale": null,
																	"ApplicationColumn_IdIndex": null,
																	"ApplicationColumn_AllocationSize": null,
																	"ApplicationColumn_IsGenerated": null,
																	"SQLDataType": null,
																	"ApplicationEntity": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"ApplicationEntity": {
																				"asName": "ApplicationEntity",
																				"moduleImport": null,
																				"sourceName": "ApplicationEntity"
																			}
																		},
																		"path": "./ApplicationEntity"
																	},
																	"ApplicationPropertyColumn": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"ApplicationPropertyColumn": {
																				"asName": "ApplicationPropertyColumn",
																				"moduleImport": null,
																				"sourceName": "ApplicationPropertyColumn"
																			}
																		},
																		"path": "./ApplicationPropertyColumn"
																	},
																	"ApplicationRelationColumn": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"ApplicationRelationColumn": {
																				"asName": "ApplicationRelationColumn",
																				"moduleImport": null,
																				"sourceName": "ApplicationRelationColumn"
																			}
																		},
																		"path": "./ApplicationRelationColumn"
																	},
																	"VersionedApplicationObject": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"VersionedApplicationObject": {
																				"asName": "VersionedApplicationObject",
																				"moduleImport": null,
																				"sourceName": "VersionedApplicationObject"
																			}
																		},
																		"path": "./VersionedApplicationObject"
																	}
																},
																"importMapByModulePath": {
																	"@airport/tarmaq-entity": null,
																	"@airport/ground-control": null,
																	"./ApplicationEntity": null,
																	"./ApplicationPropertyColumn": null,
																	"./ApplicationRelationColumn": null,
																	"./VersionedApplicationObject": null
																}
															},
															"properties": [
																{
																	"decorators": [
																		{
																			"name": "DbNumber",
																			"values": []
																		},
																		{
																			"name": "Id",
																			"values": []
																		},
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "APPLICATION_COLUMN_LID"
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": true,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "_localId",
																	"optional": false,
																	"type": "ApplicationColumn_LocalId",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_LocalId",
																	"primitive": "number",
																	"index": 0
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "COLUMN_INDEX",
																					"nullable": false
																				}
																			]
																		},
																		{
																			"name": "DbNumber",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "index",
																	"optional": false,
																	"type": "ApplicationColumn_Index",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_Index",
																	"primitive": "number",
																	"index": 1
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "ID_INDEX"
																				}
																			]
																		},
																		{
																			"name": "DbNumber",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "idIndex",
																	"optional": true,
																	"type": "ApplicationColumn_IdIndex",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_IdIndex",
																	"primitive": "number",
																	"index": 2
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "IS_GENERATED",
																					"nullable": false
																				}
																			]
																		},
																		{
																			"name": "DbBoolean",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "isGenerated",
																	"optional": false,
																	"type": "ApplicationColumn_IsGenerated",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_IsGenerated",
																	"primitive": "boolean",
																	"index": 3
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "ALLOCATION_SIZE"
																				}
																			]
																		},
																		{
																			"name": "DbNumber",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "allocationSize",
																	"optional": true,
																	"type": "ApplicationColumn_AllocationSize",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_AllocationSize",
																	"primitive": "number",
																	"index": 4
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "NAME",
																					"nullable": false
																				}
																			]
																		},
																		{
																			"name": "DbString",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "name",
																	"optional": false,
																	"type": "ApplicationColumn_Name",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_Name",
																	"primitive": "string",
																	"index": 5
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "NOT_NULL",
																					"nullable": false
																				}
																			]
																		},
																		{
																			"name": "DbBoolean",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "notNull",
																	"optional": false,
																	"type": "ApplicationColumn_NotNull",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_NotNull",
																	"primitive": "boolean",
																	"index": 6
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "PRECISION"
																				}
																			]
																		},
																		{
																			"name": "DbNumber",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "precision",
																	"optional": false,
																	"type": "ApplicationColumn_Precision",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_Precision",
																	"primitive": "number",
																	"index": 7
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "SCALE"
																				}
																			]
																		},
																		{
																			"name": "DbNumber",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "scale",
																	"optional": false,
																	"type": "ApplicationColumn_Scale",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationColumn_Scale",
																	"primitive": "number",
																	"index": 8
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "TYPE",
																					"nullable": false
																				}
																			]
																		},
																		{
																			"name": "DbString",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "type",
																	"optional": false,
																	"type": "SQLDataType",
																	"ownerEntity": null,
																	"nonArrayType": "SQLDataType",
																	"primitive": "string",
																	"index": 9
																},
																{
																	"decorators": [
																		{
																			"name": "ManyToOne",
																			"values": []
																		},
																		{
																			"name": "JoinColumn",
																			"values": [
																				{
																					"name": "APPLICATION_ENTITY_LID",
																					"referencedColumnName": "APPLICATION_ENTITY_LID",
																					"nullable": false
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "entity",
																	"optional": false,
																	"type": "ApplicationEntity",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationEntity",
																	"entity": null,
																	"index": 10
																},
																{
																	"decorators": [
																		{
																			"name": "OneToMany",
																			"values": [
																				{
																					"mappedBy": "column"
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "propertyColumns",
																	"optional": false,
																	"type": "ApplicationPropertyColumn[]",
																	"ownerEntity": null,
																	"isArray": true,
																	"nonArrayType": "ApplicationPropertyColumn",
																	"entity": {
																		"type": "ApplicationPropertyColumn",
																		"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationPropertyColumn.ts",
																		"parentClassName": "VersionedApplicationObject",
																		"location": "./VersionedApplicationObject",
																		"isSuperclass": false,
																		"ids": [
																			{
																				"decorators": [
																					{
																						"name": "Id",
																						"values": []
																					},
																					{
																						"name": "ManyToOne",
																						"values": []
																					},
																					{
																						"name": "JoinColumn",
																						"values": [
																							{
																								"name": "APPLICATION_COLUMN_LID",
																								"referencedColumnName": "APPLICATION_COLUMN_LID",
																								"nullable": false
																							}
																						]
																					}
																				],
																				"isGenerated": false,
																				"isId": true,
																				"isMappedSuperclass": false,
																				"isTransient": false,
																				"name": "column",
																				"optional": false,
																				"type": "ApplicationColumn",
																				"ownerEntity": null,
																				"nonArrayType": "ApplicationColumn",
																				"entity": null,
																				"index": 0
																			},
																			{
																				"decorators": [
																					{
																						"name": "Id",
																						"values": []
																					},
																					{
																						"name": "ManyToOne",
																						"values": []
																					},
																					{
																						"name": "JoinColumn",
																						"values": [
																							{
																								"name": "APPLICATION_PROPERTY_LID",
																								"referencedColumnName": "APPLICATION_PROPERTY_LID",
																								"nullable": false
																							}
																						]
																					}
																				],
																				"isGenerated": false,
																				"isId": true,
																				"isMappedSuperclass": false,
																				"isTransient": false,
																				"name": "property",
																				"optional": false,
																				"type": "ApplicationProperty",
																				"ownerEntity": null,
																				"nonArrayType": "ApplicationProperty",
																				"entity": null,
																				"index": 1
																			}
																		],
																		"docEntry": {
																			"decorators": [
																				{
																					"name": "Entity",
																					"values": []
																				},
																				{
																					"name": "Table",
																					"values": [
																						{
																							"name": "APPLICATION_PROPERTY_COLUMNS"
																						}
																					]
																				}
																			],
																			"isGenerated": false,
																			"isId": false,
																			"isMappedSuperclass": false,
																			"isTransient": false,
																			"name": "ApplicationPropertyColumn",
																			"optional": false,
																			"type": "typeof ApplicationPropertyColumn",
																			"fileImports": {
																				"importMapByObjectAsName": {
																					"Entity": {
																						"fileImports": null,
																						"isLocal": false,
																						"objectMapByAsName": {
																							"Entity": {
																								"asName": "Entity",
																								"moduleImport": null,
																								"sourceName": "Entity"
																							},
																							"Id": {
																								"asName": "Id",
																								"moduleImport": null,
																								"sourceName": "Id"
																							},
																							"JoinColumn": {
																								"asName": "JoinColumn",
																								"moduleImport": null,
																								"sourceName": "JoinColumn"
																							},
																							"ManyToOne": {
																								"asName": "ManyToOne",
																								"moduleImport": null,
																								"sourceName": "ManyToOne"
																							},
																							"Table": {
																								"asName": "Table",
																								"moduleImport": null,
																								"sourceName": "Table"
																							}
																						},
																						"path": "@airport/tarmaq-entity"
																					},
																					"Id": null,
																					"JoinColumn": null,
																					"ManyToOne": null,
																					"Table": null,
																					"ApplicationColumn": {
																						"fileImports": null,
																						"isLocal": true,
																						"objectMapByAsName": {
																							"ApplicationColumn": {
																								"asName": "ApplicationColumn",
																								"moduleImport": null,
																								"sourceName": "ApplicationColumn"
																							}
																						},
																						"path": "./ApplicationColumn"
																					},
																					"ApplicationProperty": {
																						"fileImports": null,
																						"isLocal": true,
																						"objectMapByAsName": {
																							"ApplicationProperty": {
																								"asName": "ApplicationProperty",
																								"moduleImport": null,
																								"sourceName": "ApplicationProperty"
																							}
																						},
																						"path": "./ApplicationProperty"
																					},
																					"VersionedApplicationObject": {
																						"fileImports": null,
																						"isLocal": true,
																						"objectMapByAsName": {
																							"VersionedApplicationObject": {
																								"asName": "VersionedApplicationObject",
																								"moduleImport": null,
																								"sourceName": "VersionedApplicationObject"
																							}
																						},
																						"path": "./VersionedApplicationObject"
																					}
																				},
																				"importMapByModulePath": {
																					"@airport/tarmaq-entity": null,
																					"./ApplicationColumn": null,
																					"./ApplicationProperty": null,
																					"./VersionedApplicationObject": null
																				}
																			},
																			"properties": [
																				{
																					"decorators": [
																						{
																							"name": "Id",
																							"values": []
																						},
																						{
																							"name": "ManyToOne",
																							"values": []
																						},
																						{
																							"name": "JoinColumn",
																							"values": [
																								{
																									"name": "APPLICATION_COLUMN_LID",
																									"referencedColumnName": "APPLICATION_COLUMN_LID",
																									"nullable": false
																								}
																							]
																						}
																					],
																					"isGenerated": false,
																					"isId": true,
																					"isMappedSuperclass": false,
																					"isTransient": false,
																					"name": "column",
																					"optional": false,
																					"type": "ApplicationColumn",
																					"ownerEntity": null,
																					"nonArrayType": "ApplicationColumn",
																					"entity": null,
																					"index": 0
																				},
																				{
																					"decorators": [
																						{
																							"name": "Id",
																							"values": []
																						},
																						{
																							"name": "ManyToOne",
																							"values": []
																						},
																						{
																							"name": "JoinColumn",
																							"values": [
																								{
																									"name": "APPLICATION_PROPERTY_LID",
																									"referencedColumnName": "APPLICATION_PROPERTY_LID",
																									"nullable": false
																								}
																							]
																						}
																					],
																					"isGenerated": false,
																					"isId": true,
																					"isMappedSuperclass": false,
																					"isTransient": false,
																					"name": "property",
																					"optional": false,
																					"type": "ApplicationProperty",
																					"ownerEntity": null,
																					"nonArrayType": "ApplicationProperty",
																					"entity": null,
																					"index": 1
																				}
																			],
																			"methodSignatures": [],
																			"constructors": [
																				{
																					"parameters": [],
																					"returnType": "ApplicationPropertyColumn"
																				}
																			]
																		},
																		"implementedInterfaceNames": [],
																		"parentEntity": null
																	},
																	"index": 11
																},
																{
																	"decorators": [
																		{
																			"name": "OneToMany",
																			"values": [
																				{
																					"mappedBy": "manyColumn"
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "manyRelationColumns",
																	"optional": false,
																	"type": "ApplicationRelationColumn[]",
																	"ownerEntity": null,
																	"isArray": true,
																	"nonArrayType": "ApplicationRelationColumn",
																	"entity": null,
																	"index": 12
																},
																{
																	"decorators": [
																		{
																			"name": "OneToMany",
																			"values": [
																				{
																					"mappedBy": "oneColumn"
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "oneRelationColumns",
																	"optional": false,
																	"type": "ApplicationRelationColumn[]",
																	"ownerEntity": null,
																	"isArray": true,
																	"nonArrayType": "ApplicationRelationColumn",
																	"entity": null,
																	"index": 13
																}
															],
															"methodSignatures": [],
															"constructors": [
																{
																	"parameters": [],
																	"returnType": "ApplicationColumn"
																}
															]
														},
														"implementedInterfaceNames": [],
														"parentEntity": null
													},
													"index": 7
												},
												{
													"decorators": [
														{
															"name": "OneToMany",
															"values": [
																{
																	"mappedBy": "entity"
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "operations",
													"optional": true,
													"type": "ApplicationOperation[]",
													"ownerEntity": null,
													"isArray": true,
													"nonArrayType": "ApplicationOperation",
													"entity": {
														"type": "ApplicationOperation",
														"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationOperation.ts",
														"parentClassName": "VersionedApplicationObject",
														"location": "./VersionedApplicationObject",
														"isSuperclass": false,
														"ids": [
															{
																"decorators": [
																	{
																		"name": "Id",
																		"values": []
																	},
																	{
																		"name": "GeneratedValue",
																		"values": []
																	},
																	{
																		"name": "DbNumber",
																		"values": []
																	},
																	{
																		"name": "Column",
																		"values": [
																			{
																				"name": "APPLICATION_OPERATION_LID"
																			}
																		]
																	}
																],
																"isGenerated": true,
																"isId": true,
																"isMappedSuperclass": false,
																"isTransient": false,
																"name": "_localId",
																"optional": false,
																"type": "Operation_LocalId",
																"ownerEntity": null,
																"nonArrayType": "Operation_LocalId",
																"primitive": "number",
																"index": 0
															}
														],
														"docEntry": {
															"decorators": [
																{
																	"name": "Entity",
																	"values": []
																},
																{
																	"name": "Table",
																	"values": [
																		{
																			"name": "APPLICATION_OPERATIONS"
																		}
																	]
																}
															],
															"isGenerated": false,
															"isId": false,
															"isMappedSuperclass": false,
															"isTransient": false,
															"name": "ApplicationOperation",
															"optional": false,
															"type": "typeof ApplicationOperation",
															"fileImports": {
																"importMapByObjectAsName": {
																	"Column": {
																		"fileImports": null,
																		"isLocal": false,
																		"objectMapByAsName": {
																			"Column": {
																				"asName": "Column",
																				"moduleImport": null,
																				"sourceName": "Column"
																			},
																			"DbNumber": {
																				"asName": "DbNumber",
																				"moduleImport": null,
																				"sourceName": "DbNumber"
																			},
																			"DbString": {
																				"asName": "DbString",
																				"moduleImport": null,
																				"sourceName": "DbString"
																			},
																			"Entity": {
																				"asName": "Entity",
																				"moduleImport": null,
																				"sourceName": "Entity"
																			},
																			"GeneratedValue": {
																				"asName": "GeneratedValue",
																				"moduleImport": null,
																				"sourceName": "GeneratedValue"
																			},
																			"Id": {
																				"asName": "Id",
																				"moduleImport": null,
																				"sourceName": "Id"
																			},
																			"JoinColumn": {
																				"asName": "JoinColumn",
																				"moduleImport": null,
																				"sourceName": "JoinColumn"
																			},
																			"Json": {
																				"asName": "Json",
																				"moduleImport": null,
																				"sourceName": "Json"
																			},
																			"ManyToOne": {
																				"asName": "ManyToOne",
																				"moduleImport": null,
																				"sourceName": "ManyToOne"
																			},
																			"Table": {
																				"asName": "Table",
																				"moduleImport": null,
																				"sourceName": "Table"
																			}
																		},
																		"path": "@airport/tarmaq-entity"
																	},
																	"DbNumber": null,
																	"DbString": null,
																	"Entity": null,
																	"GeneratedValue": null,
																	"Id": null,
																	"JoinColumn": null,
																	"Json": null,
																	"ManyToOne": null,
																	"Table": null,
																	"Operation_LocalId": {
																		"fileImports": null,
																		"isLocal": false,
																		"objectMapByAsName": {
																			"Operation_LocalId": {
																				"asName": "Operation_LocalId",
																				"moduleImport": null,
																				"sourceName": "Operation_LocalId"
																			},
																			"Operation_Name": {
																				"asName": "Operation_Name",
																				"moduleImport": null,
																				"sourceName": "Operation_Name"
																			},
																			"Operation_Rule": {
																				"asName": "Operation_Rule",
																				"moduleImport": null,
																				"sourceName": "Operation_Rule"
																			},
																			"Operation_Type": {
																				"asName": "Operation_Type",
																				"moduleImport": null,
																				"sourceName": "Operation_Type"
																			}
																		},
																		"path": "@airport/ground-control"
																	},
																	"Operation_Name": null,
																	"Operation_Rule": null,
																	"Operation_Type": null,
																	"ApplicationEntity": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"ApplicationEntity": {
																				"asName": "ApplicationEntity",
																				"moduleImport": null,
																				"sourceName": "ApplicationEntity"
																			}
																		},
																		"path": "./ApplicationEntity"
																	},
																	"VersionedApplicationObject": {
																		"fileImports": null,
																		"isLocal": true,
																		"objectMapByAsName": {
																			"VersionedApplicationObject": {
																				"asName": "VersionedApplicationObject",
																				"moduleImport": null,
																				"sourceName": "VersionedApplicationObject"
																			}
																		},
																		"path": "./VersionedApplicationObject"
																	}
																},
																"importMapByModulePath": {
																	"@airport/tarmaq-entity": null,
																	"@airport/ground-control": null,
																	"./ApplicationEntity": null,
																	"./VersionedApplicationObject": null
																}
															},
															"properties": [
																{
																	"decorators": [
																		{
																			"name": "Id",
																			"values": []
																		},
																		{
																			"name": "GeneratedValue",
																			"values": []
																		},
																		{
																			"name": "DbNumber",
																			"values": []
																		},
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "APPLICATION_OPERATION_LID"
																				}
																			]
																		}
																	],
																	"isGenerated": true,
																	"isId": true,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "_localId",
																	"optional": false,
																	"type": "Operation_LocalId",
																	"ownerEntity": null,
																	"nonArrayType": "Operation_LocalId",
																	"primitive": "number",
																	"index": 0
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "TYPE",
																					"nullable": false
																				}
																			]
																		},
																		{
																			"name": "DbNumber",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "type",
																	"optional": false,
																	"type": "Operation_Type",
																	"ownerEntity": null,
																	"nonArrayType": "Operation_Type",
																	"primitive": "number",
																	"index": 1
																},
																{
																	"decorators": [
																		{
																			"name": "ManyToOne",
																			"values": []
																		},
																		{
																			"name": "JoinColumn",
																			"values": [
																				{
																					"name": "APPLICATION_ENTITY_LID",
																					"referencedColumnName": "APPLICATION_ENTITY_LID",
																					"nullable": false
																				}
																			]
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "entity",
																	"optional": false,
																	"type": "ApplicationEntity",
																	"ownerEntity": null,
																	"nonArrayType": "ApplicationEntity",
																	"entity": null,
																	"index": 2
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "NAME",
																					"nullable": false
																				}
																			]
																		},
																		{
																			"name": "DbString",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "name",
																	"optional": false,
																	"type": "Operation_Name",
																	"ownerEntity": null,
																	"nonArrayType": "Operation_Name",
																	"primitive": "string",
																	"index": 3
																},
																{
																	"decorators": [
																		{
																			"name": "Column",
																			"values": [
																				{
																					"name": "RULE",
																					"nullable": false
																				}
																			]
																		},
																		{
																			"name": "Json",
																			"values": []
																		}
																	],
																	"isGenerated": false,
																	"isId": false,
																	"isMappedSuperclass": false,
																	"isTransient": false,
																	"name": "rule",
																	"optional": false,
																	"type": "Operation_Rule",
																	"ownerEntity": null,
																	"nonArrayType": "Operation_Rule",
																	"primitive": "Json",
																	"index": 4
																}
															],
															"methodSignatures": [],
															"constructors": [
																{
																	"parameters": [],
																	"returnType": "ApplicationOperation"
																}
															]
														},
														"implementedInterfaceNames": [],
														"parentEntity": null
													},
													"index": 8
												},
												{
													"decorators": [
														{
															"name": "OneToMany",
															"values": [
																{
																	"mappedBy": "entity"
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "properties",
													"optional": false,
													"type": "ApplicationProperty[]",
													"ownerEntity": null,
													"isArray": true,
													"nonArrayType": "ApplicationProperty",
													"entity": null,
													"index": 9
												},
												{
													"decorators": [
														{
															"name": "OneToMany",
															"values": [
																{
																	"mappedBy": "entity"
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "relations",
													"optional": false,
													"type": "ApplicationRelation[]",
													"ownerEntity": null,
													"isArray": true,
													"nonArrayType": "ApplicationRelation",
													"entity": null,
													"index": 10
												},
												{
													"decorators": [
														{
															"name": "OneToMany",
															"values": [
																{
																	"mappedBy": "relationEntity"
																}
															]
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "relationReferences",
													"optional": false,
													"type": "ApplicationRelation[]",
													"ownerEntity": null,
													"isArray": true,
													"nonArrayType": "ApplicationRelation",
													"entity": null,
													"index": 11
												},
												{
													"decorators": [
														{
															"name": "Transient",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": true,
													"name": "columnMap",
													"optional": true,
													"type": "{ [name: string]: IApplicationColumn; }",
													"ownerEntity": null,
													"nonArrayType": "{ [name: string]: IApplicationColumn; }",
													"primitive": "Json"
												},
												{
													"decorators": [
														{
															"name": "Transient",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": true,
													"name": "idColumns",
													"optional": false,
													"type": "IApplicationColumn[]",
													"ownerEntity": null,
													"isArray": true,
													"nonArrayType": "IApplicationColumn"
												},
												{
													"decorators": [
														{
															"name": "Transient",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": true,
													"name": "idColumnMap",
													"optional": true,
													"type": "{ [name: string]: IApplicationColumn; }",
													"ownerEntity": null,
													"nonArrayType": "{ [name: string]: IApplicationColumn; }",
													"primitive": "Json"
												},
												{
													"decorators": [
														{
															"name": "Transient",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": true,
													"name": "propertyMap",
													"optional": false,
													"type": "{ [name: string]: IApplicationProperty; }",
													"ownerEntity": null,
													"nonArrayType": "{ [name: string]: IApplicationProperty; }",
													"primitive": "Json"
												}
											],
											"methodSignatures": [],
											"constructors": [
												{
													"parameters": [],
													"returnType": "ApplicationEntity"
												}
											]
										},
										"implementedInterfaceNames": [],
										"parentEntity": null
									},
									"index": 8
								},
								{
									"decorators": [
										{
											"name": "OneToMany",
											"values": [
												{
													"mappedBy": "ownApplicationVersion"
												}
											]
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "references",
									"optional": false,
									"type": "ApplicationReference[]",
									"ownerEntity": null,
									"isArray": true,
									"nonArrayType": "ApplicationReference",
									"entity": {
										"type": "ApplicationReference",
										"path": "D:\\code\\BD\\AIRport\\schemas\\airspace\\src\\ddl\\application\\ApplicationReference.ts",
										"parentClassName": "VersionedApplicationObject",
										"location": "./VersionedApplicationObject",
										"isSuperclass": false,
										"ids": [
											{
												"decorators": [
													{
														"name": "Id",
														"values": []
													},
													{
														"name": "ManyToOne",
														"values": []
													},
													{
														"name": "JoinColumn",
														"values": [
															{
																"name": "OWN_APPLICATION_VERSION_LID",
																"referencedColumnName": "APPLICATION_VERSION_LID",
																"nullable": false
															}
														]
													}
												],
												"isGenerated": false,
												"isId": true,
												"isMappedSuperclass": false,
												"isTransient": false,
												"name": "ownApplicationVersion",
												"optional": false,
												"type": "ApplicationVersion",
												"ownerEntity": null,
												"nonArrayType": "ApplicationVersion",
												"entity": null,
												"index": 0
											},
											{
												"decorators": [
													{
														"name": "Id",
														"values": []
													},
													{
														"name": "ManyToOne",
														"values": []
													},
													{
														"name": "JoinColumn",
														"values": [
															{
																"name": "REFERENCED_APPLICATION_VERSION_LID",
																"referencedColumnName": "APPLICATION_VERSION_LID",
																"nullable": false
															}
														]
													}
												],
												"isGenerated": false,
												"isId": true,
												"isMappedSuperclass": false,
												"isTransient": false,
												"name": "referencedApplicationVersion",
												"optional": false,
												"type": "ApplicationVersion",
												"ownerEntity": null,
												"nonArrayType": "ApplicationVersion",
												"entity": null,
												"index": 1
											}
										],
										"docEntry": {
											"decorators": [
												{
													"name": "Entity",
													"values": []
												},
												{
													"name": "Table",
													"values": [
														{
															"name": "APPLICATION_REFERENCES"
														}
													]
												}
											],
											"isGenerated": false,
											"isId": false,
											"isMappedSuperclass": false,
											"isTransient": false,
											"name": "ApplicationReference",
											"optional": false,
											"type": "typeof ApplicationReference",
											"fileImports": {
												"importMapByObjectAsName": {
													"Column": {
														"fileImports": null,
														"isLocal": false,
														"objectMapByAsName": {
															"Column": {
																"asName": "Column",
																"moduleImport": null,
																"sourceName": "Column"
															},
															"DbNumber": {
																"asName": "DbNumber",
																"moduleImport": null,
																"sourceName": "DbNumber"
															},
															"Entity": {
																"asName": "Entity",
																"moduleImport": null,
																"sourceName": "Entity"
															},
															"Id": {
																"asName": "Id",
																"moduleImport": null,
																"sourceName": "Id"
															},
															"JoinColumn": {
																"asName": "JoinColumn",
																"moduleImport": null,
																"sourceName": "JoinColumn"
															},
															"ManyToOne": {
																"asName": "ManyToOne",
																"moduleImport": null,
																"sourceName": "ManyToOne"
															},
															"Table": {
																"asName": "Table",
																"moduleImport": null,
																"sourceName": "Table"
															}
														},
														"path": "@airport/tarmaq-entity"
													},
													"DbNumber": null,
													"Entity": null,
													"Id": null,
													"JoinColumn": null,
													"ManyToOne": null,
													"Table": null,
													"ApplicationReference_Index": {
														"fileImports": null,
														"isLocal": false,
														"objectMapByAsName": {
															"ApplicationReference_Index": {
																"asName": "ApplicationReference_Index",
																"moduleImport": null,
																"sourceName": "ApplicationReference_Index"
															}
														},
														"path": "@airport/ground-control"
													},
													"ApplicationVersion": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"ApplicationVersion": {
																"asName": "ApplicationVersion",
																"moduleImport": null,
																"sourceName": "ApplicationVersion"
															}
														},
														"path": "./ApplicationVersion"
													},
													"VersionedApplicationObject": {
														"fileImports": null,
														"isLocal": true,
														"objectMapByAsName": {
															"VersionedApplicationObject": {
																"asName": "VersionedApplicationObject",
																"moduleImport": null,
																"sourceName": "VersionedApplicationObject"
															}
														},
														"path": "./VersionedApplicationObject"
													}
												},
												"importMapByModulePath": {
													"@airport/tarmaq-entity": null,
													"@airport/ground-control": null,
													"./ApplicationVersion": null,
													"./VersionedApplicationObject": null
												}
											},
											"properties": [
												{
													"decorators": [
														{
															"name": "Id",
															"values": []
														},
														{
															"name": "ManyToOne",
															"values": []
														},
														{
															"name": "JoinColumn",
															"values": [
																{
																	"name": "OWN_APPLICATION_VERSION_LID",
																	"referencedColumnName": "APPLICATION_VERSION_LID",
																	"nullable": false
																}
															]
														}
													],
													"isGenerated": false,
													"isId": true,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "ownApplicationVersion",
													"optional": false,
													"type": "ApplicationVersion",
													"ownerEntity": null,
													"nonArrayType": "ApplicationVersion",
													"entity": null,
													"index": 0
												},
												{
													"decorators": [
														{
															"name": "Id",
															"values": []
														},
														{
															"name": "ManyToOne",
															"values": []
														},
														{
															"name": "JoinColumn",
															"values": [
																{
																	"name": "REFERENCED_APPLICATION_VERSION_LID",
																	"referencedColumnName": "APPLICATION_VERSION_LID",
																	"nullable": false
																}
															]
														}
													],
													"isGenerated": false,
													"isId": true,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "referencedApplicationVersion",
													"optional": false,
													"type": "ApplicationVersion",
													"ownerEntity": null,
													"nonArrayType": "ApplicationVersion",
													"entity": null,
													"index": 1
												},
												{
													"decorators": [
														{
															"name": "Column",
															"values": [
																{
																	"name": "APPLICATION_REFERENCE_INDEX",
																	"nullable": false
																}
															]
														},
														{
															"name": "DbNumber",
															"values": []
														}
													],
													"isGenerated": false,
													"isId": false,
													"isMappedSuperclass": false,
													"isTransient": false,
													"name": "index",
													"optional": false,
													"type": "ApplicationReference_Index",
													"ownerEntity": null,
													"nonArrayType": "ApplicationReference_Index",
													"primitive": "number",
													"index": 2
												}
											],
											"methodSignatures": [],
											"constructors": [
												{
													"parameters": [],
													"returnType": "ApplicationReference"
												}
											]
										},
										"implementedInterfaceNames": [],
										"parentEntity": null
									},
									"index": 9
								},
								{
									"decorators": [
										{
											"name": "OneToMany",
											"values": [
												{
													"mappedBy": "referencedApplicationVersion"
												}
											]
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": false,
									"name": "referencedBy",
									"optional": false,
									"type": "ApplicationReference[]",
									"ownerEntity": null,
									"isArray": true,
									"nonArrayType": "ApplicationReference",
									"entity": null,
									"index": 10
								},
								{
									"decorators": [
										{
											"name": "Transient",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": true,
									"name": "entityMapByName",
									"optional": true,
									"type": "{ [entityName: string]: IApplicationEntity; }",
									"ownerEntity": null,
									"nonArrayType": "{ [entityName: string]: IApplicationEntity; }",
									"primitive": "Json"
								},
								{
									"decorators": [
										{
											"name": "Transient",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": true,
									"name": "referencesMapByName",
									"optional": true,
									"type": "{ [fullApplication_Name: string]: IApplicationReference; }",
									"ownerEntity": null,
									"nonArrayType": "{ [fullApplication_Name: string]: IApplicationReference; }",
									"primitive": "Json"
								},
								{
									"decorators": [
										{
											"name": "Transient",
											"values": []
										}
									],
									"isGenerated": false,
									"isId": false,
									"isMappedSuperclass": false,
									"isTransient": true,
									"name": "referencedByMapByName",
									"optional": true,
									"type": "{ [fullApplication_Name: string]: IApplicationReference; }",
									"ownerEntity": null,
									"nonArrayType": "{ [fullApplication_Name: string]: IApplicationReference; }",
									"primitive": "Json"
								}
							],
							"methodSignatures": [],
							"constructors": [
								{
									"parameters": [],
									"returnType": "ApplicationVersion"
								}
							]
						},
						"implementedInterfaceNames": []
					},
					"index": 0
				},
				{
					"decorators": [
						{
							"name": "ManyToOne",
							"values": []
						},
						{
							"name": "JoinColumn",
							"values": [
								{
									"name": "REMOVED_IN_APPLICATION_VERSION_LID",
									"referencedColumnName": "APPLICATION_VERSION_LID"
								}
							]
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "removedInVersion",
					"optional": true,
					"type": "ApplicationVersion",
					"ownerEntity": null,
					"nonArrayType": "ApplicationVersion",
					"entity": null,
					"index": 1
				},
				{
					"decorators": [
						{
							"name": "ManyToOne",
							"values": []
						},
						{
							"name": "JoinColumn",
							"values": [
								{
									"name": "SINCE_APPLICATION_VERSION_LID",
									"referencedColumnName": "APPLICATION_VERSION_LID",
									"nullable": false
								}
							]
						}
					],
					"isGenerated": false,
					"isId": false,
					"isMappedSuperclass": false,
					"isTransient": false,
					"name": "sinceVersion",
					"optional": true,
					"type": "ApplicationVersion",
					"ownerEntity": null,
					"nonArrayType": "ApplicationVersion",
					"entity": null,
					"index": 2
				}
			],
			"methodSignatures": [],
			"constructors": [
				{
					"parameters": [],
					"returnType": "VersionedApplicationObject"
				}
			]
		},
		"implementedInterfaceNames": [],
		"project": "@airport/airspace"
	}
];