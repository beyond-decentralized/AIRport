/**
 * Created by Papa on 4/24/2016.
 */

export enum ArgumentType {
	CONFIG = 'ArgumentType'
}

export class Flags {

	optionsFilePath:string

}

export var ARGUMENT_FLAGS:{[optionFlag:string]:ArgumentType} = {
	'--config': ArgumentType.CONFIG,
	'-c': ArgumentType.CONFIG
}