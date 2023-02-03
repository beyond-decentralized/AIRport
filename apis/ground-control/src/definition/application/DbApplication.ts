import {
	DbEntity,
	JsonEntity
} from './DbEntity';
import { DbApplicationReferenceByIndex } from './DbProperty';
import { ApplicationStatus } from './ApplicationStatus';

export type DbApplication_LocalId = number;
export type DbApplication_Name = string; // Just the name of the application, without the Domain Name
export type DbApplication_PublicSigningKey = string; // Just the name of the application, without the Domain Name
export type DbDomain_LocalId = number;
export type DbDomain_Name = string;
export type DbApplication_FullName = string; // Domain & Application Names
export type JsonApplication_Name = string;
export type DbApplication_Index = number;
export type DbApplication_Scope = 'private' | 'public' | null | string;
// NOTE: DbApplication_Name contains DbDomain_Name as a prefix DOMAIN_NAME___APPLICATION_NAME
export type DbApplicationReference_Index = number;
export type DbApplicationVersion_LocalId = number;
export type DbApplicationVersion_IntegerVersion = number;
export type DbApplicationVersion_MajorVersion = number;
export type DbApplicationVersion_MinorVersion = number;
export type DbApplicationVersion_PatchVersion = number;
export type DbApplicationVersion_Signature = string;
export type DbApplicationVersion_VersionString = string;

export interface DbDomain {

	_localId: DbDomain_LocalId

	name: DbDomain_Name

	applications?: DbApplication[]
}

/**
 * A application.
 */
export interface JsonApplication
	extends DbApplicationReferenceByIndex<DbApplication_Index>,
	JsonObject {

	/**
	 * Domain of the application ('public' if published).
	 */
	domain: DbDomain_Name;

	/**
	 * Name of the application
	 */
	name: JsonApplication_Name;

	publicSigningKey: DbApplication_PublicSigningKey

	/**
	 * Versions by integer version
	 */
	versions: JsonApplicationVersion[];

}

/**
 * A application with additional indexes (maps).
 */
export interface DbApplication {

	index: DbApplication_Index

	currentVersion: DbApplicationCurrentVersion[];

	/**
	 * Domain of the application ('public' if published).
	 */
	domain: DbDomain;

	name: DbApplication_Name;

	fullName: DbApplication_FullName

	publicSigningKey: DbApplication_PublicSigningKey

	scope: DbApplication_Scope;

	status: ApplicationStatus

	/**
	 * Versions by integer version
	 */
	versions: DbApplicationVersion[];

}

export interface JsonObject {

	deprecatedSinceVersion?: DbApplicationVersion_IntegerVersion
	removedInVersion?: DbApplicationVersion_IntegerVersion
	sinceVersion: DbApplicationVersion_IntegerVersion

}

export interface JsonApplicationVersionReference {

	/**
	 * Integer version of the application
	 */
	integerVersion: DbApplicationVersion_IntegerVersion;

}

export interface JsonApplicationVersion
	extends JsonApplicationVersionReference {

	/**
	 * Semantic version of the application.
	 */
	versionString: DbApplicationVersion_VersionString;

	/**
	 * Entities by their application table indexes.
	 */
	entities: JsonEntity[];

	/**
	 * Applications, referenced in this application, by internal index.
	 */
	referencedApplications: JsonApplication[];

	/**
	 * Cryptographic application signature
	 */
	signature: DbApplicationVersion_Signature

}

export interface DbVersionedObject {

	deprecatedSinceVersion?: DbApplicationVersion
	removedInVersion?: DbApplicationVersion
	sinceVersion: DbApplicationVersion

}

export interface DbApplicationVersionReference {

	integerVersion?: DbApplicationVersion_IntegerVersion;

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

	_localId: DbApplicationVersion_LocalId;

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

	jsonApplication: JsonApplication

	integerVersion: DbApplicationVersion_IntegerVersion

	versionString: DbApplicationVersion_VersionString;

	majorVersion: DbApplicationVersion_MajorVersion;

	minorVersion: DbApplicationVersion_MinorVersion;

	patchVersion: DbApplicationVersion_PatchVersion;

	signature: DbApplicationVersion_Signature

	application: DbApplication;

}

export interface DbApplicationReference
	extends DbVersionedObject {

	index: DbApplicationReference_Index;
	ownApplicationVersion: DbApplicationVersion;
	referencedApplicationVersion: DbApplicationVersion;

}
