Feature: Routes



Scenario: Add Routes Map
	Given a route collection
	When call route register
	Then a route is added:
	| name    | url                        |
	| Default | {controller}/{action}/{id} |

