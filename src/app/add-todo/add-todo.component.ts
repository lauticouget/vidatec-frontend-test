import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { TodosService } from '../services/todos.service';
import { TokenStorageService } from "../services/token-storage.service";
import { FormControl } from "@angular/forms";
import { Input } from '@angular/core';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {
  task = new FormControl('');

  @Input() loggedIn: boolean;
  @Output() todoAdded = new EventEmitter<undefined>();

  constructor(private todosService: TodosService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    this.todosService.addTodo(this.task.value).subscribe(res => {
      if (res.success) this.emitTodoAdded();
    });
  }
  
  emitTodoAdded() {
    this.todoAdded.emit();
  }
}
