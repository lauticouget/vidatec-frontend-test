import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodosService } from '../services/todos.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-todo-drag-drop',
  templateUrl: './todo-drag-drop.component.html',
  styleUrls: ['./todo-drag-drop.component.css'],
})
export class TodoDragDropComponent implements OnInit {
  @Input() loggedIn: boolean;
  @Input() todoAdded: undefined;
  todo = [];
  done = [];

  constructor(private todosService: TodosService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    const task = event.container.data[event.currentIndex];

    if (event.container.id === 'cdk-drop-list-0') {
      task['completed'] = false;
    } else if (event.container.id === 'cdk-drop-list-1') {
      task['completed'] = true;
    }

    this.todosService.updateTodo(task).subscribe();
  }

  loadTodos(): void {
    this.todosService.getTodos().subscribe(todos => {
      this.todo = todos.filter(t => !t.completed);
      this.done = todos.filter(t => t.completed);
    })
  }

  deleteTodo(todo: Object): void {
    this.todosService.deleteTodo(todo).subscribe(res => {
      if (res.success) this.loadTodos();
    });
  }

}
