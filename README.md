# notes
## Task
Please develop a note taking app as a web application. Within this application the following tasks should be viable: Create, read, edit and delete notes. Please chose yourself, on which aspects of the application you want to focus both from a technical (e.g., UI vs REST API/backend) as well as from the user perspective.
Our goal is to see how you structure your application as well as your code and what skills you already posses for web development. Therefore, an actual database is optional just like either a frontend or backend is enough for this purpose. On the backend side an OOP approach is preferred, ideally implemented in C# and .NET 6. The same code structure should be applicable for production projects.

The following points are especially important to us regarding the result:
Can we start the application
Does the user get good feedback
Can we understand your code
Did you document your API
Have best practices been implemented
Are you doing error handling
Is the code testable and extendable

## Solution
Angular 14 SPA backed by a DotNetCore Microservice for persistence.
Persistence is realized using a simple JSON File Store.

## Prerequisites
* DotNetCore 6
* NodeJs 16.15.1
* Angular 14.0.1

## How To Start
On Windows please run startup.cmd, which will launch backend and frontend simultaneously.

## Omissions
Because of time constraints the following parts had to be omitted:
* Frontend Tests
* Swagger CLI Generated Frontend Client
* Sort & Filter Feature
* DockerFile to build runnable Docker Image for front- and backend