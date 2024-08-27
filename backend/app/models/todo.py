from flask import current_app as app

class Todo:
    @staticmethod
    def get_all_todos():
        with app.app_context():
            return app.mongo.db.todos.find()  # Use app.mongo to access db

    @staticmethod
    def get_todo_by_id(todo_id):
        with app.app_context():
            return app.mongo.db.todos.find_one({"_id": todo_id})

    @staticmethod
    def create_todo(data):
        with app.app_context():
            return app.mongo.db.todos.insert_one(data)

    @staticmethod
    def update_todo_by_id(todo_id, data):
        with app.app_context():
            return app.mongo.db.todos.update_one({"_id": todo_id}, {"$set": data})

    @staticmethod
    def delete_todo_by_id(todo_id):
        with app.app_context():
            return app.mongo.db.todos.delete_one({"_id": todo_id})
