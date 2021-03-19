import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpUrlEncodingCodec } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:3000/api/todos';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  encoder = new HttpUrlEncodingCodec();
  token = '';
  httpOptions = {}

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + tokenStorage.getToken()
      })
    }
  }

  getTodos(): Observable<any> {
    return this.http.get(API_URL, this.httpOptions);
  }

  addTodo(task: string): Observable<any> {
    const body = { task, completed: false}
    return this.http.post(API_URL, body, this.httpOptions);
  }

  updateTodo(body: any): Observable<any> {
    return this.http.put(API_URL, body, this.httpOptions);
  }

  deleteTodo(task: any): Observable<any> {

    const url = API_URL + this.encoder.encodeValue(`/${task}`);
    return this.http.delete(url, this.httpOptions);
  }
}