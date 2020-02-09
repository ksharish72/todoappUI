import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDoItem } from './ToDoItem.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  serverUrl: string = "http://to-doapp-8080.herokuapp.com";
  // serverUrl: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  public getToDoItems(): Observable<Array<ToDoItem>> {
    const toDoItems = this.http.get<Array<ToDoItem>>(`${this.serverUrl}/todoitems`);
    return toDoItems;
  }

  public updateToDoItem(id: string, checkBoxStatus: boolean): Observable<ToDoItem> {
    const toDoItems = this.http.put<ToDoItem>(`${this.serverUrl}/todoitems/${id}`, {
      completed: checkBoxStatus
    });
    return toDoItems;
  }
  public deleteToDoItem(id: string): Observable<any> {
    const deletedMessage = this.http.delete(`${this.serverUrl}/todoitems/${id}`);
    return deletedMessage;
  }
  public addToDoItem(taskContent: string, taskDecription?: string, dueDate?: string, dueTime?: string): Observable<ToDoItem> {
    const postToDoItem = this.http.post<ToDoItem>(`${this.serverUrl}/todoitems`, {
      taskContent: taskContent,
      description: taskDecription,
      dueDate: dueDate,
      dueTime: dueTime
    }
    );
    return postToDoItem;
  }
  public editToDoItem(id: string, taskContent: string, taskDecription?: string, dueDate?: string, dueTime?: string) {
    const toDoItems = this.http.put<ToDoItem>(`${this.serverUrl}/todoitems/${id}`, {
      taskContent: taskContent,
      description: taskDecription,
      dueDate: dueDate,
      dueTime: dueTime
    });
    return toDoItems;
  }

  public deleteAllToDoItems(): Observable<any> {
    const deletedMessage = this.http.delete(`${this.serverUrl}/todoitems`);
    return deletedMessage;
  }
}
