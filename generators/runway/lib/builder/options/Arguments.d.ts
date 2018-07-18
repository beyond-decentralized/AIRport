/**
 * Created by Papa on 4/24/2016.
 */
export declare enum ArgumentType {
    CONFIG = 0
}
export declare class Flags {
    optionsFilePath: string;
}
export declare var ARGUMENT_FLAGS: {
    [optionFlag: string]: ArgumentType;
};
