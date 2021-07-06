import { system }                    from '@airport/di';
import { ISelectorManager }          from './Selector';
import { ISequenceGenerator }        from './SequenceGenerator';
import { IQueryResultsSerializer }   from './serialize/QueryResultsSerializer';

const checkIn = system('airport')
	.lib('check-in');

export const QUERY_RESULTS_SERIALIZER   = checkIn.token<IQueryResultsSerializer>('IQueryResultsSerializer');
export const SELECTOR_MANAGER           = checkIn.token<ISelectorManager>('ISelectorManager');
export const SEQUENCE_GENERATOR         = checkIn.token<ISequenceGenerator>('ISequenceGenerator');
