Feature: Authentication
Scenario: LoginGet
	Given a emtpy return url
	When I request to login
	Then i got a response

Scenario: LoginPost
Given an login:
| Email              | Password | ReturnUrl  |
| yordivad@gmail.com | 123      | home/index |
When i execute Login
Then i Get the response

Scenario: LoginPostWithInvalidEmail
Given an invalidLogin:
| Email              | Password | ReturnUrl  |
| invalid@gmail.com | 123      | home/index |
When i execute Login
Then i Get the no auth response


Scenario: LoginPostWithInvalidData
Given an invalidEmail:
| Email              | Password | ReturnUrl  |
| invalid | 123      | home/index |
When i execute Login
Then i Get auth page

Scenario: Logout
When i logout
Then i get a redirect to login page