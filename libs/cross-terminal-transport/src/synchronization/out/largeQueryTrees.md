NOTE: Building large query trees bloats result sets,
	best approach - custom terminal query engine that
	returns just the needed data

	Reapplying changes coming from remote sync nodes:

	^ at it's basic level, will be done on per row basis
	- better to do the processing ahead of time so, it is possible to
	group updates for many rows into single records:

	this would reduce the number of db calls needed for update statements

	note, some of these records may have had at least some of the values
	updated later or deleted so they may have to be filtered out in the
	update update call:

	before the update the corresponding local actor ids can be looked up
	in a separate call.

	INSERT INTO
	TABLE_A
	VALUES
	(3, 1, 6, 'a', 'b', 12342343444),
	(3, 1, 7, 'c', 'd', 13412341241);

	UPDATE
	TABLE_A
	SET
	col_a = 1,
	col_b = 2
	WHERE
	repository_id = 3
	AND ((
	repository_actor_id = 4
	AND record_id IN (5, 6, 7)
	) OR (
	...
	));

	DELETE FROM
	TABLE_A
	WHERE
	repository_id = 3
	AND ((
	repository_actor_id = 4
	AND record_id IN (5, 6, 7)
	) OR (
	...
	));


	^ order within the transaction matters

	^ order between transactions matters
	we need to always know which change to apply first and which to apply last
	for that we can add the Terminal Info of the terminal where the transaction
	happened.  Changes are always sorted by:
	syncTimestamp,
	saveTimestamp,
	terminalId

	for local changes that haven't been synced "syncRequestTimestamp" can be used
	instead of syncTimestamp


	This means that eventually there may have to be re-ordering of changes and
	resulting data updates once the local changes come back with an actual
	syncTimestamp



	FUTURE:
	Also,

	[]  we don't want to re-apply updates to the same record multiple times
	-  and want to merge those changes into single update statements, where
	appropriate.
