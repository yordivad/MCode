Feature: EmailManager
	This is the Email Manager

@mytag
Scenario: Inialize
	Given the config 
	| server          | port | user       | password   | enableSSl |
	| smtp.google.com | 1040 | test_00912 | test_00912 | true      |
	When Initialize
	Then Validate all settings are setup

