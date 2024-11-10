Check IngredientsController and UserController and update @CrossOrigin path to your react app port
Create a schema on your mysqlworkbench names fridget.
Create a new user on mysqlworkbench with the username = roomsix and password = room6
In application.properties make sure to update spring.datasource.url=jdbc:mysql://localhost:3308/fridget to match the port your sql server is running (most likely 3306)
Starting the Java application should populate your sql server with appropriate tables. 

------Seed the database------
Open MySQL Workbench and select the fridget schema.
File > Open SQL Script > Select GenerateIngredients.sql from the project folder. 
Click the lightning bolt to add ingredients to the database to use. 

(NOTE) - Right now there is a bug that will not allow adding recipies due to duplicates in the join table recipe_ingredients.
To get around this, Right click recipe_ingredients table and select alter table. Look for the foreign keys tab. Select the foreign key, you should see foreign key options on the right. Default is set to RESTRICTED and needs to be set to No Action. Do this for both foreign keys. Click the apply button. Next click the columns tab and look for the check box under the UN and make sure both boxes are UNCHECKED. click apply. 


------Testing Ingredients List-------
Open App.jsx and replace current component with <IngredientsList /> 
Open the app in the web browser and you should see a list of all ingredients  and thier IDs from the database.


------Testing Adding ingredients to the database------
Open App.jsx and replace current component with <Ingredients />
Add text to the box and click "Add Ingredient". You should get an alert to let you know it was added to the database.
Verify it was added by checking MySQL workbench.


Test Recipe.....
In App.jsx use the <Recipe /> recipe component.


