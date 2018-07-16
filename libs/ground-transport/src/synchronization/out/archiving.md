Sharing and archiving should be kept separate.   Hence AGT can be hosted as
a sharing node only or also as an archiving node.  Archiving probably shouldn't
be done from a TM since a given TM may not have all of the records required to
archive.  Also doing archiving from an AGT ensures that all synced data is archived
and only synced data is archived.

Of course an AGT can be run on any individual TM, which somewhat alleviates need
for a central AGT.

Yet, it is possible to use multiple AGTs to sync the same repository with same
or different sets of TMs.  It is also possible to re-archive the same repository
in multiple places (even multiple places for each user or even actor in a repository).  So,
there shouldn't be a direct dependency between an AGT and archiving.

At the same time, some TMs may need access to archived RepoTransHistories that have aged off
an AGT, so an AGT at least needs read-only access to the archives.  This may lead to a good
compromise, where an AGT can be notified of when a given TM (chosen to archive a given
repository has archived a day's worth of data).  Alternatively, multiple TMs may be actively
archiving a given repository and an AGT just needs to know which TMs are indeed archiving and
then simply pick of of their archives to pull the data from.

This brings up a question - how to determine when to archive the data?  To spread out required
bandwidth a given TM may choose to applyChangesToDb rolling archives of the repositories it has or may
even wish to archive the data as soon as it syncs it.  So it may make sense to setup archiving
servers that are completely independent of AGTs and are responsible only for collecting records
to be archived and archiving them on periodic basis (ex: daily).

Also, archives work best when the data in them is batched.  How to determine the size of the
batch and time boundaries of the batch.  Appending to files appears to only be supported by
Google Drive API and it is unknown if the entire file needs to be first downloaded to the TM
device.  And having per transaction files may be very expensive for an app to read if the could
provider charges/limits the app by read operation.  So batching seems like a good lowest common
denominator practices.

So, how to batch?  Definitely per some period per transaction, since archives must be
accessible by the AGT to sync other TMs with older data (NOTE: you can't require every TM to
have access to every cloud account that archives its repos because the TMs owner may not have
accounts on all of those cloud providers, it's much simpler to require the AGT to access the
could).  Let's consider a scenario, where two AGTs are used to sync the same repository to two
different sets of TMs.  Is that even a possibility?

Also note that performing archiving directly from TMs increases the amount of traffic a TM has
to send and may also increase the amount of storage a TM must keep.  However fundamentally,
every TM that has a copy of a repository reserves the right to archive or not archive that
repository.  On the other hand an AGT is only responsible for syncing repos and would archive
only if a given repo is about to roll off it's cache and no TM has reported archiving the data
already.