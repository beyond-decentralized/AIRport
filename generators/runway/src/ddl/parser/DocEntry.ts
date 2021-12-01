import { DbEntity }        from "@airport/ground-control";
import { EntityCandidate } from "./EntityCandidate";
import { FileImports }     from "./FileImports";

/**
 * Created by Papa on 3/28/2016.
 */

export interface Decorator {
	name: string;
	values: any[];
}

export interface DocEntry {
	allocationSize?: number;
	constructors?: DocEntry[];
	fileName?: string;
	decorators?: Decorator[];
	documentation?: string;
	isGenerated?: boolean;
	isId?: boolean;
	isMappedSuperclass?: boolean;
	isTransient?: boolean;
	name?: string;
	parameters?: DocEntry[];
	properties?: PropertyDocEntry[];
	returnType?: string;
	type?: string;
}

export interface ArrowFunctionDecoratorProperty {
	parameters: ArrowFunctionDecoratorPropertyParameter[]
	returnValue: Object | Object[]
}

export interface ArrowFunctionDecoratorPropertyParameter {
	name: string
	type: string
}

export interface EntityReference {
	entity?: EntityCandidate;
	fromProject?: string;
	otherApplicationDbEntity?: DbEntity;
}

export interface PropertyDocEntry extends DocEntry, EntityReference {
	columnDefinition?: string;
	optional?: boolean;
	ownerEntity?: EntityCandidate;
	primitive?: 'any' | 'boolean' | 'Date' | 'number' | 'string' | 'Json';
	// Index of the property as retured by the TypeScript parser
	// (hopefully the top-to-bottom index as specified in the file).
	index?: number;
	isArray?: boolean;
	isMap?: boolean;
	mapKeyName?: string;
	mapKeyType?: string;
	mapValueType?: string;
	mapValueIsPrimitive?: boolean;
	nonArrayType?: string;
	notNull?: string;
}

export interface ClassDocEntry extends DocEntry {
	fileImports?: FileImports;
	methodSignatures?: MethodSignatureDocEntry[];
}

export interface TypeOrParamDocEntry extends PropertyDocEntry {
	arrayDepth?: number;
	genericParams: TypeOrParamDocEntry[];
}

export interface MethodSignatureDocEntry {
	name: string;
	optional?: boolean;
	parameters: TypeOrParamDocEntry[];
	returnType: TypeOrParamDocEntry;
}
