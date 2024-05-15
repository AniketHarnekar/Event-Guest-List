import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  
  // Get users
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }


  // Add user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }

  updateUser(user:User):Observable<User>{
    const updateUrl = `${this.url}/${user.id}`;
    return this.http.put<User>(updateUrl, user);
  }
  
  // Delete user
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
    
  }
}
