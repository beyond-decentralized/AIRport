import { IChildContainer } from './dependencyInjection/Container';
export interface IInjectable {
    __container__?: IChildContainer;
    __initialized__?: boolean;
}
export interface IInitializable {
    init(): Promise<void>;
}
export declare function container(injectable: any): IChildContainer;
//# sourceMappingURL=Injectable.d.ts.map