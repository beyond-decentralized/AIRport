import {
	DbEntity,
	DbEntity_Name,
	JsonEntity
} from './DbEntity';
import { IApplicationReferenceByIndex } from './DbProperty';
import { ApplicationStatus } from './ApplicationStatus';
import { AppApiClass, AppApiClass_Name } from './AppApi';

export type Application_LocalId = number;
export type Application_Name = string; // Just the name of the application, without the Domain Name
export type Application_PublicSigningKey = string; // Just the name of the application, without the Domain Name
export type Domain_LocalId = number;
export type Domain_Name = string;
export type Application_FullName = string; // Domain & Application Names
export type JsonApplication_Name = string;
export type Application_Index = number;
export type Application_Scope = 'private' | 'public' | null | string;
// NOTE: Application_Name contains Domain_Name as a prefix DOMAIN_NAME___APPLICATION_NAME
export type IApplicationReference_Index = number;
export type ApplicationVersion_LocalId = number;
export type ApplicationVersion_IntegerVersion = number;
export type ApplicationVersion_MajorVersion = number;
export type ApplicationVersion_MinorVersion = number;
export type ApplicationVersion_PatchVersion = number;
export type ApplicationVersion_Signature = string;
export type ApplicationVersion_VersionString = string;

export interface IDomain {

	_localId: Domain_LocalId

	name: Domain_Name

	applications?: IApplication[]
}

/**
 * A application.
 */
export interface JsonApplication
	extends IApplicationReferenceByIndex<Application_Index>,
	JsonObject {

	/**
	 * Domain of the application ('public' if published).
	 */
	domain: Domain_Name;

	/**
	 * Name of the application
	 */
	name: JsonApplication_Name;

	publicSigningKey: Application_PublicSigningKey

	/**
	 * Versions by integer version
	 */
	versions: JsonApplicationVersion[];

}

/**
 * A application with additional indexes (maps).
 */
export interface IApplication {

	index: Application_Index

	currentVersion: IApplicationCurrentVersion[];

	/**
	 * Domain of the application ('public' if published).
	 */
	domain: IDomain;

	name: Application_Name;

	fullName: Application_FullName

	publicSigningKey: Application_PublicSigningKey

	scope: Application_Scope;

	status: ApplicationStatus

	/**
	 * Versions by integer version
	 */
	versions: IApplicationVersion[];

}

export interface JsonObject {

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
	entities: JsonEntity[];

	/**
	 * Applications, referenced in this application, by internal index.
	 */
	referencedApplications: JsonApplication[];

	/**
	 * Cryptographic application signature
	 */
	signature: ApplicationVersion_Signature

}

export interface DbVersionedObject {

	deprecatedSinceVersion?: IApplicationVersion
	removedInVersion?: IApplicationVersion
	sinceVersion: IApplicationVersion

}

export interface IApplicationVersionReference {

	integerVersion?: ApplicationVersion_IntegerVersion;

}

/**
 * A application with additional indexes (maps).
 */
export interface IApplicationCurrentVersion {

	application: IApplication

	applicationVersion: IApplicationVersion

}

/**
 * A application with additional indexes (maps).
 */
export interface IApplicationVersion
	extends IApplicationVersionReference {

	_localId: ApplicationVersion_LocalId;

	/**
	 * API Classes.
	 */
	apiClasses?: AppApiClass[]

	/**
	 * Map of all API Classes by name.
	 */
	apiClassMapByName?: { [apiClassName: AppApiClass_Name]: AppApiClass }

	/**
	 * Entities by their application table indexes.
	 */
	entities?: DbEntity[];

	/**
	 * Map of all entities by name.
	 */
	entityMapByName?: { [entityName: DbEntity_Name]: DbEntity };

	/**
	 * Applications referenced in this application, by terminal index.
	 *
	 */
	references?: IApplicationReference[];

	/**
	 * Applications referencing in this application, by terminal index.
	 *
	 */
	referencedBy?: IApplicationReference[];

	/**
	 * Map of all referenced applications, by name.
	 */
	referencesMapByName?: { [applicationName: Application_FullName]: IApplicationReference };

	/**
	 * Map of all referencing applications, by name.
	 */
	referencedByMapByName?: { [applicationName: Application_FullName]: IApplicationReference };

	jsonApplication: JsonApplication

	integerVersion: ApplicationVersion_IntegerVersion

	versionString: ApplicationVersion_VersionString;

	majorVersion: ApplicationVersion_MajorVersion;

	minorVersion: ApplicationVersion_MinorVersion;

	patchVersion: ApplicationVersion_PatchVersion;

	signature: ApplicationVersion_Signature

	application: IApplication;

}

export interface IApplicationReference
	extends DbVersionedObject {

	index: IApplicationReference_Index;
	ownApplicationVersion: IApplicationVersion;
	referencedApplicationVersion: IApplicationVersion;

}
