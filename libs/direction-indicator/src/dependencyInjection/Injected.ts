import { IChildContainer } from './interfaces/IChildContainer';

export interface IInjected {

	__container__?: IChildContainer
	__initialized__?: boolean

}

export interface IInitializable {
	init(): Promise<void>;
}
