Check IngredientsController and UserController and update @CrossOrigin path to your react app port
Create a schema on your mysqlworkbench names fridget.
Create a new user on mysqlworkbench with the username = roomsix and password = room6
In application.properties make sure to update spring.datasource.url=jdbc:mysql://localhost:3308/fridget to match the port your sql server is running (most likely 3306)
Starting the Java application should populate your sql server with appropriate tables. 

To test that everything is working as it should 
Start your react app and open a web browser and go to localhost:5173 
At this point you should see a form to add an ingredient. Enter text into the form and click submit. You should be able to check your database and see the new ingredient with an id.
In your App.jsx swap out the <Ingredients /> componant for <userContainer /> and refresh your web page. You should see 2 forms, 1 to log in and 1 to register a new user. 
Add a new user and check that the information was added to your database. 
Use the same username and password you registered with to test the login. 
