Feature: Runner
	It is a service that is going to load all of modules of actions
	And it is going to active all of actios


Scenario: Register a Action
	Given Give a new action
	When I Register in the catalog
	Then The catalog needs to have 1 action


	Scenario: Executiong Inilizialize
	Given Give a new action
	When I Start All Modules
	Then The catalog need to Verify initialization is Called