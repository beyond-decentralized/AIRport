export interface ICopyRecordProcessor {

}

export class CopyRecordProcessor
    implements ICopyRecordProcessor {

        /**
         * Copied records must come in in the order they need to be processed, with the
         * most deeply nested (most dependent upon) records being first
         * 
         * Get all copied records in message and make sure no actual repositories are passed in
         * that match the copied records.  If there are repositories being passed in that do
         * match copied records then there is a dependency between the passed in repositories,
         * need to split out the message into multiple batches, with dependencies being
         * processed first.
         * 
         * 1. Return the prossesing batches in order
         * 2. All remaining copy records to be inserted (ahead of time)
         * 
         */
        deduplicate() {

        }

}