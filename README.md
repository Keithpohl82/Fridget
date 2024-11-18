Check IngredientsController and UserController and update @CrossOrigin path to your react app port
Create a schema on your mysqlworkbench names fridget.
Create a new user on mysqlworkbench with the username = roomsix and password = room6

Starting the Java application should populate your sql server with appropriate tables. 

------Seed the database------
Open MySQL Workbench and select the fridget schema.
File > Open SQL Script > Select GenerateIngredients.sql from the project folder. 
Click the lightning bolt to add ingredients to the database to use. 

(NOTE) - Right now there is a bug that will not allow adding recipies due to duplicates in the join table recipe_ingredients.
To get around this, Right click recipe_ingredients table and select alter table. Look for the foreign keys tab. Select the foreign key, you should see foreign key options on the right. Default is set to RESTRICTED and needs to be set to No Action. Do this for both foreign keys. Click the apply button. Next click the columns tab and look for the check box under the UN and make sure both boxes are UNCHECKED. click apply. 


------------Testing----------
Routes have been added for easier testing. 
Once backend is set up you can open the web browser and you should see the login right away
Use the following to go to and test different parts of the app.
http://localhost:5173/addingredients
http://localhost:5173/ingredients
http://localhost:5173/addrecipe
http://localhost:5173/register
http://localhost:5173/login

