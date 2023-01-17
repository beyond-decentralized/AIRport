import {
	DbEntity,
	JsonApplicationEntity
} from './Entity';
import { ApplicationReferenceByIndex } from './Property';
import { ApplicationStatus } from './ApplicationStatus';

export type Application_LocalId = number;
export type Application_Name = string; // Just the name of the application, without the Domain Name
export type Application_Signature = string;
export type ApplicationPackage_LocalId = number;
export type Database_Index = number;
export type Domain_LocalId = number;
export type Domain_Name = string;
export type Application_FullName = string; // Domain & Application Names
export type JsonApplication_Name = string;
export type Application_Index = number;
export type Application_GUID = string;
export type Application_Scope = 'private' | 'public' | null | string;
// NOTE: Application_Name contains Domain_Name as a prefix DOMAIN_NAME___APPLICATION_NAME
export type ApplicationReference_Index = number;
export type ApplicationVersion_LocalId = number;
export type ApplicationVersion_IntegerVersion = number;
export type ApplicationVersion_MajorVersion = number;
export type ApplicationVersion_MinorVersion = number;
export type ApplicationVersion_PatchVersion = number;
export type ApplicationVersion_VersionString = string;


export interface DbDomain {

	_localId: Domain_LocalId

	name?: Domain_Name

	applications?: DbApplication[]
}

/**
 * A application.
 */
export interface JsonApplication
	extends ApplicationReferenceByIndex<Application_Index>,
	JsonDatabaseObject {

	/**
	 * Domain of the application ('public' if published).
	 */
	domain: Domain_Name;

	/**
	 * Name of the application
	 */
	name: JsonApplication_Name;

	/**
	 * Versions by integer version
	 */
	versions: JsonApplicationVersion[];

}

/**
 * A application with additional indexes (maps).
 */
export interface DbApplication
	extends DatabaseObject {

	index: Application_Index

	currentVersion?: DbApplicationCurrentVersion[];

	/**
	 * Domain of the application ('public' if published).
	 */
	domain?: DbDomain;

	name?: Application_Name;

	fullName?: Application_FullName

	GUID?: Application_GUID

	scope?: Application_Scope;

	signature?: Application_Signature

	status?: ApplicationStatus | string

	/**
	 * Versions by integer version
	 */
	versions?: DbApplicationVersion[];

}

export interface JsonDatabaseObject {

	deprecatedSinceVersion?: ApplicationVersion_IntegerVersion
	removedInVersion?: ApplicationVersion_IntegerVersion
	sinceVersion: ApplicationVersion_IntegerVersion

}

export interface JsonApplicationVersionReference {

	/**
	 * Integer version of the application
	 */
	integerVersion: ApplicationVersion_IntegerVersion;

}

export interface JsonApplicationVersion
	extends JsonApplicationVersionReference {

	/**
	 * Semantic version of the application.
	 */
	versionString: ApplicationVersion_VersionString;

	/**
	 * Entities by their application table indexes.
	 */
	entities: JsonApplicationEntity[];

	/**
	 * Applications, referenced in this application, by internal index.
	 */
	referencedApplications: JsonApplication[];

}

export interface DatabaseObject {

	deprecatedSinceVersion?: DbApplicationVersion
	removedInVersion?: DbApplicationVersion
	sinceVersion?: DbApplicationVersion

}

export interface DbApplicationVersionReference {

	integerVersion?: ApplicationVersion_IntegerVersion;

}

/**
 * A application with additional indexes (maps).
 */
export interface DbApplicationCurrentVersion {

	application: DbApplication

	applicationVersion: DbApplicationVersion

}

/**
 * A application with additional indexes (maps).
 */
export interface DbApplicationVersion
	extends DbApplicationVersionReference {

	_localId: ApplicationVersion_LocalId;

	/**
	 * Entities by their application table indexes.
	 */
	entities?: DbEntity[];

	/**
	 * Map of all entities by name.
	 */
	entityMapByName?: { [entityName: string]: DbEntity };

	/**
	 * Applications referenced in this application, by terminal index.
	 *
	 */
	references?: DbApplicationReference[];

	/**
	 * Applications referencing in this application, by terminal index.
	 *
	 */
	referencedBy?: DbApplicationReference[];

	/**
	 * Map of all referenced applications, by name.
	 */
	referencesMapByName?: { [applicationName: string]: DbApplicationReference };

	/**
	 * Map of all referencing applications, by name.
	 */
	referencedByMapByName?: { [applicationName: string]: DbApplicationReference };

	integerVersion?: ApplicationVersion_IntegerVersion

	versionString?: ApplicationVersion_VersionString;

	majorVersion?: ApplicationVersion_MajorVersion;

	minorVersion?: ApplicationVersion_MinorVersion;

	patchVersion?: ApplicationVersion_PatchVersion;

	application?: DbApplication;

}

export interface DbApplicationReference
	extends DatabaseObject {

	index?: ApplicationReference_Index;
	ownApplicationVersion: DbApplicationVersion;
	referencedApplicationVersion: DbApplicationVersion;

}

/**
 * A physical terminal on a given device.  A device can
 * have multiple databases.  For example when loading an old repository
 * that went though a number of incompatible application upgrades, that
 * repository will have to be loaded in a different terminal and then
 * upgraded.
 *
 * The default terminal keeps track of all databases on a device.  Each
 * other terminal will have only itself as the entry this this table.
 *
 * Each terminal can have different set of applications.
 *
 * @externs
 */
export interface DbDatabase {
	name: string;
	applications: DbApplication[];
	applicationMapByName: { [name: string]: DbApplication };
	storeType: number;
}
