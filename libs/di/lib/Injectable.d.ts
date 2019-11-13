import { IChildContainer } from './Container';
export interface IInjectable {
    container?: IChildContainer;
}
export declare function container(injectable: any): IChildContainer;
