# Direction/Heading Indicator

"The heading indicator (HI), also known as a directional gyro or direction indicator, is a flight instrument used in an
aircraft to inform the pilot of the aircraft's heading."

AIRports own Inversion of Control (IoC) or Dependency Injection implementation. In AIRport all objects are injected on
the stack.

Allows to keep track of nested transactions and request state.

Also allows for seamless upgrades/bug fixes which can be done on the fly without having to re-start the AIRport
application (or parent frame). This is important because AIRport runs on user devices and does not have a defined
maintenance schedule, while servicing multiple applications that may run in background and fail if the local AIRport
server is down
(due to upgrades).

Additionaly full application replacements might cause cross-application dependency issues. Also state that is stored in
an application would have to be wiped out.

Updates are performed whenever the the application sees new version of the framework. TODO: If the users chooses they
should be able to run AIRport in lockdown mode and verify all upgrades manually (though potentially breaking background
applications that may not gracefully handle an outage of the local AIRport server).
