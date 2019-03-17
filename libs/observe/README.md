# observe

A functional alternative to RxJs operators (with some differences 
and geared toward @airport needs).  Provides:

* A more lightweight implementation
* Client code tie-in with the stacktrace
* Shorter stack traces

Note:

* map operator is not needed, just use a callback
* every pipe(...), is equivalent of rxjs pipe(share(), ...)
* if value is undefined observable chains and subscriptions do not trigger

* All Observables are always live, meaing:
1) Observer does not define start
2) Observer does not define complete
3) subscribe method does not take onComplete callback 