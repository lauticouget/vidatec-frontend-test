import { Component, ViewChild } from '@angular/core';
import { TodoDragDropComponent } from './todo-drag-drop/todo-drag-drop.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vidatec-frontend-test';
  loggedIn = false;

  @ViewChild(TodoDragDropComponent) private dragDropComponent: TodoDragDropComponent;

  changeLoggedStatus(loggedIn: boolean) {
    this.loggedIn = loggedIn;
  }
  
  updateTodos() {
    this.dragDropComponent.loadTodos();
  }
}
