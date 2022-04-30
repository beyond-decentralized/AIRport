import { ClassDecorator, PropertyDecorator } from "./decorators";

export interface InjectedDecorator {
    (): ClassDecorator
}

export interface InjectDecorator {
    (): PropertyDecorator
}