import { MethodDecorator } from '../core/metadata/decorators';

export interface PreparedQueryDecorator {
	(): MethodDecorator;
}