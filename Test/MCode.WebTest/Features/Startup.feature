Feature: Startup
	
Scenario: Enable Coockie Autentication
	Given The AppBuilder
	When Class Initialize
	Then A cookie authentication is added
