import { IContainer } from './Container';
export interface IInjectable {
    container?: IContainer;
    c: IContainer;
}
export declare class Injectable implements IInjectable {
    readonly c: IContainer;
}
export declare function c(injectable: any): IContainer;
