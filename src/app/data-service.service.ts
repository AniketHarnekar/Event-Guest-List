import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private selectedUsers = new BehaviorSubject<User | null>(null);
  selectedUsers$ = this.selectedUsers.asObservable();

  private addedOrUpdatedUser = new BehaviorSubject<User | null>(null);
  addedOrUpdatedUser$ = this.addedOrUpdatedUser.asObservable();

  constructor() {
  }

  addOrUpdateUser(user: User | any){
      this.addedOrUpdatedUser.next(user)
  }

  updateSelectedUsers(user: User | null){
    this.selectedUsers.next(user);
  }

}