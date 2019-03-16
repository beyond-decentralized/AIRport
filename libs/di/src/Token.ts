export type Token = number

export interface ITokenSequence {
	n: Token
}

export class TokenSequence {

	counter = 0

	get n() {
		return this.counter++
	}

}

export const TOKE = new TokenSequence()
