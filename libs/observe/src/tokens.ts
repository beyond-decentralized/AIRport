import { system } from '@airport/di';
import { IRxJs }  from './RxJs';

const observe = system('airport').lib('observe');

export const RXJS = observe.token<IRxJs>('IRxJs');
