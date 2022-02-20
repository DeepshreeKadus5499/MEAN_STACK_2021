@echo off
echo Seeding Groceries..
mongoimport --db GroceryStore --collection Groceries --file grocery.json
:finish
pause
