from flask import Blueprint, request, jsonify
from bson import ObjectId
from ..models.todo import Todo

todo_routes = Blueprint('todo_routes', __name__)

@todo_routes.route('/todos', methods=['GET'])
def get_all_todos():
    todos = Todo.get_all_todos()
    result = [{"_id": str(todo["_id"]), "title": todo["title"], "description": todo["description"], "completed": todo["completed"]} for todo in todos]
    return jsonify(result), 200

@todo_routes.route('/todos/<id>', methods=['GET'])
def get_todo_by_id(id):
    todo = Todo.get_todo_by_id(ObjectId(id))
    if todo:
        result = {"_id": str(todo["_id"]), "title": todo["title"], "description": todo["description"], "completed": todo["completed"]}
        return jsonify(result), 200
    return jsonify({"error": "Todo not found"}), 404

@todo_routes.route('/todos', methods=['POST'])
def create_todo():
    data = request.get_json()
    new_todo = {
        "title": data.get("title"),
        "description": data.get("description"),
        "completed": data.get("completed", False)
    }
    Todo.create_todo(new_todo)
    return jsonify({"message": "Todo created successfully"}), 201

@todo_routes.route('/todos/<id>', methods=['PUT'])
def update_todo_by_id(id):
    data = request.get_json()
    updated_todo = {
        "title": data.get("title"),
        "description": data.get("description"),
        "completed": data.get("completed", False)
    }
    Todo.update_todo_by_id(ObjectId(id), updated_todo)
    return jsonify({"message": "Todo updated successfully"}), 200

@todo_routes.route('/todos/<id>', methods=['DELETE'])
def delete_todo_by_id(id):
    Todo.delete_todo_by_id(ObjectId(id))
    return jsonify({"message": "Todo deleted successfully"}), 200
