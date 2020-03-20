# NewzApp Application - Final Integration

## Problem Statement

Build the NewzApp application with React UI as the frontend using APIs developed through Spring Boot.
React - NewzApp UI Step 3 and Spring step 6 code can be reused and enhanced for this Step.

## Requirements:

1. On launching the application the user should get the login page. The login page should have a link for registration using which the user should be able to register. Registration page should have password and confirm password fields. Passwords should be at least 6 character with atleast one upper,lower,number and special symbol. On successful registration the user should be taken to the login page. Upon login, the user should be taken to the Note Dashboard page.
    - Proper navigation links for all the pages should be available within pages.
    - Error handling should be implemented across pages. Appropriate messages should be displayed for the same. Success messages should be displayed for all the create,update and Delete operations
    - Logout feature should be implemented.

2. User can create,view,update and delete News in the News Dashboard page
    - User should be able to add news with and without NewsSources

3. A page to perform CRUD operations for NewsSource should be provided
    - Deleting NewsSource should remove newssource and the corresponding News,if associated

4. Application should be responsive.

5. Unit Tests should be created for the React Components and Services

6. E2E scripts using cypress should be created for the new functional flows and modified / enhanced for the existing flows.

7. Implement CI - continuous Integration ( use .gitlab-ci.yml)

8. Dockerize the frontend and Backend (create/reuse dockerfile, docker-compose.yml and get it executed through docker compose)

### Note: 

Completed Code should be checkedin to a **NEW**  gitlab repo and shared with the mentor before the Final demo (UI and code walkthrough). You should **NOT** push your final code into the existing React NewzApp UI step3 and Spring step 6 repos.


