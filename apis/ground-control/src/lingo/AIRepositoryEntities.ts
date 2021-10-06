import { DbSchema } from "./schema/Schema";

export interface AIRepository {
    id: number;
    createdAt?: Date;
    uuId?: string;
    name?: string;
    url?: string;
    syncPriority?: string;
    ownerActor?: AIRActor;
    repositoryActors?: AIRepositoryActor[];
}

export interface AIRActor {
	
	// Id Properties
	id: number;

	// Id Relations

	// Non-Id Properties
	uuId?: string;

	// Non-Id Relations
	user?: AIRUser;
	application?: AIRApplication;
	repositoryActors?: AIRepositoryActor[];

	// Transient Properties

	// Public Methods
	
}

export interface AIRUser {
	firstName?: string;
	id: number;	
	lastName?: string;
	middleName?: string;
	phone?: string;
	uniqueId?: string;
}

export interface AIRApplication {
	domain?: AIRDomain;
	id: number;
	name?: string;
	signature?: string;
}

export interface AIRDomain {
	applications?: AIRApplication[];
	id: number;
	name?: string;
	schemas?: DbSchema[];
}

export interface AIRepositoryActor {
	actor?: AIRActor;
	id: number;
	repository: AIRepository;
}
