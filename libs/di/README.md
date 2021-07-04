# DI - Direction/Heading Indicator
AIRports own Inversion of Control (IoC) or Dependency Injection (DI) 
implementation.  In AIRport all objects are injected on the stack.

This allows for seamless upgrades/bug fixes which can be done on the fly 
without having to re-start the AIRport application (or parent frame).
This is important because AIRport runs on user devices and does not 
have a defined maintenance schedule, while servicing multiple applications
that may run in background and fail if the local AIRport server is down
(due to upgrades).

Updates are performed whenever the the application sees new version of 
the framework.  TODO: If the users chooses they should be able to run
AIRport in lockdown mode and verify all upgrades manually (though
potentially breaking background applications that may not gracefully
handle an outage of the local AIRport server).
