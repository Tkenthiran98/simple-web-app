import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule for ngModel
import { TodoService } from '../../services/todo.service';

interface Todo {
  _id?: string;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  standalone: true, // Ensure the component is standalone
  imports: [CommonModule, FormsModule], 
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  isEditPopupOpen = false;
  isDeletePopupOpen = false;
  todoToDelete?: string; // Store the ID of the todo to be deleted
  editTodo: Todo = { title: '', description: '', completed: false };
  successMessage: string | null = null;
  errorMessage: string | null = null;
  errorMessageTitle: string | null = null;
  errorMessageDescription: string | null = null;
  searchTerm: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      (data: Todo[]) => {
        this.todos = data;
        this.filteredTodos = data; // Initialize filteredTodos
      },
      error => {
        this.errorMessage = 'Failed to load todos!';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    );
  }

  addTodo(title: string, description: string): void {
    this.errorMessageTitle = null;
    this.errorMessageDescription = null;
    
    if (!title) {
      this.errorMessageTitle = 'Please fill the title';
      return;
    }
    if (!description) {
      this.errorMessageDescription = 'Please fill the description';
      return;
    }

    const newTodo: Todo = { title, description, completed: false };
    this.todoService.addTodo(newTodo).subscribe(
      (addedTodo: Todo) => {
        this.todos.push(addedTodo);
        this.filterTodos(); // Update the filtered list
        this.successMessage = 'Todo added successfully!';
        setTimeout(() => this.successMessage = null, 3000);
      },
      error => {
        this.errorMessage = 'Failed to add todo!';
        setTimeout(() => this.errorMessage = null, 3000);
      }
    );
  }

  updateTodo(): void {
    if (this.editTodo._id) {
      this.todoService.updateTodo(this.editTodo._id, this.editTodo).subscribe(
        (updatedTodo: Todo) => {
          const index = this.todos.findIndex(t => t._id === this.editTodo._id);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
            this.filterTodos(); // Update the filtered list
            this.successMessage = 'Todo updated successfully!';
            this.closeEditPopup();
            setTimeout(() => this.successMessage = null, 3000);
          }
        },
        error => {
          this.errorMessage = 'Failed to update todo!';
          setTimeout(() => this.errorMessage = null, 3000);
        }
      );
    }
  }

  deleteTodo(id?: string): void {
    if (id) {
      this.todoToDelete = id; // Set the ID of the todo to delete
      this.isDeletePopupOpen = true; // Open the delete confirmation popup
    }
  }

  confirmDelete(): void {
    if (this.todoToDelete) {
      this.todoService.deleteTodo(this.todoToDelete).subscribe(
        () => {
          this.todos = this.todos.filter(todo => todo._id !== this.todoToDelete);
          this.filterTodos(); // Update the filtered list
          this.successMessage = 'Todo deleted successfully!';
          this.closeDeletePopup();
          setTimeout(() => this.successMessage = null, 3000);
        },
        error => {
          this.errorMessage = 'Failed to delete todo!';
          setTimeout(() => this.errorMessage = null, 3000);
        }
      );
    }
  }

  openEditPopup(todo: Todo): void {
    this.editTodo = { ...todo };
    this.isEditPopupOpen = true;
  }

  closeEditPopup(): void {
    this.isEditPopupOpen = false;
  }

  closeDeletePopup(): void {
    this.isDeletePopupOpen = false;
    this.todoToDelete = undefined; // Reset the todo ID
  }

  clearError(field: 'title' | 'description'): void {
    if (field === 'title') {
      this.errorMessageTitle = null;
    } else if (field === 'description') {
      this.errorMessageDescription = null;
    }
  }

  filterTodos(): void {
    const searchLower = this.searchTerm.toLowerCase();
    this.filteredTodos = this.todos.filter(todo =>
      todo.title.toLowerCase().includes(searchLower) ||
      todo.description.toLowerCase().includes(searchLower)
    );
  }
}
