from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client.todo_db
db.todos.drop()  # Drop the collection if it exists

sample_todos = [
    {"title": "Learn Flask", "description": "Understand the basics of Flask", "completed": False},
    {"title": "Build a REST API", "description": "Implement CRUD operations using Flask", "completed": False}
]

db.todos.insert_many(sample_todos)
print("Database initialized with sample data.")
