import {
	ILibrary,
	Library
} from './Library'

export interface ISystem {

	name: string

	lib(
		libraryName: string
	): ILibrary

	getLib(
		libraryName: string
	): ILibrary

	getLibBySignature(
		signature: string
	): ILibrary

	mapLibraryBySignature(
		libraryName: string,
		signature: string
	): void

}

export class System
	implements ISystem {

	private libraryMap: {
		[libraryName: string]: ILibrary
	} = {}

	private libraryMapBySignature: {
		[librarySignature: string]: ILibrary
	} = {}

	constructor(
		public name: string
	) {
	}

	lib(
		libraryName: string
	): ILibrary {
		if (this.libraryMap[libraryName]) {
			throw new Error(`
			Library already defined.
			System:  ${this.name}
			Library: ${libraryName}
			`)
		}

		const library = new Library(libraryName, this)

		this.libraryMap[libraryName] = library

		return library
	}

	getLib(
		libraryName: string
	): ILibrary {
		return this.libraryMap[libraryName]
	}

	getLibBySignature(
		signature: string
	): ILibrary {
		return this.libraryMapBySignature[signature]
	}

	mapLibraryBySignature(
		libraryName: string,
		signature: string
	): void {
		const library = this.libraryMap[libraryName]
		if (!library) {
			throw new Error(`Could not find library: '${libraryName}', in system: '${this.name}'`)
		}
		if (this.libraryMapBySignature[signature]) {
			throw new Error(`System '${this.name}' already has a library '${libraryName}'
			for signature: ${signature}`)
		}
		this.libraryMapBySignature[signature] = library
	}

}

const SYSTEM_MAP: {
	[systemKey: string]: System
} = {}

export function system(
	systemName: string
): ISystem {
	if (SYSTEM_MAP[systemName]) {
		return SYSTEM_MAP[systemName]
	}

	const system = new System(systemName)

	SYSTEM_MAP[systemName] = system

	return system
}

export const SYSTEM: ISystem = system('airport')