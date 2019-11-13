import {
	ILibrary,
	Library
} from './Library'

export interface ISystem {

	libraryMap: {
		[libraryName: string]: ILibrary
	}
	name: string

	lib(
		libraryName: string
	): ILibrary

}

export class System
	implements ISystem {

	libraryMap: {
		[libraryName: string]: ILibrary
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

}

const SYSTEM_MAP: {
	[systemKey: string]: System
} = {}

export function system(
	systemName
): ISystem {
	if (SYSTEM_MAP[systemName]) {
		return SYSTEM_MAP[systemName]
	}

	const system = new System(systemName)

	SYSTEM_MAP[systemName] = system

	return system
}
