export declare type Token = number;
export interface ITokenSequence {
    n: Token;
}
export declare class TokenSequence {
    counter: number;
    readonly n: number;
}
export declare const TOKE: TokenSequence;
