# TOC--Creator

**TOC--Creator** is a tool which can be used in knowledge/articles/content databases to create a table of content based on < H > HTML tags hierarchy, i.e., < H2 > tags are subcontent inside < H1 > tags, < H3 > tags are sub-content of < H2 > tags, and so on.

Live version: [TOC--Creator](https://toc--creator.herokuapp.com/ "TOC Creator Homepage")	
	
[Github](https://github.com/jsnavarr/TOC--Creator "Github")



**TOC--Creator** takes as input an HTML file stored in a database, it adds its TOC and the output will also be stored in a database.

![Welcome](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/WelcomePage.png)

### What It Has/What Was Used:
* React
* Express
* Javascript/MongoDB
* Partial CRUD
* Django's Built-In Authentication
* JavaScript
* HTML/CSS/semantic ui react
* Heroku

## User Stories
As a user I want to be able to log-in in order to save/view information to the database.

As a user I want to be able to read an HTML file without TOC from the database and create an HTML file with TOC and references.

As a user I want to be able to see my files in the database.

As a user I want to be able to search by date/keywords in the database.

As an admin I want to be able to see files created by any user.

As an admin I want to be able to delete any file in the database.

As a user I want to be able to apply different pre-defined styles to the TOC that **TOC--Creator** made.


##Design
When this app was in planning, 3 models were defined with 1:1 and 1:N relationships.

![Schemas and ERD](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/TOCSchemasAndERD.png)

When **TOC--Creator** was implemented, the design was simplified and now there are only 2 models with a 1:N relationship:

![Schemas and ERD](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/TOCSchemasAndERDFinal.png)

During planning this was the design for the main screen:

![Wireframe initial design](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/MainScreenWireframe.png)


Below are described the main features and behaviour of **TOC--Creator-- app.

The user must log-in in order to save information to the database and to view its content.


![User No logged-in](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/MainScreenNoLoggedIn.png)


The "save" button is enabled once there is data to save:

![User No logged-in](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/SaveButtonEnabled.png)

If user when logged-in clicks on "view my content" link and no content has been saved then a message will be displayed:

![User No logged-in](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/NoContentToDisplay.png)

If there is content already saved to the database then it will be displayed, ordered by date:

![User No logged-in](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/ContentToDisplay.png)


## Challenges

* Learn regular expressions which are powerful and you can really speed up on them using online testers. 
* Save aditional data to the database besides user's data. The content was not being saved to the database. The problem was the object being passed to JSON.stringfy() function, it was not formatted correctly and learned that for major changes you have to "npm run build"
* Deployment to heroku: "extra" data which I did not add was in package.json. Problen was solved deleting that "extra" data.




## Future Work
1. Implement a search capability so user can search by keywords.
2. When user is looking to all the content created and clicks in one of them, load main page with that information.
3. Implement admin features: admin will be able to see/delete all/any information in the database.
4. Provide pre-defined styles to be applied to the TOC.


