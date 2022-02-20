@echo off
echo Starting MongoDB...
mkdir GroceryStore
mongod --dbpath=GroceryStore
:finish
pause