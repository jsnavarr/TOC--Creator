# TOC--Creator

**TOC--Creator** is a tool which can be used in knowledge/articles/content databases to create a table of content based on < H > HTML tags hierarchy, i.e., < H2 > tags are subcontent inside < H1 > tags, < H3 > tags are subcontent of < H2 > tags, and so on.


**TOC--Creator** takes as input an HTML file stored in a database, it adds its TOC and the output will also be stored in a database.

![Welcome](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/WelcomePage.png)

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


The user must log-in in order to save information to the database and to view its content.


![User No logged-in](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/MainScreenNoLoggedIn.png)


The "save" button is enabled once there is data to save:

![User No logged-in](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/SaveButtonEnabled.png)

If user when logged-in clicks on "view my content" link and no content has been saved then a message will be displayed:

![User No logged-in](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/NoContentToDisplay.png)

If there is content already saved to the database then it will be displayed, ordered by date:

![User No logged-in](https://github.com/jsnavarr/TOC--Creator/blob/master/public/images/ContentToDisplay.png)


## Future Work
1. Implement a search capability so user can search by keywords.
2. When user is looking to all the content created and clicks in one of them, load main page with that information.
3. Implement admin features: admin will be able to see/delete all/any information in the database.
4. Provide pre-defined styles to be applied to the TOC.



 

